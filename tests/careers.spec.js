import { test } from '@playwright/test';
import { CareersPage } from '../pages/Careers.page.js';

test('Careers Page Validation', async ({ page }) => {

  const careers = new CareersPage(page);

  await careers.openCareersPage();

  await careers.validateCareerCards();

  await careers.validateCurrentOpenings();

   await careers.scrollImagesWithArrows();
});