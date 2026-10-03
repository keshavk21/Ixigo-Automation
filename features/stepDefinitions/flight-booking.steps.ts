import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

When('the user opens the cancellation policy', async function (this: CustomWorld) {
  await this.review.openCancellationPolicy();
});

Then('the cancellation policy should be visible', async function (this: CustomWorld) {
  await this.review.expectCancellationPolicyVisible();
});

When('the user opens the rescheduling policy', async function (this: CustomWorld) {
  await this.review.openReschedulingPolicy();
});

Then('the rescheduling policy should be visible', async function (this: CustomWorld) {
  await this.review.expectReschedulingPolicyVisible();
});

When('the user locks the price on the first result', async function (this: CustomWorld) {
  await this.flightResults.clickLockPrice(0);
});

Then('the lock price terms should be visible', async function (this: CustomWorld) {
  await this.review.expectLockPriceTermsVisible();
});
