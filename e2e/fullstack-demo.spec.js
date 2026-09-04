import { test, expect } from '@playwright/test';
import { DEMO_INSTRUCTOR, DEMO_STUDENT } from '../src/data/demoAccounts.js';

/**
 * Full-stack demo loop.
 * BASE_URL=http://127.0.0.1:5173 npx playwright test e2e/fullstack-demo.spec.js --workers=1
 */
test.describe.configure({ mode: 'serial' });

test.describe('Full-stack demo', () => {
  test('instructor can sign in and open course editor', async ({ page }) => {
    await page.goto('/admin/login');
    await page.locator('#email').fill(DEMO_INSTRUCTOR.email);
    await page.locator('#password').fill(DEMO_INSTRUCTOR.password);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page).toHaveURL(/\/admin\/?$/);

    await page.goto('/admin/courses/new');
    await expect(page.getByRole('heading', { name: /create new course/i })).toBeVisible();

    await page.locator('input').first().fill('Instructor Built QA Course');
    await page.getByRole('button', { name: /modules & lessons/i }).click();
    await page.getByRole('button', { name: /add module/i }).click();
    await page.getByRole('button', { name: /^\+ video$/i }).click();
    await page.getByRole('button', { name: /^\+ lab$/i }).click();
    await page.getByRole('button', { name: /^labs$/i }).click();
    await expect(page.getByText(/auto-graded/i).first()).toBeVisible();

    await page.getByRole('button', { name: /basic info/i }).click();
    await page.getByRole('checkbox', { name: /published/i }).check();
    await page.getByRole('checkbox', { name: /certificate enabled/i }).check();
    await page.getByRole('button', { name: /save course/i }).click();
    await expect(page.getByText(/saved!/i)).toBeVisible();
  });

  test('student pays, passes graded lab, unlocks certificate', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('cga_demo_session');
      localStorage.removeItem('cga_progress');
      localStorage.removeItem('cga_enrollments');
      localStorage.removeItem('cga_enrollment_requests');
    });

    await page.goto('/login');
    await page.locator('#email').fill(DEMO_STUDENT.email);
    await page.locator('#password').fill(DEMO_STUDENT.password);
    await page.locator('form').getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.goto('/courses/demo-fullstack-mini');
    await expect(page.getByRole('link', { name: /pay & enroll/i })).toBeVisible();
    await page.getByRole('link', { name: /pay & enroll/i }).click();
    await expect(page).toHaveURL(/\/checkout/);

    await page.getByRole('button', { name: /fill demo card/i }).click();
    await page.getByRole('button', { name: /pay .* enroll/i }).click();
    await expect(page).toHaveURL(/\/learn\/demo-fullstack-mini/, { timeout: 20_000 });

    await page.goto('/learn/demo-fullstack-mini/lesson/demo-lesson-video');
    await page.getByRole('button', { name: /mark as complete/i }).click();

    await page.goto('/learn/demo-fullstack-mini/quiz/demo-quiz-1');
    await page.getByText('Pass all graded labs with correct solutions').click();
    await page.getByText('Python', { exact: true }).click();
    await page.getByRole('button', { name: /submit quiz/i }).click();
    await expect(page.getByText(/quiz passed/i)).toBeVisible();

    await page.goto('/learn/demo-fullstack-mini/assignment/demo-assign-1');
    await page.locator('#submission').fill('I want to learn Python the ComputerGeek way.');
    await page.getByRole('button', { name: /submit assignment/i }).click();
    await expect(page.getByText(/assignment submitted/i)).toBeVisible();

    await page.goto('/learn/demo-fullstack-mini/lab/demo-lab-1');
    await page.getByLabel(/lab solution code/i).fill('print("nope")');
    await page.getByRole('button', { name: /submit solution/i }).click();
    await expect(page.getByText(/not passed/i)).toBeVisible();

    await page.goto('/dashboard');
    await expect(page.getByRole('button', { name: /certificate \(labs must pass\)/i })).toBeDisabled();

    await page.goto('/learn/demo-fullstack-mini/lab/demo-lab-1');
    await page.getByLabel(/lab solution code/i).fill('print("Hello, ComputerGeek Academy!")');
    await page.getByRole('button', { name: /submit solution/i }).click();
    await expect(page.getByText(/lab passed/i)).toBeVisible();

    await page.goto('/dashboard');
    const certBtn = page.getByRole('button', { name: /download certificate/i });
    await expect(certBtn).toBeEnabled();
    await certBtn.click();
  });
});
