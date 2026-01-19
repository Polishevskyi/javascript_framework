import { type Locator, type Page } from '@playwright/test';

class BasePage {
  protected readonly page: Page;

  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
  }
}

export default BasePage;
