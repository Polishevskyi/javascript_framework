import * as base from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import DataGenerator from '../../utils/dataGenerator.js';
import Constants from '../../utils/constants.js';

export const test = base.test.extend<{
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  loggedInHomePage: base.Page;
  loggedInProductsPage: ProductsPage;
  constants: typeof Constants;
  dataGenerator: typeof DataGenerator;
}>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  loggedInHomePage: async ({ page, loginPage }, use) => {
    await loginPage.waitForLoginPage();
    await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);
    await use(page);
  },

  loggedInProductsPage: async ({ loggedInHomePage }, use) => {
    await use(new ProductsPage(loggedInHomePage));
  },

  constants: async ({}, use) => {
    await use(Constants);
  },

  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },
});

export const { expect } = base;
