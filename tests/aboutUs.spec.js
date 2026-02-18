import { test } from '@playwright/test';
import { AboutPage } from '../pages/AboutUs.page';
const { LogoComponent } = require('../Logo/logo.component');

test('About Us page – open and scroll', async ({ page }) => {
  const about = new AboutPage(page);
  const logo = new LogoComponent(page);

  await about.openAbout();
  await about.scrollAboutPage();

  await logo.verifyLogoBehaviour();

});

