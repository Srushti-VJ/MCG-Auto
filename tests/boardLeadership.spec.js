import { test } from '@playwright/test';
import { BoardLeadershipPage } from '../pages/boardLeadership.page.js';

test('Board & Leadership – validate board members data', async ({ page }) => {
  const board = new BoardLeadershipPage(page);

  await board.openBoardLeadership();
  await board.scrollPage();
  await board.validateBoardData();
  await board.validateStatsData();

});
