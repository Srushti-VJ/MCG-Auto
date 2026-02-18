const { test } = require('@playwright/test');
const { FooterPage } = require('../pages/footer.page');
const footerData = require('../Data/footer.data'); // ✅ THIS WAS MISSING



test('Footer - Quick Links + Core Business Verticals (BEST PRACTICE)', async ({ page }) => {
  const footerPage = new FooterPage(page);


  await footerPage.goto();

  // QUICK LINKS
  await footerPage.scrollToQuickLinks();
  await footerPage.clickAllQuickLinks();

  // CORE BUSINESS VERTICALS
  await footerPage.scrollToCoreBusiness();
  await footerPage.clickAllCoreBusinessLinks();

  // CONTACT US
  await footerPage.scrollToContactUs();
  await footerPage.clickAllContactLinks();

  // SOCIAL MEDIA
  await footerPage.clickAllSocialMediaLinks();

  //MCIBPL
  await footerPage.validateMcibplSection();

  //MSFL
  await footerPage.validateMsflSection();

  // LEGAL & ACCESSIBILITY
  await footerPage.clickAllLegalLinks();

   



});