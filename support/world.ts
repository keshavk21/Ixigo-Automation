import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

import { createCommonPage } from '../pages/CommonPage';
import { createFlightResultsPage } from '../pages/FlightResultsPage';
import { createFlightSearchPage } from '../pages/FlightSearchPage';
import { createFlightTrackerPage } from '../pages/FlightTrackerPage';
import { createGroupBookingPage } from '../pages/GroupBookingPage';
import { createReviewPage } from '../pages/ReviewPage';

type FlightSearchPage   = ReturnType<typeof createFlightSearchPage>;
type FlightResultsPage  = ReturnType<typeof createFlightResultsPage>;
type ReviewPage         = ReturnType<typeof createReviewPage>;
type FlightTrackerPage  = ReturnType<typeof createFlightTrackerPage>;
type GroupBookingPage   = ReturnType<typeof createGroupBookingPage>;
type CommonPage         = ReturnType<typeof createCommonPage>;

export class CustomWorld extends World {
	browser!:       Browser;
	context!:       BrowserContext;
	page!:          Page;
	flightSearch!:  FlightSearchPage;
	flightResults!: FlightResultsPage;
	review!:        ReviewPage;
	flightTracker!: FlightTrackerPage;
	groupBooking!:  GroupBookingPage;
	common!:        CommonPage;
}

setWorldConstructor(CustomWorld);