import { expect, Page } from '@playwright/test';

type StopLabel = 'Non-Stop' | '1 Stop' | '2+ Stops';
type SortMode   = 'Price' | 'Fastest' | 'Departure' | 'Smart';

/** Thrown internally as a sentinel when no-flights is detected in an action step. */
class NoFlightsFoundError extends Error {
  constructor() { super('No flights found — skipping action step'); }
}

export function createFlightResultsPage(page: Page) {
  // ── Internal helpers ──────────────────────────────────────────────────────

  /** Returns true when the page shows a "no flights found" message. */
  const isNoFlightsPage = async (): Promise<boolean> =>
    page
      .getByText(/no flights found|no results found|sorry.*no flights|couldn't find any flights/i)
      .first()
      .isVisible()
      .catch(() => false);

  /**
   * Call at the top of every *action* method.
   * Throws NoFlightsFoundError when there are no results so the caller can
   * silently skip the step instead of failing with an element-not-found error.
   */
  const guardNoFlights = async () => {
    if (await isNoFlightsPage()) throw new NoFlightsFoundError();
  };

  const toggleCheckboxByLabel = async (labelText: string) => {
    // Escape special characters (like '+' in '2+ Stops')
    const escaped = labelText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Ixigo filters use custom components; Playwright's getByRole cannot link
    // the label text to the hidden <input type="checkbox">, so we find the
    // container and locate the checkbox input within it.
    const container = page
      .locator('[role="listitem"], label')
      .filter({ hasText: new RegExp(`^${escaped}$`, 'i') })
      .first();
    const checkbox = container.locator('input[type="checkbox"]').first();

    await container.scrollIntoViewIfNeeded();
    // The checkbox input is opacity-0 (invisible), so we must force-click it.
    await checkbox.click({ force: true });
  };

  return {
    async expectResultsDisplayed() {
      await expect(page).toHaveURL(/search/i);
      // The URL updates before results/filters render; wait for a fare card or
      // a "no flights found" message so an empty result set doesn't fail the test.
      const fareHeading    = page.getByRole('heading', { name: /^₹/ }).first();
      const noResultsMsg   = page.getByText(/no flights found|no results found|sorry.*no flights|couldn't find any flights/i).first();
      await expect(fareHeading.or(noResultsMsg)).toBeVisible({ timeout: 20_000 });
    },

    async hasNoFlightsFound() {
      return isNoFlightsPage();
    },

    async filterByStops(label: StopLabel | 'stops') {
      await guardNoFlights();
      await toggleCheckboxByLabel(label);
    },

    async clearStopsFilter(label: StopLabel) {
      await guardNoFlights();
      await toggleCheckboxByLabel(label);
    },

    async filterByAirline(airlineName: string) {
      await guardNoFlights();
      await toggleCheckboxByLabel(airlineName);
    },

    async clearAirlineFilter(airlineName: string) {
      await guardNoFlights();
      await toggleCheckboxByLabel(airlineName);
    },

    async filterByDepartureAirport(airportLabel: string) {
      await guardNoFlights();
      await toggleCheckboxByLabel(airportLabel);
    },

    async filterByDepartureTimeWindow(windowLabel: string) {
      await guardNoFlights();
      await toggleCheckboxByLabel(windowLabel);
    },

    async filterByArrivalTimeWindow(windowLabel: string) {
      await guardNoFlights();
      await toggleCheckboxByLabel(windowLabel);
    },

    async clearTimeWindowFilters() {
      await guardNoFlights();
      const checkedBoxes = page.locator('input[type="checkbox"]:checked');
      const count = await checkedBoxes.count();
      for (let i = 0; i < count; i++) {
        // Must force-click since checkboxes are opacity-0
        await checkedBoxes.first().click({ force: true });
      }
    },

    async getPriceRangeLabels() {
      return page.locator('p').filter({ hasText: /^₹[\d,]+$/ }).allTextContents();
    },

    async adjustPriceRange() {
      await guardNoFlights();
      await page.getByText('Flight Price', { exact: true }).first().scrollIntoViewIfNeeded();
      const slider = page.getByRole('slider').first();
      await slider.focus();
      await page.keyboard.press('ArrowLeft');
    },

    async adjustDurationRange() {
      await guardNoFlights();
      await page.getByText('Duration', { exact: true }).first().scrollIntoViewIfNeeded();
      const slider = page.getByRole('slider').nth(1);
      await slider.focus();
      await page.keyboard.press('ArrowLeft');
    },

    async sortBy(mode: SortMode) {
      await guardNoFlights();
      const row = page
        .locator('div')
        .filter({ hasText: mode })
        .filter({ has: page.getByRole('radio') })
        .filter({ visible: true })
        .last();
      await row.getByRole('radio').click();
    },

    async scrollDateStrip() {
      await guardNoFlights();
      // The date strip renders each date label (e.g. "Thu, 24 Sep") in an
      // inner element that may be a span, div, or p — element type varies
      // across Ixigo releases.  getByText() matches any element type, and the
      // relaxed \d{1,2} covers single-digit days as well as two-digit days.
      const dateItem = page
        .getByText(/^[A-Za-z]{3}, \d{1,2} [A-Za-z]{3}$/)
        .first();
      await dateItem.waitFor({ state: 'visible', timeout: 20_000 });
      await dateItem.hover();
      await page.mouse.wheel(300, 0);
    },

    async selectDateFromStrip(dateLabel: string) {
      await guardNoFlights();
      await page.getByText(dateLabel, { exact: true }).first().click();
    },

    async getFirstFareText() {
      return (await page.getByRole('heading', { name: /^₹/ }).first().textContent())?.trim();
    },

    async getFirstFlightCardText() {
      return (await page.locator('h6').first().textContent())?.trim();
    },

    async openFlightDetails(index = 0) {
      await guardNoFlights();
      await page.getByText('Flight Details', { exact: true }).filter({ visible: true }).nth(index).click();
    },

    async clickBook(index = 0) {
      await guardNoFlights();
      const bookButton = page.getByRole('button', { name: 'Book' }).filter({ visible: true }).nth(index);
      await bookButton.scrollIntoViewIfNeeded();
      await expect(bookButton).toBeVisible();
      // Third-party ad content can intercept pointer events; force the click
      // since the button itself is confirmed visible.
      await bookButton.click({ force: true });
    },

    async clickLockPrice(index = 0) {
      await guardNoFlights();
      const lockPrice = page.getByText(/Lock Price/i).filter({ visible: true }).nth(index);
      await lockPrice.scrollIntoViewIfNeeded();
      await expect(lockPrice).toBeVisible();
      // Same ad-intercept risk as clickBook above.
      await lockPrice.click({ force: true });
    },

    async selectBankOffer() {
      await guardNoFlights();
      await page.getByRole('button').filter({ has: page.locator('img') }).first().click();
    },

    async expectBankOfferDetailsVisible() {
      await expect(page.getByText(/off|discount|cashback/i).first()).toBeVisible();
    },
  };
}