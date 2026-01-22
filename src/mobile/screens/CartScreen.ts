import { driver } from '@wdio/globals';
import { BaseScreen } from './BaseScreen.js';

export class CartScreen extends BaseScreen {
  private readonly productLabel = '~product label';

  private readonly removeItemButton = '~remove item';

  private goShoppingButton!: string;

  constructor() {
    super();
    if (driver.isAndroid) {
      this.goShoppingButton = '//android.widget.TextView[@text=\'Go Shopping\']';
    } else {
      this.goShoppingButton = '//XCUIElementTypeOther[@name=\'Go Shopping button\']';
    }
  }

  async tapRemoveItemButton(): Promise<void> {
    await this.tapWhenVisible(this.removeItemButton);
  }

  async getProductNameInCart(): Promise<string> {
    return this.getElementText(this.productLabel);
  }

  async getGoShoppingButtonText(): Promise<string> {
    return this.getElementText(this.goShoppingButton);
  }
}
