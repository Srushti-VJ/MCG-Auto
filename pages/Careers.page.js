import { expect } from '@playwright/test';

export class CareersPage {
  constructor(page) {
    this.page = page;

    // Mail link
    this.mailLink = page.getByRole('link', {
      name: /careers@marwadichandarana\.com/i,
    });

    // Image cards
    this.imageCards = page.locator(
      'div.group\\/item:has(div.absolute.bg-black\\/40)'
    );

    // Overlay
    this.imageOverlay = this.imageCards.locator(
      'div.absolute.bg-black\\/40'
    );

    // Image scroll right and left
    this.scrollRightBtn = page.locator('//button[@aria-label="Scroll Right"]');
    this.scrollLeftBtn = page.locator('//button[@aria-label="Scroll Left"]');
   }

  async openCareersPage() {
    await this.page.goto('/careers', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  // ✅ MAIL (NO footer scroll)
    async verifyMailLink() {
    await this.mailLink.waitFor({ state: 'visible', timeout: 15000 });

    await expect(this.mailLink).toHaveAttribute(
      'href',
      'mailto:careers@marwadichandarana.com'
    );
   }

  //scroll images
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

    // 👉 swipe RIGHT till last image (fast + safe)
    for (let j = 0; j < imageCount - 1; j++) {
      if (!(await rightBtn.isVisible())) break;
      await rightBtn.click();
      await this.page.waitForTimeout(300); // 👈 reduced from 1200
    }

    // 👉 swipe LEFT back to first image (fast + safe)
    for (let j = 0; j < imageCount - 1; j++) {
      if (!(await leftBtn.isVisible())) break;
      await leftBtn.click();
      await this.page.waitForTimeout(300); // 👈 reduced from 1200
    }
  }
}



}
