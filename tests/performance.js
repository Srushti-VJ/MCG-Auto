export async function getLoadTime(page) {
  return await page.evaluate(() => {
    const timing = performance.timing;
    return (timing.loadEventEnd - timing.navigationStart) / 1000;
  });
}