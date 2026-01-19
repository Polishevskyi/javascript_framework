import { expect, type Page } from '@playwright/test';
import Constants from '../../utils/constants.js';

const BASE_LOCATORS = {
  pageTitle: '.title',
};

class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  goto(url: string): Promise<unknown> {
    return this.page.goto(url);
  }

  async assertElementIsVisible(
    selector: string,
    timeout: number = Constants.TIMEOUTS.DEFAULT_TIMEOUT
  ): Promise<ReturnType<Page['locator']>> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
    return this.page.locator(selector);
  }

  async assertElementIsNotVisible(
    selector: string,
    timeout: number = Constants.TIMEOUTS.DEFAULT_TIMEOUT
  ): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  async tapWhenVisible(selector: string, timeout: number = Constants.TIMEOUTS.DEFAULT_TIMEOUT): Promise<void> {
    const element = await this.assertElementIsVisible(selector, timeout);
    return element.click();
  }

  async setValue(selector: string, text: string, timeout: number = Constants.TIMEOUTS.DEFAULT_TIMEOUT): Promise<void> {
    const element = await this.assertElementIsVisible(selector, timeout);
    return element.fill(text);
  }

  async getElementText(selector: string, timeout: number = Constants.TIMEOUTS.DEFAULT_TIMEOUT): Promise<string | null> {
    const element = await this.assertElementIsVisible(selector, timeout);
    return element.textContent();
  }

  async assertElementTextEquals(
    selector: string,
    expectedText: string,
    timeout: number = Constants.TIMEOUTS.DEFAULT_TIMEOUT
  ): Promise<ReturnType<Page['locator']>> {
    const element = await this.assertElementIsVisible(selector, timeout);
    const actualText = await element.textContent();

    if (actualText !== expectedText) {
      throw new Error(Constants.ERROR_MESSAGES.textAssertionFailed(selector, expectedText, actualText || ''));
    }
    return element;
  }

  async assertContainsText(selector: string, text: string): Promise<void> {
    return expect(this.page.locator(selector)).toContainText(text);
  }

  async waitForUrl(urlPart: string): Promise<void> {
    return this.page.waitForURL(`**/${urlPart}**`);
  }

  async getElementCount(selector: string): Promise<number> {
    return this.page.locator(selector).count();
  }

  async getAllTexts(selector: string): Promise<string[]> {
    return this.page.locator(selector).allTextContents();
  }

  assertArrayContains<T>(array: T[], item: T): void {
    expect(array).toContain(item);
  }

  assertEqual<T>(actual: T, expected: T): void {
    expect(actual).toBe(expected);
  }
}

export default BasePage;
export { BASE_LOCATORS };
