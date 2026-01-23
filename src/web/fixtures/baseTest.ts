import * as base from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import DataGenerator from '../../utils/dataGenerator.js';
import { WebConstants } from '../../utils/constants.js';
import { wrapInAllureStep } from '../../utils/allure-proxy.js';

export const test = base.test.extend<{
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  loggedInHomePage: base.Page;
  loggedInProductsPage: ProductsPage;
  constants: typeof WebConstants;
  dataGenerator: typeof DataGenerator;
}>({
  cartPage: async ({ page }, use) => {
    await use(wrapInAllureStep(new CartPage(page)));
  },

  checkoutPage: async ({ page }, use) => {
    await use(wrapInAllureStep(new CheckoutPage(page)));
  },

  loginPage: async ({ page }, use) => {
    await use(wrapInAllureStep(new LoginPage(page)));
  },

  productsPage: async ({ page }, use) => {
    await use(wrapInAllureStep(new ProductsPage(page)));
  },

  loggedInHomePage: async ({ page, loginPage }, use) => {
    await loginPage.waitForLoginPage();
    await loginPage.login(process.env.WEB_CREDENTIALS_USERNAME!, process.env.WEB_CREDENTIALS_PASSWORD!);
    await use(page);
  },

  loggedInProductsPage: async ({ loggedInHomePage }, use) => {
    await use(wrapInAllureStep(new ProductsPage(loggedInHomePage)));
  },

  constants: async ({}, use) => {
    await use(WebConstants);
  },

  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },
});

export const { expect } = base;
