// API constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
} as const;

// Web constants
const WebConstants = {
  COUNTS: {
    ONE: 1,
    TWO: 2,
    THREE: 3,
  },

  PAGE_TITLES: {
    PRODUCTS: 'Products',
    YOUR_CART: 'Your Cart',
    CHECKOUT_INFO: 'Checkout: Your Information',
    CHECKOUT_OVERVIEW: 'Checkout: Overview',
    ORDER_COMPLETE: 'Thank you for your order!',
  },

  MESSAGES: {
    ORDER_DISPATCHED: 'Your order has been dispatched',
  },

  PRODUCT_NAMES: {
    BACKPACK: 'Sauce Labs Backpack',
    BIKE_LIGHT: 'Sauce Labs Bike Light',
    BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
  },

  PRODUCT_IDS: {
    BACKPACK: 'sauce-labs-backpack',
    BIKE_LIGHT: 'sauce-labs-bike-light',
    BOLT_TSHIRT: 'sauce-labs-bolt-t-shirt',
    FLEECE_JACKET: 'sauce-labs-fleece-jacket',
  },
} as const;

// Mobile constants
const MobileConstants = {
  TIMEOUTS: {
    DEFAULT_TIMEOUT: 10000,
  },

  PAGE_TITLES: {
    PRODUCTS: 'Products',
  },

  CART_DATA: {
    ITEM_PRICE: '$29.99',
    SINGLE_ITEM_COUNT: '1',
  },

  BUTTON_LABELS: {
    GO_SHOPPING: 'Go Shopping',
  },

  SORT_TYPES: {
    NAME_ASCENDING: 'nameAsc',
    NAME_DESCENDING: 'nameDesc',
    PRICE_ASCENDING: 'priceAsc',
    PRICE_DESCENDING: 'priceDesc',
  },

  SORT_RESULTS: {
    PRODUCT_NAME_ASCENDING: 'Sauce Labs Backpack',
    PRODUCT_NAME_DESCENDING: 'Test.allTheThings() T-Shirt',
    PRODUCT_PRICE_ASCENDING: 'Sauce Labs Onesie',
    PRODUCT_PRICE_DESCENDING: 'Sauce Labs Fleece Jacket',
  },

  ERROR_MESSAGES: {
    USERNAME_REQUIRED: 'Username is required',
    PASSWORD_REQUIRED: 'Password is required',
    INVALID_CREDENTIALS: 'Provided credentials do not match any user in this service.',
  },
} as const;

export { WebConstants, MobileConstants };
