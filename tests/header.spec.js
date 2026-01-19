import { test } from '@playwright/test';
import { HeaderPage } from '../pages/Header.page';

test('Header navigation - all menu items', async ({ page }) => {
  const header = new HeaderPage(page);

  await page.goto('https://www.marwadichandaranagroup.com');

  await header.clickHome();
  await page.goto('/');

  await header.clickAboutUs();
  await page.goto('/');

  await header.clickVisionMission();
  await page.goto('/');

  await header.clickBoardLeadership();
  await page.goto('/');

  await header.clickGroupCompanies();
  await page.goto('/');

  await header.clickCareers();
  await page.goto('/');

  await header.clickContact();
});
