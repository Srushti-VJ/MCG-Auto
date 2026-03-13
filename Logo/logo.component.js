const { expect } = require('@playwright/test');

class LogoComponent {

  constructor(page) {
    this.page = page;

    this.headerLogo = page.locator('header a:has(svg[aria-label="Marwadi Chandarana Group Logo"])');

  }

async verifyLogoBehaviour() {

  const currentUrl = this.page.url();

  // 👀 Highlight the Logo so you can SEE what is getting clicked
  await this.headerLogo.first().evaluate(el => {
    el.style.border = "5px solid red";
    el.style.backgroundColor = "blue";
  });

  // 👀 Wait so you can SEE the highlight
  await this.page.waitForTimeout(3000);

  // 🖱 Click the logo
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    this.headerLogo.first().click()
  ]);

  // 👀 Wait so you can SEE the Home page after navigation
  await this.page.waitForTimeout(3000);

  // ✅ Now verify navigation actually happened
  await expect(this.page).not.toHaveURL(currentUrl);

  await expect(this.page).toHaveURL('https://www.marwadichandaranagroup.com/');

  console.log('✅ Logo CLICKED and navigated to Homepage');

}




}

module.exports = { LogoComponent };
