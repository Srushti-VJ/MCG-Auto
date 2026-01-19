import { test } from '@playwright/test';
import { VisionMissionPage } from '../pages/VisionMission.page';

test('Vision & Mission page – open and scroll', async ({ page }) => {
  const visionMission = new VisionMissionPage(page);

  await visionMission.openVisionMission();
  await visionMission.scrollVisionMissionPage();
});
