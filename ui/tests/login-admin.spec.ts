import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('Admin Login Page', () => {
  test('should login as admin and redirect to home', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'password');
    await page.click('button[type="submit"]');

    // Check navbar for admin links using unique link names
    await expect(page.getByRole('link', { name: 'Rewards' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Redemptions' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Users' })).toBeVisible();
    // Check that the page contains Rewards heading
    await expect(page.locator('h1')).toContainText('Rewards');
  });
});
