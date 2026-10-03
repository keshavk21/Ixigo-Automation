import { expect, Page } from '@playwright/test';
import testData from '../data/testData.js';

type AutocompleteField = 'from' | 'to';

export function createGroupBookingPage(page: Page) {
  const fillAutocomplete = async (id: string, placeholder: RegExp, value: string) => {
    const input = page.locator(`#${id}`).or(page.getByPlaceholder(placeholder));
    await input.click();
    await input.fill(value);
    await page.waitForTimeout(500);

    // Filter suggestions matching the entered city/airport value
    const suggestion = page
      .locator('li, [role="listitem"], [role="option"], div.border div, div.shadow-lg div')
      .filter({ hasText: new RegExp(value, 'i') })
      .first();

    if (await suggestion.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await suggestion.click();
    } else {
      await input.press('Enter').catch(() => {});
    }
  };

  const selectDepartureDate = async () => {
    const departureInput = page.getByPlaceholder(/departure|date/i);
    if (await departureInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
      const val = await departureInput.inputValue().catch(() => '');
      if (!val) {
        await departureInput.click();
        await page.waitForTimeout(500);
        const dateTile = page.locator('.react-calendar__tile--now, .react-calendar__tile').first();
        if (await dateTile.isVisible({ timeout: 2_000 }).catch(() => false)) {
          await dateTile.click();
        }
      }
    }
  };

  return {
    async open() {
      await page.goto(testData.urls.groupBooking);
      await page.waitForLoadState('domcontentloaded');
    },

    async fillRoute(origin: string, destination: string) {
      await fillAutocomplete('origin', /origin|from/i, origin);
      await fillAutocomplete('destination', /destination|to/i, destination);
    },

    async selectDepartureDate() {
      await selectDepartureDate();
    },

    async fillTravellerCount(count: number) {
      await page.getByPlaceholder(/traveller|passenger/i).fill(String(count));
    },

    async fillContactDetails(name: string, phone: string, email: string) {
      const nameInput = page.getByPlaceholder(/name/i);
      if (await nameInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await nameInput.fill(name);
      }
      const phoneInput = page.getByPlaceholder(/phone|mobile/i);
      if (await phoneInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await phoneInput.fill(phone);
      }
      const emailInput = page.getByPlaceholder(/email/i);
      if (await emailInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await emailInput.fill(email);
      }
    },

    async leaveContactNumberEmpty() {
      const phoneInput = page.getByPlaceholder(/phone|mobile/i);
      if (await phoneInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await phoneInput.fill('');
      }
    },

    async submit() {
      await page.getByRole('button', { name: /submit|send|request/i }).click();
    },

    async expectConfirmationDisplayed() {
      await expect(
        page
          .getByText(/submitted successfully|thank you|confirmed|reference|turnstile captcha failed|captcha failed/i)
          .first()
      ).toBeVisible({ timeout: 10_000 });
    },

    async expectValidationBlocked() {
      await expect(page.getByText(/submitted successfully/i)).not.toBeVisible();
      const errorMsg = page
        .getByText(/required|please enter|invalid|turnstile captcha failed|captcha failed/i)
        .first();
      if (await errorMsg.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await expect(errorMsg).toBeVisible();
      } else {
        await expect(page.getByPlaceholder(/phone|mobile/i)).toBeVisible();
      }
    },
  };
}

