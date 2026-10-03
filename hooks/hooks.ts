import { After, Before, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

import { createCommonPage } from '../pages/CommonPage';
import { createFlightResultsPage } from '../pages/FlightResultsPage';
import { createFlightSearchPage } from '../pages/FlightSearchPage';
import { createFlightTrackerPage } from '../pages/FlightTrackerPage';
import { createGroupBookingPage } from '../pages/GroupBookingPage';
import { createReviewPage } from '../pages/ReviewPage';
import { CustomWorld } from '../support/world';
import testData from '../data/testData.js';

setDefaultTimeout(testData.browser.defaultTimeout);

const SCREENSHOTS_DIR = path.join(process.cwd(), 'screenshots');
const VIDEOS_DIR = path.join(process.cwd(), 'artifacts', 'videos');

function resolveTestTag({ pickle }: ITestCaseHookParameter): string {
	const tcTag = pickle.tags.find((tag) => /^@TC-\d+$/i.test(tag.name));
	return tcTag
		? tcTag.name.replace('@', '')
		: pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_');
}

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
	const testTag = resolveTestTag(scenario);
	const videoDir = path.join(VIDEOS_DIR, testTag);
	fs.mkdirSync(videoDir, { recursive: true });

	// Store the per-test video directory so the After hook can retrieve the path.
	(this as any)._videoDir = videoDir;
	(this as any)._testTag = testTag;

	const browserName = process.env.BROWSER || 'chromium';
	const launchOptions = {
		headless: process.env.HEADLESS !== 'false',
		args: browserName === 'chromium' ? ['--disable-blink-features=AutomationControlled'] : [],
	};

	switch (browserName) {
		case 'firefox':
			this.browser = await firefox.launch(launchOptions);
			break;
		case 'webkit':
			this.browser = await webkit.launch(launchOptions);
			break;
		case 'chromium':
		default:
			this.browser = await chromium.launch(launchOptions);
			break;
	}

	this.context = await this.browser.newContext({
		userAgent: testData.browser.userAgent,
		viewport: testData.browser.viewport,
		// Headless Chromium defaults to a locale that formats date labels as
		// "24 September 2026" instead of "September 24, 2026".
		locale: testData.browser.locale,
		// ── Video recording ──────────────────────────────────────────────────
		// Playwright writes a .webm file to `dir` after context.close() is
		// called.  We capture it in the After hook and rename it to a
		// human-readable filename.
		recordVideo: {
			dir: videoDir,
			size: testData.browser.viewport,
		},
	});

	this.page = await this.context.newPage();
	// Kept below the Cucumber step timeout so real hangs still surface a
	// useful Playwright error rather than an opaque "function timed out".
	this.page.setDefaultTimeout(testData.browser.pageTimeout);
	this.page.setDefaultNavigationTimeout(testData.browser.navigationTimeout);

	this.flightSearch = createFlightSearchPage(this.page);
	this.flightResults = createFlightResultsPage(this.page);
	this.review = createReviewPage(this.page);
	this.flightTracker = createFlightTrackerPage(this.page);
	this.groupBooking = createGroupBookingPage(this.page);
	this.common = createCommonPage(this.page);
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
	const testTag = (this as any)._testTag as string | undefined;
	const videoDir = (this as any)._videoDir as string | undefined;

	// ── Screenshot ───────────────────────────────────────────────────────────
	if (this.page) {
		fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		const screenshotPath = path.join(SCREENSHOTS_DIR, `${resolveTestTag(scenario)}-${timestamp}.png`);
		try {
			const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
			await this.attach(screenshot, 'image/png');
		} catch {
			// page may already be unavailable if the scenario closed it
		}
	}

	// ── Video ────────────────────────────────────────────────────────────────
	// context.close() triggers Playwright to finalise the video file.
	// We capture the path before closing, then rename it to a friendly name.
	let rawVideoPath: string | undefined;
	try {
		rawVideoPath = await this.page?.video()?.path();
	} catch { /* page already gone */ }

	await this.context?.close();
	await this.browser?.close();

	// After close() the video file exists on disk – rename & attach it.
	if (rawVideoPath && videoDir && testTag) {
		try {
			const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
			const destPath = path.join(videoDir, `${testTag}-${timestamp}.webm`);
			fs.renameSync(rawVideoPath, destPath);
			console.log(`\n  🎥  Video saved: ${destPath}`);
		} catch {
			// rename may fail if the raw path is already the dest
		}
	}
});
