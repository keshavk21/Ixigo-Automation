import { test, expect } from '@playwright/test';
import { createFlightSearchPage } from '../pages/FlightSearchPage';
import testData from '../data/testData.js';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    const flightSearch = createFlightSearchPage(page);
    await flightSearch.open();
    await flightSearch.selectOneWay();
    await flightSearch.selectOrigin();
    await flightSearch.selectDestination();
    await flightSearch.selectDepartureDate(testData.search.departureDate);
    await flightSearch.search();
    await page.waitForTimeout(5000);
    const info = await page.evaluate(() => {
      const allCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
      const withName = allCheckboxes.filter((i) => i.hasAttribute('name'));
      const stopsSections = document.querySelectorAll('[data-section-id="stops-section"]');
      return {
        totalCheckboxes: allCheckboxes.length,
        withNameCount: withName.length,
        withNameSamples: withName.slice(0, 5).map((i) => i.outerHTML),
        stopsSectionsCount: stopsSections.length,
      };
    });
    console.log('INFO:', JSON.stringify(info, null, 2));
  });
});
