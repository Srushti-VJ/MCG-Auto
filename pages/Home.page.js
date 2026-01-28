export class HomePage {
  constructor(page) {
    this.page = page;

    //Expected data for validations
    this.expectedStatsData = {
      'Market Share in SLBM Segment^': '25.5%+',
      'Years of Operations': '30+',
      'Branches': '96',
      'Clients#': '3 Lakh+',
      'Cities': '100+',
      'Pincodes': '3,800',
      'Market Share Equity & F&O Segment^': '1.38%',
    };

    // Buttons
    this.discoverOurStoryBtn = page.locator(
      'a[href="/about"]:has-text("Discover Our Story")'
    );

    this.getInTouchBtn = page.locator(
      'a[href="/contact"]:has-text("Get in Touch")'
    );

    // CARD CONTAINERS (based on heading text)
    this.brokingCard = page.locator(
      '//h3[text()="Broking"]/ancestor::div[contains(@class,"group")]'
    );

    this.algoTradingCard = page.locator(
      '//h3[text()="Algo Trading"]/ancestor::div[contains(@class,"group")]'
    );

    this.hftTradingCard = page.locator(
      '//h3[text()="HFT Trading"]/ancestor::div[contains(@class,"group")]'
    );

    this.merchantBankingCard = page.locator(
      '//h3[text()="Merchant Banking"]/ancestor::div[contains(@class,"group")]'
    );

    this.distributionServicesCard = page.locator(
      '//h3[text()="Distribution Services"]/ancestor::div[contains(@class,"group")]'
    );

    this.etfPreciousMetalsCard = page.locator(
      '//h3[text()="ETF - Precious Metals"]/ancestor::div[contains(@class,"group")]'
    );

    this.depositoryParticipantCard = page.locator(
      '//h3[text()="Depository Participant"]/ancestor::div[contains(@class,"group")]'
    );

    // YouTube iframe on Home page
    this.youtubeIframe = page.frameLocator('iframe[src*="youtube.com"]');

    // Play button / thumbnail inside iframe
    this.youtubePlayButton = this.youtubeIframe.locator(
      '[aria-label="Play"]'
    );

    // Contact Us Today button (below YouTube section)
    this.contactUsTodayBtn = page.locator(
      '//a[@href="/contact" and normalize-space()="Contact Us Today"]'
    );
  }

  async openHome() {
    try {
      await this.page.goto('/', { timeout: 60000, waitUntil: 'domcontentloaded' });
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Navigation failed:', error);
      throw error;
    }
  }

  async clickDiscoverOurStory() {
    await this.discoverOurStoryBtn.click();
    await this.page.waitForURL('**/about');
  }

  async clickGetInTouch() {
    await this.getInTouchBtn.click();
    await this.page.waitForURL('**/contact');
  }

  // CORE LOGIC
  async clickCard(cardContainer, href) {
    await cardContainer.scrollIntoViewIfNeeded();

    const el = await cardContainer.elementHandle();
    await this.page.evaluate(e => {
      e.style.outline = '3px solid brown';
    }, el);

    await cardContainer.locator(`a[href="${href}"]`).click();
    await this.page.waitForURL(`**${href}`);
  }

  async clickBroking() {
    await this.clickCard(this.brokingCard, '/verticals/broking');
  }

  async clickAlgoTrading() {
    await this.clickCard(this.algoTradingCard, '/verticals/algo-trading');
  }

  async clickHftTrading() {
    await this.clickCard(this.hftTradingCard, '/verticals/hft-trading');
  }

  async clickMerchantBanking() {
    await this.clickCard(this.merchantBankingCard, '/verticals/merchant-banking');
  }

  async clickDistributionServices() {
    await this.clickCard(this.distributionServicesCard, '/verticals/distribution-services');
  }

  async clickEtfPreciousMetals() {
    await this.clickCard(this.etfPreciousMetalsCard, '/verticals/etf-precious-metals');
  }

  async clickDepositoryParticipant() {
    await this.clickCard(this.depositoryParticipantCard, '/verticals/depository-participant');
  }

  // ✅ ONLY YOUTUBE LOGIC CHANGED
  async clickYoutubeVideo() {
    const iframe = this.page.locator('iframe[src*="youtube.com"]');
    await iframe.scrollIntoViewIfNeeded();

    await this.youtubePlayButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.youtubePlayButton.click(); // just click Play and continue
  }

  // Contact button
  async clickContactUsToday() {
    await this.contactUsTodayBtn.scrollIntoViewIfNeeded();
    await this.contactUsTodayBtn.click();
    await this.page.waitForURL('**/contact', { timeout: 60000 });
  }
}
