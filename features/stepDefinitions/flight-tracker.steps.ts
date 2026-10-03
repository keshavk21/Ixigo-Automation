import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

Given('the user is on the Flight Tracker page', async function (this: CustomWorld) {
  await this.flightTracker.open();
});

When(
  'the user searches Flight Tracker by flight number {string}',
  async function (this: CustomWorld, flightNumber: string) {
    await this.flightTracker.searchByFlightNumber(flightNumber);
  }
);

When(
  'the user searches Flight Tracker by route {string} to {string} on {string}',
  async function (this: CustomWorld, origin: string, destination: string, date: string) {
    await this.flightTracker.searchByRoute(origin, destination, date);
  }
);

Then('live flight status details should be displayed', async function (this: CustomWorld) {
  await this.flightTracker.expectLiveStatusDisplayed();
});
