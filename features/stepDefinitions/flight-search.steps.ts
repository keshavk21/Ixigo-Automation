import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

When('the user selects Round Trip', async function (this: CustomWorld) {
  await this.flightSearch.selectRoundTrip();
});

When(
  'the user selects September 28, 2026 as the return date',
  async function (this: CustomWorld) {
    await this.flightSearch.selectReturnDate('September 28, 2026');
  }
);

When('the user opens Travellers & Class', async function (this: CustomWorld) {
  await this.flightSearch.openTravellersAndClass();
});

When('the user sets {int} adults', async function (this: CustomWorld, count: number) {
  await this.flightSearch.setAdultsCount(count);
});

When('the user selects the Economy class', async function (this: CustomWorld) {
  await this.flightSearch.selectClass('Economy');
});

When('the user confirms Travellers & Class', async function (this: CustomWorld) {
  await this.flightSearch.confirmTravellersAndClass();
});

When(
  'the user selects the {string} special fare',
  async function (this: CustomWorld, fareName: 'Student' | 'Senior Citizen' | 'Armed Forces' | 'Doctors & Nurses') {
    await this.flightSearch.selectSpecialFare(fareName);
  }
);

When('the user enables Always opt for Free Cancellation', async function (this: CustomWorld) {
  await this.flightSearch.toggleFreeCancellation();
});

When('the user opens flight details for the first result', async function (this: CustomWorld) {
  await this.flightResults.openFlightDetails(0);
});

When('the user selects Book on the first result', async function (this: CustomWorld) {
  await this.flightResults.clickBook(0);
});

Then('the review page should be displayed', async function (this: CustomWorld) {
  await this.review.expectReviewDisplayed();
});

Then(
  'the authentication boundary should be visible without logging in',
  async function (this: CustomWorld) {
    await this.review.expectAuthenticationBoundary();
  }
);

Then('no payment should be submitted', async function (this: CustomWorld) {
  await this.review.expectNoPaymentSubmitted();
});

Then('the user should remain on the flights search page', async function (this: CustomWorld) {
  await this.flightSearch.expectStillOnSearchPage();
});
