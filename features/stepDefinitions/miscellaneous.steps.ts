import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

Then('the {string} header navigation link should be visible', async function (this: CustomWorld, name: string) {
  await this.common.expectHeaderNavLinkVisible(name);
});

When('the user clicks the {string} header navigation link', async function (this: CustomWorld, name: string) {
  await this.common.clickHeaderNavLink(name);
});

Then('the browser should navigate to a page containing {string}', async function (this: CustomWorld, path: string) {
  await this.common.expectUrlContains(path);
});

Then('a promotional banner should be visible', async function (this: CustomWorld) {
  await this.common.expectBannerVisible();
});

Then('the {string} footer link should be visible', async function (this: CustomWorld, name: string) {
  await this.common.expectFooterLinkVisible(name);
});

When('the user clicks the {string} footer link', async function (this: CustomWorld, name: string) {
  await this.common.clickFooterLink(name);
});

When('the user resizes the viewport to desktop width', async function (this: CustomWorld) {
  await this.common.resizeViewport(1440, 900);
});

When('the user resizes the viewport to tablet width', async function (this: CustomWorld) {
  await this.common.resizeViewport(768, 1024);
});

When('the user resizes the viewport to mobile width', async function (this: CustomWorld) {
  await this.common.resizeViewport(390, 844);
});

Then('the page layout should have no horizontal overlap', async function (this: CustomWorld) {
  await this.common.expectNoLayoutOverlap();
});
