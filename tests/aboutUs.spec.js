import { test } from '@playwright/test';
import { AboutPage } from '../pages/AboutUs.page';

test('About Us page – open and scroll', async ({ page }) => {
  const about = new AboutPage(page);

  await about.openAbout();
  await about.scrollAboutPage();
});

