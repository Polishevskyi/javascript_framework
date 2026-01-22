import { driver } from '@wdio/globals';
import { BaseScreen } from './BaseScreen.js';
import { MenuScreen } from './MenuScreen.js';
import { CartScreen } from './CartScreen.js';

export class ProductsScreen extends BaseScreen {
  private readonly sortButton = '~sort button';

  private readonly sortNameAsc = '~nameAsc';

  private readonly sortNameDesc = '~nameDesc';

  private readonly sortPriceAsc = '~priceAsc';

  private readonly sortPriceDesc = '~priceDesc';

  private readonly addToCartButton = '~Add To Cart button';

  private openMenuButton!: string;

  private cartIcon!: string;

  private productsHeader!: string;

  private firstProductName!: string;

  private firstProduct!: string;

  constructor() {
    super();
    if (driver.isAndroid) {
      this.openMenuButton = '~open menu';
      this.cartIcon = '~cart badge';
      this.productsHeader = '//android.widget.TextView[@text=\'Products\']';
      this.firstProductName = '(//android.widget.TextView[@content-desc=\'store item text\'])[1]';
      this.firstProduct = '(//android.view.ViewGroup[@content-desc=\'store item\'])[1]';
    } else {
      this.openMenuButton = '~tab bar option menu';
      this.cartIcon = '~tab bar option cart';
      this.productsHeader = '//XCUIElementTypeStaticText[@name=\'Products\']';
      this.firstProductName = '(//XCUIElementTypeStaticText[@name=\'store item text\'])[1]';
      this.firstProduct = '~store item';
    }
  }

  async openMenu(): Promise<MenuScreen> {
    await this.tapWhenVisible(this.openMenuButton);
    return new MenuScreen();
  }

  async tapSortButton(): Promise<void> {
    await this.tapWhenVisible(this.sortButton);
  }

  async selectNameAscending(): Promise<void> {
    await this.tapWhenVisible(this.sortNameAsc);
  }

  async selectNameDescending(): Promise<void> {
    await this.tapWhenVisible(this.sortNameDesc);
  }

  async selectPriceAscending(): Promise<void> {
    await this.tapWhenVisible(this.sortPriceAsc);
  }

  async selectPriceDescending(): Promise<void> {
    await this.tapWhenVisible(this.sortPriceDesc);
  }

  async tapOnFirstProduct(): Promise<void> {
    await this.tapWhenVisible(this.firstProduct);
  }

  async tapAddToCartButton(): Promise<void> {
    await this.tapWhenVisible(this.addToCartButton);
  }

  async openCart(): Promise<CartScreen> {
    await this.tapWhenVisible(this.cartIcon);
    return new CartScreen();
  }

  async getProductsHeaderText(): Promise<string> {
    return this.getElementText(this.productsHeader);
  }

  async getFirstProductName(): Promise<string> {
    return this.getElementText(this.firstProductName);
  }
}
