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

    //Image scroll right and left
    this.scrollRightBtn = page.locator('//button[@aria-label="Scroll Right"]');
    this.scrollLeftBtn = page.locator('//button[@aria-label="Scroll Left"]');

  }

  async openCareersPage() {
    await this.page.goto('/careers', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  // ✅ STEP 1: MAIL (scroll + click properly)
  async verifyMailLink() {
    // scroll page, NOT element
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );

    // wait until mail is visible
    await this.mailLink.waitFor({ state: 'visible', timeout: 15000 });

    await expect(this.mailLink).toHaveAttribute(
      'href',
      'mailto:careers@marwadichandarana.com'
    );

    // ✅ CLICK (not just hover)
    await this.mailLink.click();
  }

  async scrollImagesWithArrows() {
  const rightCount = await this.scrollRightBtn.count();
  const leftCount = await this.scrollLeftBtn.count();

  // sanity check
  if (rightCount !== leftCount) {
    throw new Error('Mismatch between left and right arrow buttons');
  }

  for (let i = 0; i < rightCount; i++) {
    const rightBtn = this.scrollRightBtn.nth(i);
    const leftBtn = this.scrollLeftBtn.nth(i);

    // wait for THIS slider's right arrow
    await rightBtn.waitFor({ state: 'visible', timeout: 15000 });

    // click right
    await rightBtn.click();
    await this.page.waitForLoadState('networkidle');

    // click left
    await leftBtn.waitFor({ state: 'visible', timeout: 15000 });
    await leftBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}


}
