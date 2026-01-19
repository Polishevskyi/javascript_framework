import { test, expect } from '../../src/web/fixtures/baseTest.js';

test.describe('Shopping cart functionality', () => {
  test('Verify that user can add multiple products to cart and remove one', async ({
    loggedInProductsPage,
    cartPage,
    constants,
  }) => {
    const { COUNTS, PAGE_TITLES, PRODUCT_NAMES, PRODUCT_IDS } = constants;
    await expect.soft(loggedInProductsPage.pageTitle).toHaveText(PAGE_TITLES.PRODUCTS);

    await loggedInProductsPage.addProductAndVerifyCart(PRODUCT_IDS.BACKPACK, COUNTS.ONE);
    await loggedInProductsPage.addProductAndVerifyCart(PRODUCT_IDS.BIKE_LIGHT, COUNTS.TWO);
    await loggedInProductsPage.addProductAndVerifyCart(PRODUCT_IDS.BOLT_TSHIRT, COUNTS.THREE);

    await loggedInProductsPage.clickShoppingCart();
    await expect.soft(cartPage.pageTitle).toHaveText(PAGE_TITLES.YOUR_CART);

    await expect.soft(cartPage.getItemsCount()).resolves.toBe(COUNTS.THREE);

    const items = await cartPage.getItemsNames();
    expect.soft(items).toContain(PRODUCT_NAMES.BACKPACK);
    expect.soft(items).toContain(PRODUCT_NAMES.BIKE_LIGHT);
    expect.soft(items).toContain(PRODUCT_NAMES.BOLT_TSHIRT);

    await cartPage.removeProduct(PRODUCT_IDS.BIKE_LIGHT);
    await expect.soft(cartPage.getItemsCount()).resolves.toBe(COUNTS.TWO);

    await cartPage.clickContinueShopping();
    await expect.soft(loggedInProductsPage.pageTitle).toHaveText(PAGE_TITLES.PRODUCTS);
    await expect.soft(loggedInProductsPage.shoppingCartBadge).toHaveText(`${COUNTS.TWO}`);
  });
});
