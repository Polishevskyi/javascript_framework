import { type Locator } from '@playwright/test';
import BasePage from './BasePage.js';

class CheckoutPage extends BasePage {
  readonly completeHeader: Locator;

  readonly completeText: Locator;

  private readonly firstNameInput: Locator;

  private readonly lastNameInput: Locator;

  private readonly postalCodeInput: Locator;

  private readonly continueButton: Locator;

  private readonly finishButton: Locator;

  private readonly backHomeButton: Locator;

  constructor(page: BasePage['page']) {
    super(page);
    this.firstNameInput = this.page.locator('#first-name');
    this.lastNameInput = this.page.locator('#last-name');
    this.postalCodeInput = this.page.locator('#postal-code');
    this.continueButton = this.page.locator('#continue');
    this.finishButton = this.page.locator('#finish');
    this.completeHeader = this.page.locator('.complete-header');
    this.completeText = this.page.locator('.complete-text');
    this.backHomeButton = this.page.locator('#back-to-products');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async waitForFinishButton(): Promise<void> {
    await this.finishButton.waitFor({ state: 'visible' });
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  async waitForCheckoutForm(): Promise<void> {
    await this.firstNameInput.waitFor({ state: 'visible' });
  }
}

export { CheckoutPage };
