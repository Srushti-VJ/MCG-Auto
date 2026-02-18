const { expect } = require('@playwright/test');

class LogoComponent {

  constructor(page) {
    this.page = page;

    this.headerLogo = page.locator('header a:has(svg[aria-label="Marwadi Chandarana Group Logo"])');

  }

 async verifyLogoBehaviour() {

  await this.headerLogo.scrollIntoViewIfNeeded();

  await expect(this.headerLogo).toBeVisible();

  await this.headerLogo.click({ force: true });

  await expect(this.page).toHaveURL(/.*marwadichandaranagroup.com/);

  console.log('✅ Header Logo navigated successfully');

}



}

module.exports = { LogoComponent };
