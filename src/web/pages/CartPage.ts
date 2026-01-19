import { type Locator } from '@playwright/test';
import BasePage from './BasePage.js';

class CartPage extends BasePage {
  private readonly cartItem: Locator;

  private readonly cartItemName: Locator;

  private readonly continueShoppingButton: Locator;

  private readonly checkoutButton: Locator;

  constructor(page: BasePage['page']) {
    super(page);
    this.cartItem = this.page.locator('.cart_item');
    this.cartItemName = this.page.locator('.inventory_item_name');
    this.continueShoppingButton = this.page.locator('#continue-shopping');
    this.checkoutButton = this.page.locator('#checkout');
  }

  async removeProduct(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productName}"]`).click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async getItemsCount(): Promise<number> {
    return this.cartItem.count();
  }

  async getItemsNames(): Promise<string[]> {
    return this.cartItemName.allTextContents();
  }
}

export { CartPage };
