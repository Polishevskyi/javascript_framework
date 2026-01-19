import BasePage, { BASE_LOCATORS } from './BasePage.js';
import Constants from '../../utils/constants.js';

const PRODUCTS_PAGE_LOCATORS = {
  ...BASE_LOCATORS,
  shoppingCartLink: '.shopping_cart_link',
  shoppingCartBadge: '.shopping_cart_badge',
  burgerMenu: '#react-burger-menu-btn',
  logoutLink: '#logout_sidebar_link',
  inventoryItem: '.inventory_item',
  inventoryItemName: '.inventory_item_name',
  firstInventoryItem: '.inventory_item:first-child',
  addToCartButton: (productName: string): string => `[data-test="add-to-cart-${productName}"]`,
  addToCartButtonFirst: '[data-test^="add-to-cart"]',
  sortDropdown: '[data-test="product_sort_container"]',
  PRODUCTS: {
    BACKPACK: 'sauce-labs-backpack',
    BIKE_LIGHT: 'sauce-labs-bike-light',
    BOLT_TSHIRT: 'sauce-labs-bolt-t-shirt',
    FLEECE_JACKET: 'sauce-labs-fleece-jacket',
  },
};

class ProductsPage extends BasePage {
  async openMenu(): Promise<void> {
    await this.tapWhenVisible(PRODUCTS_PAGE_LOCATORS.burgerMenu);
    await this.assertElementIsVisible(PRODUCTS_PAGE_LOCATORS.logoutLink, Constants.TIMEOUTS.MENU_OPEN);
    await this.page.waitForTimeout(Constants.TIMEOUTS.MENU_ANIMATION);
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.tapWhenVisible(PRODUCTS_PAGE_LOCATORS.logoutLink);
  }

  async addProductAndVerifyCart(productName: string, expectedCount: string): Promise<void> {
    await this.tapWhenVisible(PRODUCTS_PAGE_LOCATORS.addToCartButton(productName));
    await this.assertElementTextEquals(PRODUCTS_PAGE_LOCATORS.shoppingCartBadge, expectedCount);
  }
}

export { ProductsPage, PRODUCTS_PAGE_LOCATORS };
