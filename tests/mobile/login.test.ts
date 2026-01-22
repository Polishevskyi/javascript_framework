import { expect, productsScreen, validCredentials, MobileConstants } from '../../src/mobile/fixtures/baseTest.js';

describe('Mobile - Login Tests', () => {
  it('Verify that user can login with valid credentials', async () => {
    const menuScreen = await productsScreen.openMenu();
    const loginScreen = await menuScreen.navigateToLogin();
    await loginScreen.login(validCredentials.username, validCredentials.password);

    const headerText = await productsScreen.getProductsHeaderText();
    expect(headerText).toBe(MobileConstants.PAGE_TITLES.PRODUCTS);
  });
});
