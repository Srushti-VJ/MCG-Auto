export class HeaderPage {
  constructor(page) {
    this.page = page;

    // ✅ WORKING header locators (text-based, no guessing)
    this.homeLink = page.locator('a[href="/"]');
    this.aboutUsLink = page.locator('a:has-text("About")');
    this.visionMissionLink = page.locator('a:has-text("Vision")');
    this.boardLeadershipLink = page.locator('a:has-text("Board")');
    this.groupCompaniesLink = page.locator('a:has-text("Group")');
    this.careersLink = page.locator('a:has-text("Careers")');
    this.contactLink = page.locator('a:has-text("Contact")');
  }

  async clickHome() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.homeLink.first().click();
    await this.page.waitForTimeout(2000);
  }

  async clickAboutUs() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.aboutUsLink.first().click();
    await this.page.waitForTimeout(2000);
  }

  async clickVisionMission() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.visionMissionLink.first().click();
    await this.page.waitForTimeout(2000);
  }

  async clickBoardLeadership() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.boardLeadershipLink.first().click();
    await this.page.waitForTimeout(2000);
  }

  async clickGroupCompanies() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.groupCompaniesLink.first().click();
    await this.page.waitForTimeout(2000);
  }

  async clickCareers() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.careersLink.first().click();
    await this.page.waitForTimeout(2000);
  }

  async clickContact() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.contactLink.first().click();
    await this.page.waitForTimeout(2000);
  }
}
