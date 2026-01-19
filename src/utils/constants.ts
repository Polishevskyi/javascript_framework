// Web constants
class Constants {
  static CART_COUNTS = {
    ONE_ITEM: '1',
    TWO_ITEMS: '2',
    THREE_ITEMS: '3',
  };

  static ITEM_COUNTS = {
    TWO: 2,
    THREE: 3,
  };

  static PAGE_TITLES = {
    PRODUCTS: 'Products',
    YOUR_CART: 'Your Cart',
    CHECKOUT_INFORMATION: 'Checkout: Your Information',
    CHECKOUT_OVERVIEW: 'Checkout: Overview',
    ORDER_COMPLETE: 'Thank you for your order!',
  };

  static MESSAGES = {
    ORDER_DISPATCHED: 'Your order has been dispatched',
  };

  static TIMEOUTS = {
    DEFAULT_TIMEOUT: 10000,
    MENU_OPEN: 15000,
    MENU_ANIMATION: 500,
  };

  static ERROR_MESSAGES = {
    textAssertionFailed: (selector: string, expected: string, actual: string): string => {
      const message = `Text assertion failed for element "${selector}". Expected: "${expected}", Actual: "${actual}"`;
      return message;
    },
  };

  static PRODUCT_NAMES = {
    BACKPACK: 'Sauce Labs Backpack',
    BIKE_LIGHT: 'Sauce Labs Bike Light',
    BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
  };

  static URLS = {
    ROOT: '/',
    INVENTORY: 'inventory.html',
    CHECKOUT_COMPLETE: 'checkout-complete.html',
  };
}

export default Constants;
