import { $ } from '@wdio/globals';
import { MobileConstants } from '../../utils/constants.js';

export class BaseScreen {
  protected async assertElementIsVisible(
    selector: string,
    timeout = MobileConstants.TIMEOUTS.DEFAULT_TIMEOUT
  ): Promise<WebdriverIO.Element> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  protected async setValue(selector: string, text: string): Promise<void> {
    const element = await this.assertElementIsVisible(selector);
    await element.clearValue();
    await element.setValue(text);
  }

  protected async tapWhenVisible(selector: string): Promise<void> {
    const element = await this.assertElementIsVisible(selector);
    await element.click();
  }

  protected async getElementText(selector: string): Promise<string> {
    const element = await this.assertElementIsVisible(selector);
    return element.getText();
  }
}
