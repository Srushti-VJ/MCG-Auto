class ContactPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.nameInput = "//input[@placeholder='Your Name']";
    this.emailInput = "//input[@placeholder='your.email@example.com']";
    this.phoneInput = "//input[@type='tel']";
    this.messageInput =
      "//textarea[@placeholder='Tell us about your inquiry... (minimum 10 characters)']";
    this.submitButton = "//button[normalize-space()='Send Message']";

    //office loactors
    this.officeCards =
  "//div[h3 and .//a[starts-with(@href,'tel:')] and .//a[starts-with(@href,'mailto:')] and count(.//h3)=1 and not(ancestor::footer)]";

  // phone & mail INSIDE a card (RELATIVE locators)
    this.cardPhoneLink = "xpath=.//a[starts-with(@href,'tel:')]";
    this.cardMailLink  = "xpath=.//a[starts-with(@href,'mailto:')]";
  }

  async openContactPage() {
    await this.page.goto("https://www.marwadichandaranagroup.com/contact");
    await this.page.waitForSelector(this.nameInput);
  }

  async fillContactForm(name, email, phone, message) {
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.phoneInput, phone);
    await this.page.fill(this.messageInput, message);
  }

  async submitWithNetworkValidation() {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes("contact") && response.status() === 200
    );

    await this.page.click(this.submitButton);
    await responsePromise;
  }

  async hoverOnAllOfficeCards() {
  const cards = this.page.locator(this.officeCards);
  const count = await cards.count();

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await this.page.waitForTimeout(1000); // optional
  }
}

async clickPhoneAndMailInEachCard() {
  const cards = this.page.locator(this.officeCards);
  const count = await cards.count();

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);

    await card.scrollIntoViewIfNeeded();
    await card.hover();

    // phone inside this card
    const phoneLink = card.locator(this.cardPhoneLink);
    const phoneHref = await phoneLink.getAttribute("href");
    console.log(`Card ${i + 1} phone:`, phoneHref);

    // mail inside this card
    const mailLink = card.locator(this.cardMailLink);
    const mailHref = await mailLink.getAttribute("href");
    console.log(`Card ${i + 1} mail:`, mailHref);
  }
}
}

module.exports = { ContactPage };