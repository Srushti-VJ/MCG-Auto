export class GroupCompaniesPage {
  constructor(page) {
    this.page = page;

    // Group Companies card locators
    this.marwadiOnline = page.locator('//a[@href="https://www.marwadionline.com"]');
    this.marwadiUniversity = page.locator('//a[@href="https://www.marwadiuniversity.ac.in"]');
    this.financeOne = page.locator('//a[@href="https://www.1finance.co.in"]');
    this.bloomfield = page.locator('//a[@href="https://bloomfieldinnovations.in"]');
    this.financeP2P = page.locator('//a[@href="https://1financep2p.com"]');
    this.pixonEnergy = page.locator('//a[@href="https://www.pixonenergy.com"]');
    this.ishanTechnologies = page.locator('//a[@href="https://ishantechnologies.com"]');
  }

  async openGroupCompanies() {
    await this.page.goto('/group-companies', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
  }

  // ✅ FINAL BULLETPROOF METHOD
  async highlightCard(card, expectedUrl) {
    const context = this.page.context();

    // Scroll + highlight
    await card.scrollIntoViewIfNeeded();
    const el = await card.elementHandle();
    await this.page.evaluate(e => {
      e.style.outline = '3px solid brown';
    }, el);
    await this.page.waitForTimeout(1200);

    // Debug: check card details
    const isVisible = await card.isVisible();
    const tagName = await card.evaluate(el => el.tagName);
    const href = await card.getAttribute('href');
    const outerHTML = await card.evaluate(el => el.outerHTML);
    console.log(`Card visible: ${isVisible}, Tag: ${tagName}, Href: ${href}`);
    console.log(`OuterHTML: ${outerHTML.substring(0, 200)}...`);

    const pagesBefore = context.pages().length;
    const urlBefore = this.page.url();

    // Click the card
    await card.click();

    // Give browser time to react
    await this.page.waitForTimeout(3000);

    const pagesAfter = context.pages().length;

    if (pagesAfter > pagesBefore) {
      // 🔹 NEW TAB OPENED
      const newPage = context.pages()[pagesAfter - 1];
      const actualUrl = newPage.url();

      if (!actualUrl.includes(expectedUrl.replace('https://', ''))) {
        throw new Error(
          `Group Companies redirection failed (new tab).
            Expected domain: ${expectedUrl}
            Actual URL: ${actualUrl}`
        );
      }

      console.log(`✅ Redirected (new tab): ${actualUrl}`);
      await newPage.close();
    } else {
      // 🔹 SAME TAB NAVIGATION
      const actualUrl = this.page.url();

      if (actualUrl === urlBefore) {
        throw new Error(
          `Group Companies card click failed - no navigation occurred.
            Card did not respond to click.
            URL remained: ${actualUrl}`
        );
      }

      if (!actualUrl.includes(expectedUrl.replace('https://', ''))) {
        throw new Error(
          `Group Companies redirection failed (same tab).
            Expected domain: ${expectedUrl}
            Actual URL: ${actualUrl}`
        );
      }

      console.log(`✅ Redirected (same tab): ${actualUrl}`);

      await this.page.goBack({ waitUntil: 'domcontentloaded' });
    }
  }

  // CARD-BY-CARD (NO LOOP)
  async validateMarwadiOnline() {
    await this.highlightCard(this.marwadiOnline, 'https://www.marwadionline.com');
  }

  async validateMarwadiUniversity() {
    await this.highlightCard(this.marwadiUniversity, 'https://www.marwadiuniversity.ac.in');
  }

  async validate1Finance() {
    await this.highlightCard(this.financeOne, 'https://www.1finance.co.in');
  }

  async validateBloomfield() {
    await this.highlightCard(this.bloomfield, 'https://bloomfieldinnovations.in');
  }

  async validate1FinanceP2P() {
    await this.highlightCard(this.financeP2P, 'https://1financep2p.com');
  }

  async validatePixonEnergy() {
    await this.highlightCard(this.pixonEnergy, 'https://www.pixonenergy.com');
  }

  async validateIshanTechnologies() {
    await this.highlightCard(this.ishanTechnologies, 'https://ishantechnologies.com');
  }
}
