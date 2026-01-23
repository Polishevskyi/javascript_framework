import { expect } from '@wdio/globals';
import { MobileConstants } from '../../utils/constants.js';
import { MobileDataGenerator } from '../../utils/dataGenerator.js';
import { LoginScreen, LoginErrorTypes, type LoginErrorType } from '../screens/LoginScreen.js';
import { MenuScreen } from '../screens/MenuScreen.js';
import { ProductsScreen } from '../screens/ProductsScreen.js';
import { CartScreen } from '../screens/CartScreen.js';
import { wrapInAllureStep } from '../../utils/allure-proxy.js';

const loginScreen = wrapInAllureStep(new LoginScreen());
const menuScreen = wrapInAllureStep(new MenuScreen());
const productsScreen = wrapInAllureStep(new ProductsScreen());
const cartScreen = wrapInAllureStep(new CartScreen());

const validCredentials = {
  username: process.env.MOBILE_CREDENTIALS_USERNAME as string,
  password: process.env.MOBILE_CREDENTIALS_PASSWORD as string,
};

export {
  expect,
  MobileConstants,
  validCredentials,
  MobileDataGenerator,
  loginScreen,
  menuScreen,
  productsScreen,
  cartScreen,
  LoginErrorType,
  LoginErrorTypes,
};
