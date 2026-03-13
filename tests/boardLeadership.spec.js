import { test } from '@playwright/test';
import { BoardLeadershipPage } from '../pages/boardLeadership.page.js';

test.describe('Board & Leadership Page', () => {

  test('Validate board members and stats data', async ({ page }) => {

    const board = new BoardLeadershipPage(page);

    await board.openBoardLeadership();

    await board.scrollPage();

    await board.validateBoardData();

    await board.validateStatsData();

  });

});