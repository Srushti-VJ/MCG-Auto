import { test } from '@playwright/test';
import { CareersPage } from '../pages/Careers.page.js';

test('Careers page UI interactions (network idle)', async ({ page }) => {
  const careersPage = new CareersPage(page);

  await careersPage.openCareersPage();

  // Mail first
  await careersPage.verifyMailLink();

  // Image scroll
  await careersPage.scrollImagesWithArrows();

});
