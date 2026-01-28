import { test } from '@playwright/test';
import { HomePage } from '../pages/Home.page';

test('Home page – correct card-by-card automation', async ({ page }) => {
  const home = new HomePage(page);

  await home.openHome();


  await home.clickDiscoverOurStory();
  await home.openHome();

  await home.clickGetInTouch();
  await home.openHome();

  await home.clickBroking();
  await home.openHome();

  await home.clickAlgoTrading();
  await home.openHome();

  await home.clickHftTrading();
  await home.openHome();

  await home.clickMerchantBanking();
  await home.openHome();

  await home.clickDistributionServices();
  await home.openHome();

  await home.clickEtfPreciousMetals();
  await home.openHome();

  await home.clickDepositoryParticipant();
  await home.openHome();

  await home.clickYoutubeVideo();
  await home.openHome();

  await home.clickContactUsToday();

}
);

