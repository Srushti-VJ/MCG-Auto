import { expect } from '@playwright/test';
import { careersCardsData } from '../Data/careers.data.js';

export class CareersPage {
  constructor(page) {
    this.page = page;

    // Career cards
    this.benefitCards = page.locator(
      '//div[contains(@class,"text-center") and .//h3]'
    );

    this.cardTitle = 'xpath=.//h3';
    this.cardDescription = 'xpath=.//p';

    // Buttons
    this.viewOpeningsBtn = page.locator(
      '//a[normalize-space()="View All Openings"]'
    );

    this.dropCvBtn = page.locator(
      '//a[normalize-space()="Drop Your CV"]'
    );

    // IMAGE LOGIC (UNCHANGED)
    this.imageCards = page.locator(
      'div.group\\/item:has(div.absolute.bg-black\\/40)'
    );

    this.imageOverlay = this.imageCards.locator(
      'div.absolute.bg-black\\/40'
    );

    this.scrollRightBtn = page.locator('//button[@aria-label="Scroll Right"]');
    this.scrollLeftBtn = page.locator('//button[@aria-label="Scroll Left"]');

    this.expectedCards = careersCardsData;
  }

  async openCareersPage() {
    await this.page.goto('/careers', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  // Validate cards
  async validateCareerCards() {

    const count = await this.benefitCards.count();

    console.log(`Total career cards found: ${count}`);

    for (let i = 0; i < count; i++) {

      const card = this.benefitCards.nth(i);

      await card.scrollIntoViewIfNeeded();
      await card.hover();

      const title = (await card.locator(this.cardTitle).innerText()).trim();
      const description = (
        await card.locator(this.cardDescription).innerText()
      ).trim();

      console.log(`Checking card ${i + 1}: ${title}`);

      const expectedDescription = this.expectedCards[title];

      if (!expectedDescription) {
        throw new Error(`Unexpected card found: ${title}`);
      }

      if (description !== expectedDescription) {
        throw new Error(`
Description mismatch
Title: ${title}
Expected: ${expectedDescription}
Actual: ${description}
`);
      }

      console.log(`Validated: ${title}`);
    }
  }

  // Click buttons and verify new pages
  async validateCurrentOpenings() {

    await this.viewOpeningsBtn.scrollIntoViewIfNeeded();

    // VIEW ALL OPENINGS
    const [openingsPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.viewOpeningsBtn.click()
    ]);

    await openingsPage.waitForLoadState();

    const openingsUrl = openingsPage.url();

    console.log(`Opened URL: ${openingsUrl}`);

    await expect(openingsUrl).toContain('job-portal');

    await openingsPage.close();


    // DROP YOUR CV
    const [cvPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.dropCvBtn.click()
    ]);

    await cvPage.waitForLoadState();

    const cvUrl = cvPage.url();

    console.log(`Opened URL: ${cvUrl}`);

    await expect(cvUrl).toContain('job-form');

    await cvPage.close();
  }

  // IMAGE SCROLL (BOTTOM OF PAGE)
  async scrollImagesWithArrows() {

    const rightCount = await this.scrollRightBtn.count();
    const leftCount = await this.scrollLeftBtn.count();

    if (rightCount !== leftCount) {
      throw new Error('Mismatch between left and right arrow buttons');
    }

    for (let i = 0; i < rightCount; i++) {

      const rightBtn = this.scrollRightBtn.nth(i);
      const leftBtn = this.scrollLeftBtn.nth(i);

      const slider = rightBtn.locator(
        'xpath=ancestor::div[contains(@class,"group")]'
      );

      const images = slider.locator('div.flex-shrink-0');
      const imageCount = await images.count();

      // Scroll right
      for (let j = 0; j < imageCount - 1; j++) {
        if (!(await rightBtn.isVisible())) break;
        await rightBtn.click();
        await this.page.waitForLoadState('networkidle');
      }

      // Scroll left
      for (let j = 0; j < imageCount - 1; j++) {
        if (!(await leftBtn.isVisible())) break;
        await leftBtn.click();
        await this.page.waitForLoadState('networkidle');
      }
    }
  }
}