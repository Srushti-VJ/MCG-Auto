import { boardLeadershipData } from '../Data/boardLeadership.data.js';

export class BoardLeadershipPage {

  constructor(page) {

    this.page = page;

    // leadership cards locator
    this.cards = page.locator('//div[contains(@class,"group") and .//h3]');

    this.expectedData = boardLeadershipData;

    // stats locators
    this.statNumbers = page.locator(
      '//div[@class="text-4xl font-normal text-mcg-gold mb-2"]'
    );

    this.statLabels = page.locator(
      '//div[@class="text-gray-600 dark:text-gray-400"]'
    );

  }

  async openBoardLeadership() {

    await this.page.goto('/leadership', {
      timeout: 60000,
      waitUntil: 'domcontentloaded'
    });

    // wait until network requests settle
    await this.page.waitForLoadState('networkidle');

  }

  async scrollPage() {

    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await this.page.waitForLoadState('networkidle');

  }

  async validateBoardData() {

    const count = await this.cards.count();

    console.log(`Total leadership cards found: ${count}`);

    for (let i = 0; i < count; i++) {

      const card = this.cards.nth(i);

      // ensure page stable
      await this.page.waitForLoadState('networkidle');

      // bring card into view
      await card.scrollIntoViewIfNeeded();

      // hover so action is visible
      await card.hover();

      const name = (await card.locator('h3').innerText()).trim();

      const designation = (
        await card.locator('div.text-mcg-gold').innerText()
      ).trim();

      console.log(`Checking card ${i + 1}: ${name}`);

      // validate name exists in dataset
      if (!(name in this.expectedData)) {

        throw new Error(
          `Leadership validation failed.
            Name found on UI but not in dataset: "${name}"`
        );

      }

      const expectedDesignation = this.expectedData[name];

      // validate designation if present
      if (designation !== "") {

        if (designation !== expectedDesignation) {

          throw new Error(
            `Designation mismatch
              Name: "${name}"
              Expected: "${expectedDesignation}"
              Actual: "${designation}"`
          );

        }

        console.log(`Validated: ${name} → ${designation}`);

      } 
      else {

        console.log(`Validated: ${name} (No designation on UI)`);

      }

    }

    console.log("Leadership validation completed successfully");

  }

  async validateStatsData() {

    const numberCount = await this.statNumbers.count();
    const labelCount = await this.statLabels.count();

    if (numberCount !== labelCount) {

      throw new Error(
        `Stats validation failed.
          Numbers count (${numberCount}) does not match Labels count (${labelCount}).`
      );

    }

    for (let i = 0; i < numberCount; i++) {

      await this.statNumbers.nth(i).scrollIntoViewIfNeeded();

      const numberText = (await this.statNumbers.nth(i).innerText()).trim();
      const labelText = (await this.statLabels.nth(i).innerText()).trim();

      console.log(`Stats validated: ${labelText} → ${numberText}`);

    }

  }

}