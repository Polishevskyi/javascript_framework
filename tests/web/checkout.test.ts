import { test, expect } from '../../main/web/fixtures/baseTest.js';

test.describe('Checkout functionality', () => {
  test('Verify that complete checkout process works with generated user data', async ({
    loggedInProductsPage,
    cartPage,
    checkoutPage,
    dataGenerator,
    constants,
  }) => {
    const { COUNTS, PAGE_TITLES, MESSAGES, PRODUCT_IDS } = constants;
    const userInfo = dataGenerator.generateUserInfo();

    await expect.soft(loggedInProductsPage.pageTitle).toHaveText(PAGE_TITLES.PRODUCTS);

    await loggedInProductsPage.addProductAndVerifyCart(PRODUCT_IDS.BACKPACK, COUNTS.ONE);
    await loggedInProductsPage.addProductAndVerifyCart(PRODUCT_IDS.FLEECE_JACKET, COUNTS.TWO);

    await loggedInProductsPage.clickShoppingCart();
    await expect.soft(cartPage.pageTitle).toHaveText(PAGE_TITLES.YOUR_CART);
    await cartPage.clickCheckout();

    await checkoutPage.waitForCheckoutForm();
    await expect.soft(checkoutPage.pageTitle).toHaveText(PAGE_TITLES.CHECKOUT_INFO);
    await checkoutPage.fillCheckoutInfo(userInfo.firstName, userInfo.lastName, userInfo.postalCode);
    await checkoutPage.clickContinue();

    await checkoutPage.waitForFinishButton();
    await expect.soft(checkoutPage.pageTitle).toHaveText(PAGE_TITLES.CHECKOUT_OVERVIEW);
    await checkoutPage.clickFinish();

    await expect.soft(checkoutPage.completeHeader).toHaveText(PAGE_TITLES.ORDER_COMPLETE);
    await expect.soft(checkoutPage.completeText).toContainText(MESSAGES.ORDER_DISPATCHED);

    await checkoutPage.clickBackHome();
    await expect.soft(loggedInProductsPage.pageTitle).toHaveText(PAGE_TITLES.PRODUCTS);
    await loggedInProductsPage.waitForShoppingCartBadgeHidden();
  });
});
