const { expect } = require('@playwright/test');
const footerData = require('../Data/footer.data');

class FooterPage {
  constructor(page) {
    this.page = page;

    // ---------- QUICK LINKS ----------
    this.quickLinksSection = page.locator('nav[aria-label="Quick links"]');
    this.quickLinks = this.quickLinksSection.locator('a');

    // ---------- CORE BUSINESS VERTICALS ----------
    this.coreBusinessSection = page.locator('nav[aria-label="Core business verticals"]');
    this.coreBusinessLinks = this.coreBusinessSection.locator('a');

    // ---------- CONTACT US ----------
    this.contactUsSection = page.locator('h3:has-text("Contact Us")').locator('..');
    this.contactLinks = this.contactUsSection.locator('ul a');

    // ---------- SOCIAL MEDIA ----------
    this.socialMediaSection = page.locator('div[aria-label="Social media links"]');
    this.socialMediaLinks = this.socialMediaSection.locator('a');

    // ---------- MCIBPL SECTION ----------
    this.mcibplSection = page
      .locator('div.space-y-2')
      .filter({ has: page.locator('p', { hasText: 'MCIBPL' }) });

    // ---------- MCIBPL GOOGLE MAP LINKS ----------
    this.mcibplMapLinks = this.mcibplSection.locator(
      'a[href*="google.com/maps"]'
    );

    // ---------- MSFL SECTION ----------
    this.msflSection = page
      .locator('div.space-y-2')
      .filter({ has: page.locator('p', { hasText: 'MSFL' }) });

    // ---------- MSFL GOOGLE MAP LINKS ----------
    this.msflMapLinks = this.msflSection.locator(
      'a[href*="google.com/maps"]'
);

    // ===== LEGAL & ACCESSIBILITY LINKS =====
    this.legalSection = page.locator('nav[aria-label="Legal and accessibility"]');
    this.legalLinks = this.legalSection.locator('a');


  }

  async goto() {
    await this.page.goto('https://www.marwadichandaranagroup.com/', {
      waitUntil: 'domcontentloaded'
    });
  }

  async scrollToQuickLinks() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await this.quickLinksSection.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.quickLinksSection).toBeVisible();
  }

  async scrollToCoreBusiness() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await this.coreBusinessSection.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.coreBusinessSection).toBeVisible();
  }

  // ---------- QUICK LINKS ----------
  async clickAllQuickLinks() {
    const count = await this.quickLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = this.quickLinks.nth(i);
      const href = await link.getAttribute('href');
      const target = await link.getAttribute('target');

      console.log(`Quick Link ${i + 1}: ${href}`);

      if (target === '_blank') {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          link.click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        await newPage.close();
      } else {
        await link.click();
        await this.page.waitForURL(`**${href}**`);
        await this.page.goBack();
        await this.page.waitForLoadState('domcontentloaded');
      }

      await this.scrollToQuickLinks();
    }
  }

  // ---------- CORE BUSINESS ----------
  async clickAllCoreBusinessLinks() {
    const count = await this.coreBusinessLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = this.coreBusinessLinks.nth(i);
      const href = await link.getAttribute('href');
      const target = await link.getAttribute('target');

      console.log(`Core Business Link ${i + 1}: ${href}`);

      if (target === '_blank') {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          link.click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        await newPage.close();
      } else {
        await link.click();
        await this.page.waitForURL(`**${href}**`);
        await this.page.goBack();
        await this.page.waitForLoadState('domcontentloaded');
      }

      await this.scrollToCoreBusiness();
    }
  }

  // ---------- CONTACT US ----------
  async scrollToContactUs() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await this.contactUsSection.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.contactUsSection).toBeVisible();
  }

  async clickAllContactLinks() {
    const count = await this.contactLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = this.contactLinks.nth(i);
      const href = await link.getAttribute('href');
      const target = await link.getAttribute('target');

      console.log(`Contact Link ${i + 1}: ${href}`);
      await link.scrollIntoViewIfNeeded();

      if (target === '_blank' || href.startsWith('https')) {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          link.click({ force: true })
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        await newPage.close();
      } else {
        await link.click({ force: true });
        await this.page.waitForTimeout(1500);
      }

      await this.scrollToContactUs();
    }
  }

  // ---------- SOCIAL MEDIA ----------
    // ---------- SOCIAL MEDIA ----------
  async clickAllSocialMediaLinks() {
  const count = await this.socialMediaLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const link = this.socialMediaLinks.nth(i);
    const href = await link.getAttribute('href');

    console.log('Social Link:', href);

    // Direct navigation (NO click, NO tab issues)
    await this.page.goto(href, { waitUntil: 'domcontentloaded' });

    console.log('✅ Social page opened:', this.page.url());

    // Go back to main site
    await this.goto();

    // Scroll back to footer
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
  }
}


  // ---------- MCIBPL VALIDATION ----------
  async validateMcibplSection() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );

    // TEXT VALIDATION
    for (const expectedText of footerData.mcibpl.textValidations) {
      await expect(this.mcibplSection).toContainText(expectedText);
      console.log(`✅ MCIBPL DATA VALIDATED: ${expectedText}`);
    }

    // GOOGLE MAP LINKS (NO NAVIGATION)
    const mapLinks = await this.mcibplMapLinks.evaluateAll(links =>
      links.map(link => link.href)
    );

    for (const mapUrl of mapLinks) {
      console.log('✅ MCIBPL MAP VALIDATED:', mapUrl);
      expect(mapUrl).toContain('google.com/maps');
    }
  }
  // ---------- MSFL VALIDATION ----------
  async validateMsflSection() {
  // scroll to footer
  await this.page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight)
  );

  // TEXT VALIDATION
  for (const expectedText of footerData.msfl.textValidations) {
    await expect(this.msflSection).toContainText(expectedText);
    console.log(`✅ MSFL DATA VALIDATED: ${expectedText}`);
  }

  // GOOGLE MAP LINKS (NO NAVIGATION)
  const mapLinks = await this.msflMapLinks.evaluateAll(links =>
    links.map(link => link.href)
  );

  for (const mapUrl of mapLinks) {
    console.log('✅ MSFL MAP VALIDATED:', mapUrl);
    expect(mapUrl).toContain('google.com/maps');
  }

  // wait till MSFL section is visible (React rendered)
await this.msflSection.waitFor({ state: 'visible' });

}

// ---------- LEGAL & ACCESSIBILITY LINKS ----------
async clickAllLegalLinks() {

  // Disable animations (fix layout shift from ticker & scroll reveal)
  await this.page.addStyleTag({
    content: `*,*::before,*::after{
      animation:none!important;
      transition:none!important;
    }`
  });

  const links = this.page.locator('nav[aria-label="Legal and accessibility"] a');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {

    const link = links.nth(i);
    const href = await link.getAttribute('href');

    console.log(`Legal Link ${i + 1}: ${href}`);

    await link.scrollIntoViewIfNeeded();
    await link.click();

    await this.page.waitForURL(`**${href}**`);

    console.log('✅ Legal page opened:', this.page.url());

    await this.page.goBack();
    await this.page.waitForLoadState('domcontentloaded');
  }
}


}

module.exports = { FooterPage };
