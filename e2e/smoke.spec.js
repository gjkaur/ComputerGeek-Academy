import { test, expect } from '@playwright/test';

test.describe('ComputerGeek Academy — Python focus smoke', () => {
  test('landing sells Python bootcamp at CA$999 and not Java', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ComputerGeek Academy/i);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Python/i);
    await expect(page.getByText(/CA\$999/i).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Code Lab/i }).first()).toBeVisible();
    await expect(page.getByText(/\bJava\b/i)).toHaveCount(0);
  });

  test('nav goes to bootcamp and code lab', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: /Python Bootcamp/i }).click();
    await expect(page).toHaveURL(/python-software-engineer-bootcamp/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Python Software Engineer Bootcamp/i);

    await page.getByRole('navigation').getByRole('link', { name: /Code Lab/i }).click();
    await expect(page).toHaveURL(/labs\/python/);
    await expect(page.getByText(/Python Visual Dry-Run Lab|Trace program/i).first()).toBeVisible();
  });

  test('bootcamp course page shows CAD tuition and curriculum weeks', async ({ page }) => {
    await page.goto('/courses/python-software-engineer-bootcamp');
    await expect(page.getByText(/CA\$999/i).first()).toBeVisible();
    await expect(page.getByText(/Week 1/i).first()).toBeVisible();
    await expect(page.getByText(/Week 8/i).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Code Lab|Visual Code Lab/i }).first()).toBeVisible();
  });

  test('Python Code Lab loads editor and examples', async ({ page }) => {
    await page.goto('/labs/python');
    await expect(page.getByRole('button', { name: /Trace program/i })).toBeVisible();
    await expect(page.getByRole('navigation', { name: /lab modules/i })).toBeVisible();
    await expect(page.getByText(/5 exercises each/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Ex 1/i }).first()).toBeVisible();
    await expect(page.getByText(/Interactive greeting/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /^Module 1$/i }).or(page.getByRole('button', { name: /Module 1/i })).first()).toBeVisible();
    await page.getByRole('button', { name: /Week 8/i }).first().click();
    await page.getByRole('button', { name: /Module 32/i }).click();
    await expect(page.getByRole('button', { name: /Ex 5/i }).last()).toBeVisible();
    await page.getByRole('button', { name: /Ex 5/i }).last().click();
    await expect(page.getByText(/Capstone shape/i).first()).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
    await expect(page.getByText(/Memory/i).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Exit lab/i })).toBeVisible();
  });

  test('Python Code Lab can trace a simple program', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/labs/python');
    await page.getByRole('button', { name: /Ex 1/i }).first().click();
    await page.getByRole('button', { name: /Trace program/i }).click();

    // Pyodide first load can take a while on cold CDN
    await expect(page.getByText(/Step\s+1\s*\/\s*\d+/i)).toBeVisible({ timeout: 90_000 });
    await expect(page.getByText(/Memory boxes|Memory \(variables\)/i).first()).toBeVisible();

    const stepBtn = page.getByRole('button', { name: /Step →/i });
    if (await stepBtn.isEnabled()) {
      await stepBtn.click();
    }
    await expect(page.locator('body')).toContainText(/name|age|ComputerGeek|Alex/i);
  });

  test('courses catalog is Python-only', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.getByText(/Python Software Engineer Bootcamp/i).first()).toBeVisible();
    await expect(page.getByText(/Generative AI for Professionals/i)).toHaveCount(0);
    await expect(page.getByText(/\bJava\b/i)).toHaveCount(0);
  });

  test('Java lab route redirects to Python lab', async ({ page }) => {
    await page.goto('/labs/java');
    await expect(page).toHaveURL(/labs\/python/);
    await expect(page.getByRole('button', { name: /Trace program/i })).toBeVisible();
    await expect(page.getByText(/Java Visual Dry-Run Lab/i)).toHaveCount(0);
  });
});
