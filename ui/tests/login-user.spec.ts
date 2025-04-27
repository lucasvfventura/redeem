import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('User Login Page', () => {
  test('should register and login as user, then redirect to home', async ({ page }) => {
    // Go to login page and login
    await page.goto(`${baseURL}/login`);
    await page.fill('input#email', 'testuser@example.com');
    await page.fill('input#password', 'Password123!');
    await page.click('button[type="submit"]');

    // Check navbar for users links
    await expect(page.getByRole('link', { name: 'Rewards' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Redemptions' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Users' })).not.toBeVisible();
    // Check that the page contains Rewards heading
    await expect(page.locator('h1')).toContainText('Rewards');
  });
});
