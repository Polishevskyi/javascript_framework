import { expect, type Locator } from '@playwright/test';
import BasePage from './BasePage.js';

class ProductsPage extends BasePage {
  readonly shoppingCartBadge: Locator;

  private readonly shoppingCartLink: Locator;

  private readonly burgerMenu: Locator;

  private readonly logoutLink: Locator;

  constructor(page: BasePage['page']) {
    super(page);
    this.shoppingCartLink = this.page.locator('.shopping_cart_link');
    this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
    this.burgerMenu = this.page.locator('#react-burger-menu-btn');
    this.logoutLink = this.page.locator('#logout_sidebar_link');
  }

  async logout(): Promise<void> {
    await this.burgerMenu.click();
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
  }

  async addProductAndVerifyCart(productName: string, expectedCount: number): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
    await expect.soft(this.shoppingCartBadge).toHaveText(expectedCount.toString());
  }

  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async waitForShoppingCartBadgeHidden(): Promise<void> {
    await this.shoppingCartBadge.waitFor({ state: 'hidden' });
  }
}

export { ProductsPage };
