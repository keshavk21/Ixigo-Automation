import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

When(
  'the user filters results by the {string} stop count',
  async function (this: CustomWorld, label: 'Non-Stop' | '1 Stop' | '2+ Stops') {
    await this.flightResults.filterByStops(label);
  }
);

When(
  'the user clears the {string} stop count filter',
  async function (this: CustomWorld, label: 'Non-Stop' | '1 Stop' | '2+ Stops') {
    await this.flightResults.clearStopsFilter(label);
  }
);

When('the user filters results by the {string} airline', async function (this: CustomWorld, airline: string) {
  await this.flightResults.filterByAirline(airline);
});

When('the user clears the {string} airline filter', async function (this: CustomWorld, airline: string) {
  await this.flightResults.clearAirlineFilter(airline);
});

When('the user adjusts the flight price range', async function (this: CustomWorld) {
  await this.flightResults.adjustPriceRange();
});

When('the user adjusts the flight duration range', async function (this: CustomWorld) {
  await this.flightResults.adjustDurationRange();
});

When(
  'the user filters departures within the {string} window',
  async function (this: CustomWorld, windowLabel: string) {
    await this.flightResults.filterByDepartureTimeWindow(windowLabel);
  }
);

When(
  'the user filters arrivals within the {string} window',
  async function (this: CustomWorld, windowLabel: string) {
    await this.flightResults.filterByArrivalTimeWindow(windowLabel);
  }
);

When('the user clears the departure and arrival time filters', async function (this: CustomWorld) {
  await this.flightResults.clearTimeWindowFilters();
});

When('the user scrolls the date-price strip', async function (this: CustomWorld) {
  await this.flightResults.scrollDateStrip();
});

When('the user selects {string} from the date-price strip', async function (this: CustomWorld, dateLabel: string) {
  await this.flightResults.selectDateFromStrip(dateLabel);
});

When(
  'the user sorts results by {string}',
  async function (this: CustomWorld, mode: 'Price' | 'Fastest' | 'Departure' | 'Smart') {
    await this.flightResults.sortBy(mode);
  }
);

When(
  'the user filters results by the {string} departure airport',
  async function (this: CustomWorld, airportLabel: string) {
    await this.flightResults.filterByDepartureAirport(airportLabel);
  }
);

When('the user selects a bank offer', async function (this: CustomWorld) {
  await this.flightResults.selectBankOffer();
});

Then('the bank offer details should be visible', async function (this: CustomWorld) {
  await this.flightResults.expectBankOfferDetailsVisible();
});
