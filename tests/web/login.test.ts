import { test } from '@playwright/test';
import BasePage from '../../src/web/pages/BasePage.js';
import { LoginPage } from '../../src/web/pages/LoginPage.js';
import { ProductsPage, PRODUCTS_PAGE_LOCATORS } from '../../src/web/pages/ProductsPage.js';
import Constants from '../../src/utils/constants.js';

const { PAGE_TITLES, URLS } = Constants;

test.describe('Login and logout functionality', () => {
  test('Successful login and logout', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productsScreen = { locators: PRODUCTS_PAGE_LOCATORS };

    await basePage.goto(URLS.ROOT);
    await loginPage.assertLoginPageDisplayed();
    await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);

    await productsPage.assertElementTextEquals(productsScreen.locators.pageTitle, PAGE_TITLES.PRODUCTS);
    await productsPage.waitForUrl(URLS.INVENTORY);
    await productsPage.logout();

    await loginPage.waitForUrl(URLS.ROOT);
    await loginPage.assertLoginPageDisplayed();
  });
});
