import { test, expect } from '../../src/web/fixtures/baseTest.js';

test.describe('Login and logout functionality', () => {
  test('Verify that user can successfully login and logout', async ({ loginPage, productsPage, constants }) => {
    await loginPage.waitForLoginPage();
    await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);

    await expect.soft(productsPage.pageTitle).toHaveText(constants.PAGE_TITLES.PRODUCTS);
    await productsPage.logout();
    await loginPage.waitForLoginPage();
  });
});
