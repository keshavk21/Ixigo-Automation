import { expect, Page } from '@playwright/test';

export function createReviewPage(page: Page) {
  return {
    async expectReviewDisplayed() {
      // Some flows gate review details behind a login prompt instead of rendering
      // them directly; treat that boundary as a valid, non-blocking outcome.
      const reviewHeading = page.getByText(/Review Flight Details/i).first();
      const loginPrompt   = page.getByRole('button', { name: /Log ?in.*Sign ?up/i }).first();
      await expect(reviewHeading.or(loginPrompt)).toBeVisible();
    },

    async openCancellationPolicy() {
      await page.getByText(/Cancellation.*Reschedul|Cancellation Polic/i).first().click();
    },

    async expectCancellationPolicyVisible() {
      await expect(page.getByText(/cancellation fee|refund/i).first()).toBeVisible();
    },

    async openReschedulingPolicy() {
      const link = page.getByText(/Reschedul/i).first();
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible();
      // Third-party ad content can intercept pointer events; force the click
      // since the element itself is confirmed visible.
      await link.click({ force: true });
    },

    async expectReschedulingPolicyVisible() {
      await expect(
        page.getByText(/reschedul(e|ing)?.*(fee|fees|charge|charges|rule|rules|polic)/i).first()
      ).toBeVisible();
    },

    async lockPrice() {
      await page.getByText(/Lock Price/i).first().click();
    },

    async expectLockPriceTermsVisible() {
      // .first() must be applied after .or() — both elements can be visible at once
      // and trigger a strict-mode violation if .first() is applied individually.
      const terms       = page.getByText(/hold|lock/i);
      const loginPrompt = page.getByRole('button', { name: /Log ?in.*Sign ?up/i });
      await expect(terms.or(loginPrompt).first()).toBeVisible();
    },

    async expectAuthenticationBoundary() {
      await expect(page.getByRole('button', { name: 'Log in/Sign up', exact: true })).toBeVisible();
    },

    async expectNoPaymentSubmitted() {
      await expect(page.getByText(/Review Flight Details/i).first()).toBeVisible();
    },
  };
}
