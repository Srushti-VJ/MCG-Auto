import { test, expect } from '@playwright/test';
import { pages } from '../Data/pages.data.js';
import { getLoadTime } from './performance';

const BASE_URL = 'https://www.marwadichandaranagroup.com';

test.describe('Page Load Performance Tests', () => {

  for (const { name, path } of pages) {

    test(`${name} should load under 3 sec`, async ({ page }) => {

      await page.goto(BASE_URL + path);

      const loadTime = await getLoadTime(page);

      console.log(`${name}: ${loadTime}s`);

      expect(loadTime).toBeLessThan(3.5);

    });

  }

});