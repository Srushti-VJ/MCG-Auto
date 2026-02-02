const { test } = require("@playwright/test");
const { ContactPage } = require("../pages/ContactUs.page.js");
const testdata = require("../Data/testdata");

test("Contact form submission", async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.openContactPage();

  await contactPage.fillContactForm(
    testdata.name,
    testdata.email,
    testdata.phone,
    testdata.message
  );

  await contactPage.submitWithNetworkValidation();

  console.log("✅ Contact form submitted successfully");

  await contactPage.hoverOnAllOfficeCards();

  await contactPage.clickPhoneAndMailInEachCard();


}
);