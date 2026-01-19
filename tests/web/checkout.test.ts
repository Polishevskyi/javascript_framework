import { test } from '@playwright/test';
import BasePage from '../../src/web/pages/BasePage.js';
import { LoginPage } from '../../src/web/pages/LoginPage.js';
import { ProductsPage, PRODUCTS_PAGE_LOCATORS } from '../../src/web/pages/ProductsPage.js';
import { CartPage, CART_PAGE_LOCATORS } from '../../src/web/pages/CartPage.js';
import { CheckoutPage, CHECKOUT_PAGE_LOCATORS } from '../../src/web/pages/CheckoutPage.js';
import DataGenerator from '../../src/utils/dataGenerator.js';
import Constants from '../../src/utils/constants.js';

const { CART_COUNTS, PAGE_TITLES, MESSAGES, URLS } = Constants;

test.describe('Checkout flow', () => {
  test('Complete checkout process with generated user data', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const userInfo = DataGenerator.generateUserInfo();
    const productsScreen = { locators: PRODUCTS_PAGE_LOCATORS };
    const cartScreen = { locators: CART_PAGE_LOCATORS };
    const checkoutScreen = { locators: CHECKOUT_PAGE_LOCATORS };
    await basePage.goto(URLS.ROOT);
    await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);
    await productsPage.assertElementTextEquals(productsScreen.locators.pageTitle, PAGE_TITLES.PRODUCTS);

    await productsPage.addProductAndVerifyCart(productsScreen.locators.PRODUCTS.BACKPACK, CART_COUNTS.ONE_ITEM);
    await productsPage.addProductAndVerifyCart(productsScreen.locators.PRODUCTS.FLEECE_JACKET, CART_COUNTS.TWO_ITEMS);

    await productsPage.tapWhenVisible(productsScreen.locators.shoppingCartLink);
    await cartPage.assertElementTextEquals(cartScreen.locators.pageTitle, PAGE_TITLES.YOUR_CART);
    await cartPage.tapWhenVisible(cartScreen.locators.checkoutButton);

    await checkoutPage.assertElementIsVisible(checkoutScreen.locators.firstNameInput);
    await checkoutPage.assertElementTextEquals(checkoutScreen.locators.pageTitle, PAGE_TITLES.CHECKOUT_INFORMATION);

    await checkoutPage.fillCheckoutInfo(userInfo.firstName, userInfo.lastName, userInfo.postalCode);
    await checkoutPage.tapWhenVisible(checkoutScreen.locators.continueButton);

    await checkoutPage.assertElementIsVisible(checkoutScreen.locators.finishButton);
    await checkoutPage.assertElementTextEquals(checkoutScreen.locators.pageTitle, PAGE_TITLES.CHECKOUT_OVERVIEW);
    await checkoutPage.tapWhenVisible(checkoutScreen.locators.finishButton);

    await checkoutPage.assertElementTextEquals(checkoutScreen.locators.completeHeader, PAGE_TITLES.ORDER_COMPLETE);
    await checkoutPage.assertContainsText(checkoutScreen.locators.completeText, MESSAGES.ORDER_DISPATCHED);
    await checkoutPage.waitForUrl(URLS.CHECKOUT_COMPLETE);

    await checkoutPage.tapWhenVisible(checkoutScreen.locators.backHomeButton);
    await productsPage.assertElementTextEquals(productsScreen.locators.pageTitle, PAGE_TITLES.PRODUCTS);
    await productsPage.assertElementIsNotVisible(productsScreen.locators.shoppingCartBadge);
  });
});
