import { expect, productsScreen, cartScreen, MobileConstants } from '../../src/mobile/fixtures/baseTest.js';

describe('Cart functionality', () => {
  it('Verify that user can add and remove product from cart', async () => {
    const productName = await productsScreen.getFirstProductName();
    await productsScreen.tapOnFirstProduct();
    await productsScreen.tapAddToCartButton();
    await productsScreen.openCart();
    const productNameInCart = await cartScreen.getProductNameInCart();
    expect(productNameInCart).toBe(productName);

    await cartScreen.tapRemoveItemButton();
    const goShoppingText = await cartScreen.getGoShoppingButtonText();
    expect(goShoppingText).toBe(MobileConstants.BUTTON_LABELS.GO_SHOPPING);
  });
});
