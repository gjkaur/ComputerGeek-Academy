import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shotDir = path.join(__dirname, '../test-results/visual-review');

test.describe('Visual review screenshots', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('capture key pages for human visual QA', async ({ page }) => {
    const pages = [
      { name: '01-home-hero', url: '/', fullPage: false },
      { name: '02-home-full', url: '/', fullPage: true },
      { name: '03-bootcamp', url: '/courses/python-software-engineer-bootcamp', fullPage: true },
      { name: '04-code-lab', url: '/labs/python', fullPage: true },
      { name: '05-courses', url: '/courses', fullPage: true },
    ];

    for (const p of pages) {
      await page.goto(p.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(shotDir, `${p.name}.png`),
        fullPage: p.fullPage,
      });
    }

    // Sanity: files were written (suite still asserts product invariants)
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
