const { test, expect } = require('@playwright/test');

const SEARCH_TERM = 'Apple Juice';
const TEST_PASSWORD = 'Test@1234!';

function generateEmail() {
  return `demo_${Date.now()}@juiceshop.test`;
}

test('Full E2E Live Presentation: All 5 Workflows', async ({ page }) => {
  const testEmail = generateEmail();

  await test.step('Navigate and handle overlays', async () => {
    await page.goto('/');
    const welcome = page.getByLabel('Close Welcome Banner');
    if (await welcome.isVisible({ timeout: 5000 }).catch(() => false)) await welcome.click();
    const cookie = page.getByLabel('dismiss cookie message');
    if (await cookie.isVisible({ timeout: 3000 }).catch(() => false)) await cookie.click();
  });

  await test.step('Register New User', async () => {
    await page.goto('/#/register');
    await page.locator('#emailControl').fill(testEmail);
    await page.locator('#passwordControl').fill(TEST_PASSWORD);
    await page.locator('#repeatPasswordControl').fill(TEST_PASSWORD);
    await page.locator('mat-select[name="securityQuestion"]').click();
    await page.locator('mat-option').first().click();
    await page.locator('#securityAnswerControl').fill('PlaywrightDemo');
    await page.locator('#registerButton').click();
    await page.waitForURL(/.*login/);
  });

  await test.step('Login', async () => {
    await page.locator('#email').fill(testEmail);
    await page.locator('#password').fill(TEST_PASSWORD);
    await page.locator('#loginButton').click();
    await page.waitForURL(/.*\/#\//);
  });

  await test.step('Search Product', async () => {
    await page.locator('mat-icon.mat-search_icon-search').click();
    await page.locator('#searchQuery input').waitFor({ state: 'visible' });
    await page.locator('#searchQuery input').click();
    await page.keyboard.type(SEARCH_TERM);
    await page.keyboard.press('Enter');
    
    await page.waitForSelector('mat-grid-tile', { state: 'visible', timeout: 15000 });
  });

  await test.step('Add to Cart & Verify', async () => {
    await page.locator('button[aria-label="Add to Basket"]').first().click();
    await page.locator('simple-snack-bar').waitFor({ state: 'visible' });

    await page.getByLabel('Show the shopping cart').click();
    await page.waitForURL('**/basket');
    
    const cartRows = page.locator('mat-row');
    await expect(cartRows.first()).toBeVisible();
  });

  await test.step('Checkout - Address', async () => {
    await page.locator('#checkoutButton').click();
    
    await page.locator('.btn-new-address').click();
    
    await page.getByPlaceholder('Please provide a country.').fill('USA');
    await page.getByPlaceholder('Please provide a name.').fill('Test User');
    await page.getByPlaceholder('Please provide a mobile number.').fill('1234567890');
    await page.getByPlaceholder('Please provide a ZIP code.').fill('10001');
    await page.getByPlaceholder('Please provide an address.').fill('123 QA Automation St.');
    await page.getByPlaceholder('Please provide a city.').fill('New York');
    await page.getByPlaceholder('Please provide a state.').fill('NY');
    
    await page.locator('#submitButton').click();
    
    await page.waitForSelector('mat-row', { state: 'visible' });
    await page.locator('mat-radio-button').first().click();
    await page.waitForTimeout(500);
    await page.locator('button', { hasText: 'Continue' }).click();
  });

  await test.step('Checkout - Delivery Speed', async () => {
    await page.waitForSelector('mat-row', { state: 'visible' });
    await page.locator('mat-radio-button').first().click();
    await page.waitForTimeout(500);
    await page.locator('button', { hasText: 'Continue' }).click();
  });

  await test.step('Checkout - Payment Card', async () => {
    await page.getByText('Add new card').click();
    
    await page.locator('mat-expansion-panel').locator('input[type="text"]').first().fill('Test User');
    await page.locator('mat-expansion-panel').locator('input[type="number"]').first().fill('1111222233334444');
    
    await page.locator('mat-expansion-panel').locator('select').nth(0).selectOption('12');
    await page.locator('mat-expansion-panel').locator('select').nth(1).selectOption('2080');

    await page.locator('#submitButton').click();

    await page.waitForSelector('mat-row', { state: 'visible' });
    await page.locator('mat-radio-button').first().click();
    await page.waitForTimeout(500);
    await page.locator('button', { hasText: 'Continue' }).click();
  });

  await test.step('Checkout - Place Order', async () => {
    await page.locator('#checkoutButton').click();
    await expect(page.locator('h1')).toContainText('Thank you for your purchase!', { ignoreCase: true });
  });

  await test.step('Verify Order History', async () => {
    await page.locator('#navbarAccount').click();
    await page.getByRole('menuitem', { name: 'Show Orders and Payment Menu' }).click();
    await page.getByLabel('Go to order history page').click();
    await expect(page.getByText('Order ID').first()).toBeVisible();
  });

  await test.step('Profile Management Check', async () => {
    await page.locator('#navbarAccount').click();
    await page.getByRole('menuitem', { name: 'Show Privacy and Security Menu' }).click();
    await page.getByRole('menuitem', { name: 'Go to user profile' }).click();
    await page.locator('#username').fill('QA_Demo_Master');
    await page.locator('#submit').click();
  });

});
