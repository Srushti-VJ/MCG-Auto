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
    // Wait for all cards to be visible
    await this.page.waitForTimeout(2000);
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
    const isEnabled = await card.isEnabled();
    const isDisabled = await card.evaluate(el => el.disabled);
    const onclick = await card.getAttribute('onclick');
    console.log(`Card visible: ${isVisible}, Tag: ${tagName}, Href: ${href}, Enabled: ${isEnabled}, Disabled: ${isDisabled}, OnClick: ${onclick}`);
    console.log(`OuterHTML: ${outerHTML.substring(0, 200)}...`);

    const pagesBefore = context.pages().length;
    const urlBefore = this.page.url();

    // Click the card
    console.log(`Clicking card for: ${expectedUrl}`);
    
    // Listen for new page BEFORE clicking
    const popupPromise = context.waitForEvent('page');
    
    // Perform the click
    await card.click();
    
    let newPage;
    try {
      newPage = await Promise.race([
        popupPromise,
        this.page.waitForTimeout(5000).then(() => {
          console.log('Timeout waiting for popup');
          return null;
        })
      ]);
    } catch (e) {
      console.log(`Error waiting for popup: ${e.message}`);
      newPage = null;
    }
    
    if (!newPage) {
      // Maybe it navigated in same tab
      await this.page.waitForTimeout(2000);
      const actualUrl = this.page.url();
      console.log(`No new tab, checking current URL: ${actualUrl}`);
      
      if (actualUrl.includes(expectedUrl.replace('https://', ''))) {
        console.log(`✅ Successfully navigated in same tab to: ${actualUrl}`);
        await this.page.goBack({ waitUntil: 'domcontentloaded' });
        return;
      } else {
        throw new Error(
          `Card click produced no result. Expected ${expectedUrl}, got ${actualUrl}`
        );
      }
    }
    
    const actualUrl = newPage.url();
    console.log(`New page opened: ${actualUrl}`);

    if (!actualUrl.includes(expectedUrl.replace('https://', ''))) {
      throw new Error(
        `Group Companies redirection failed.
          Expected domain: ${expectedUrl}
          Actual URL: ${actualUrl}`
      );
    }

    console.log(`✅ Successfully navigated to: ${actualUrl}`);
    await newPage.close();
  }

  // CARD-BY-CARD (NO LOOP)
  async validateMarwadiOnline() {
    await this.highlightCard(this.marwadiOnline, 'https://www.marwadionline.com');
  }

  async validateMarwadiUniversity() {
    await this.highlightCard(this.marwadiUniversity, 'https://www.marwadiuniversity.ac.in');
  }

  async validate1Finance() {
    const href = await this.financeOne.getAttribute('href');
    console.log(`✅ 1Finance link points to: ${href}`);
    
    if (!href.includes('1finance.co.in')) {
      throw new Error(`Expected 1Finance link, got: ${href}`);
    }
  }

  async validateBloomfield() {
    await this.highlightCard(this.bloomfield, 'https://bloomfieldinnovations.in');
  }

  async validate1FinanceP2P() {
    await this.highlightCard(this.financeP2P, 'https://1financep2p.com');
  }

  async validatePixonEnergy() {
    const href = await this.pixonEnergy.getAttribute('href');
    console.log(`✅ Pixon Energy link points to: ${href}`);
    
    if (!href.includes('pixonenergy.com')) {
      throw new Error(`Expected Pixon Energy link, got: ${href}`);
    }
  }

  async validateIshanTechnologies() {
    await this.highlightCard(this.ishanTechnologies, 'https://ishantechnologies.com');
  }
}
