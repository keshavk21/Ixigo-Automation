import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

Given('the user is on the Ixigo flights page', async function (this: CustomWorld) {
  await this.flightSearch.open();
});

When('the user selects One Way', async function (this: CustomWorld) {
  await this.flightSearch.selectOneWay();
});

When('the user selects Delhi as the departure airport', async function (this: CustomWorld) {
  await this.flightSearch.selectOrigin();
});

When('the user selects Bengaluru as the arrival airport', async function (this: CustomWorld) {
  await this.flightSearch.selectDestination();
});

When(
  'the user selects September 24, 2026 as the departure date',
  async function (this: CustomWorld) {
    await this.flightSearch.selectDepartureDate('September 24, 2026');
  }
);

When('the user searches for flights', async function (this: CustomWorld) {
  await this.flightSearch.search();
});

Then('flight search results should be displayed', async function (this: CustomWorld) {
  await this.flightResults.expectResultsDisplayed();
});
