export class BoardLeadershipPage {
  constructor(page) {
    this.page = page;

    // Expected data for validation (data-driven)
    this.expectedData = {
      'Ketan H. Marwadi': 'Co-Founder & Chairman, MCG',
      'Jitubhai A. Chandarana': 'Co-Founder & Vice Chairman, MCIBPL',
      'Deven H. Marwadi': 'Director, MCG',
      'Sandeep H. Marwadi': 'Director, MSFL',
      'Nishit J. Chandarana': 'Director, Marwadi Chandarana Educare Foundation',
      'Amish J. Chandarana': 'Managing Director, MCIBPL',
      'Jeet K. Marwadi': 'Director, 1 Finance',
      'Juhi V. Patel': 'Director, MSFL',
      'Dhruv S. Marwadi': 'Director, 1 Finance',
      'Bhavin M. Chandarana': 'Head Trading System, MCIBPL',
      'Abhiram Bhattacharjee': 'Group COO, MCG',
      'Mayur Khetan': 'Group CFO, MCG',
      'Samir Doshi': 'CEO, MCIBPL',
      'Atul Bapna': 'President, Compliance, MCIBPL',
      'Ketan Shah': 'CTO, MCIBPL',
      'Kayomarz Sadri': 'Senior Vice President, Commodities, MCIBPL',
      'Bipin Bhanushali': 'President - Investment Banking',
      'Keval Bhanushali': 'Co-Founder & CEO, 1 Finance',
      'Prof (Dr.) R. B Jadeja': 'Provost, Marwadi University',
      'Dr. Sanjeet Singh': 'Pro Vice Chancellor, Marwadi University',
      'Parin Ramavat': 'Assistant Vice President, Bloomfield Innovations',
      'Naresh Jadeja': 'Executive Registrar, Marwadi University',
    };

    this.expectedStatsData = {
      'Professionals': '2,200+',
      'Business Verticals': '5+',
      'Branch Locations': '96',
      'Cities Covered': '100+',
    };
  }

  async openBoardLeadership() {
    try {
      await this.page.goto('/leadership', {
        timeout: 60000,
        waitUntil: 'domcontentloaded',
      });
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Board & Leadership page navigation failed:', error);
      throw error;
    }
  }

  async scrollPage() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async validateBoardData() {
    // Generic locator for all board cards
    const cards = this.page.locator(
      '//div[contains(@class,"group") and .//h3]'
    );

    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const cardIndex = i + 1; // human-readable index

      await card.scrollIntoViewIfNeeded();
      await card.hover();

      // Name (GENERIC, XPath)
      const name = (
        await card
          .locator(
            'xpath=.//h3[@class="text-xl font-normal text-gray-900 dark:text-white mb-2"]'
          )
          .innerText()
      ).trim();

      // Designation (GENERIC, XPath)
      const designation = (
        await card
          .locator(
            'xpath=.//div[@class="text-mcg-gold font-semibold mb-4"]'
          )
          .innerText()
      ).trim();

      const expectedDesignation = this.expectedData[name];

      // Clear error: name not found
      if (!expectedDesignation) {
        throw new Error(
          `Board & Leadership validation failed.
           Card #: ${cardIndex}
          Name found on UI: "${name}"
          Reason: This name is NOT present in expected data.`
        );
      }

      // Clear error: designation mismatch
      if (designation !== expectedDesignation) {
        throw new Error(
          ` Board & Leadership validation failed.
            Card #: ${cardIndex}
            Name: "${name}"
            Expected designation: "${expectedDesignation}"
         Actual designation: "${designation}"`
        );
      }

      console.log(`Validated: ${name} → ${designation}`);
    }
  }

  async validateStatsData() {
  const statNumbers = this.page.locator(
    '//div[@class="text-4xl font-normal text-mcg-gold mb-2"]'
  );

  const statLabels = this.page.locator(
    '//div[@class="text-gray-600 dark:text-gray-400"]'
  );

  
  const numberCount = await statNumbers.count();
  const labelCount = await statLabels.count();

  if (numberCount !== labelCount) {
    throw new Error(
      `Stats validation failed.
Numbers count (${numberCount}) does not match Labels count (${labelCount}).`
    );
  }

  for (let i = 0; i < numberCount; i++) {
      
    await statNumbers.nth(i).scrollIntoViewIfNeeded();

    const numberText = (await statNumbers.nth(i).innerText()).trim();
    const labelText = (await statLabels.nth(i).innerText()).trim();

    const expectedNumber = this.expectedStatsData[labelText];

    if (!expectedNumber) {
      throw new Error(
        `❌ Stats validation failed.
         Label found on UI: "${labelText}"
        Reason: This label is not present in expected stats data.`
      );
    }

    if (numberText !== expectedNumber) {
      throw new Error(
        `❌ Stats validation failed.
         Label: "${labelText}"
         Expected value: "${expectedNumber}"
         Actual value: "${numberText}"`
      );
    }

    console.log(`✅ Stats validated: ${labelText} → ${numberText}`);
  }
}

}
