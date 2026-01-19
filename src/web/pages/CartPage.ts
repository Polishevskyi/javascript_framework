import BasePage, { BASE_LOCATORS } from './BasePage.js';

const CART_PAGE_LOCATORS = {
  ...BASE_LOCATORS,
  cartItem: '.cart_item',
  cartItemName: '.inventory_item_name',
  continueShoppingButton: '#continue-shopping',
  checkoutButton: '#checkout',
  cartQuantity: '.cart_quantity',
  removeButton: (productName: string): string => `[data-test="remove-${productName}"]`,
  removeButtonFirst: '[data-test^="remove"]',
};

class CartPage extends BasePage {}

export { CartPage, CART_PAGE_LOCATORS };
