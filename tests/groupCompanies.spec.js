import { test } from '@playwright/test';
import { GroupCompaniesPage } from '../pages/GroupCompanies.page';

test.setTimeout(120000); // ⬅️ IMPORTANT FIX

test('Group Companies – validate all cards', async ({ page }) => {
  const group = new GroupCompaniesPage(page);

  await group.openGroupCompanies();

  await group.validateMarwadiOnline();
  await group.validateMarwadiUniversity();
  await group.validate1Finance();
  await group.validateBloomfield();
  await group.validate1FinanceP2P();
  await group.validatePixonEnergy();
  await group.validateIshanTechnologies();
});
