import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

Given('the user is on the Group Booking page', async function (this: CustomWorld) {
  await this.groupBooking.open();
});

When(
  'the user fills the group booking route from {string} to {string}',
  async function (this: CustomWorld, origin: string, destination: string) {
    await this.groupBooking.fillRoute(origin, destination);
  }
);

When('the user sets the group traveller count to {int}', async function (this: CustomWorld, count: number) {
  await this.groupBooking.fillTravellerCount(count);
});

When('the user fills group booking contact details', async function (this: CustomWorld) {
  await this.groupBooking.fillContactDetails('Test User', '9999999999', 'test.user@example.com');
});

When('the user leaves the group booking contact number empty', async function (this: CustomWorld) {
  await this.groupBooking.leaveContactNumberEmpty();
});

When('the user submits the group booking request', async function (this: CustomWorld) {
  await this.groupBooking.submit();
});

Then('the group booking confirmation should be displayed', async function (this: CustomWorld) {
  await this.groupBooking.expectConfirmationDisplayed();
});

Then('the group booking form validation should block submission', async function (this: CustomWorld) {
  await this.groupBooking.expectValidationBlocked();
});

When('the user selects group booking departure date', async function (this: CustomWorld) {
  await this.groupBooking.selectDepartureDate();
});
