import BasePage, { BASE_LOCATORS } from './BasePage.js';

const CHECKOUT_PAGE_LOCATORS = {
  ...BASE_LOCATORS,
  firstNameInput: '#first-name',
  lastNameInput: '#last-name',
  postalCodeInput: '#postal-code',
  continueButton: '#continue',
  cancelButton: '#cancel',
  subtotalLabel: '.summary_subtotal_label',
  taxLabel: '.summary_tax_label',
  totalLabel: '.summary_total_label',
  finishButton: '#finish',
  completeHeader: '.complete-header',
  completeText: '.complete-text',
  backHomeButton: '#back-to-products',
};

class CheckoutPage extends BasePage {
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.setValue(CHECKOUT_PAGE_LOCATORS.firstNameInput, firstName);
    await this.setValue(CHECKOUT_PAGE_LOCATORS.lastNameInput, lastName);
    await this.setValue(CHECKOUT_PAGE_LOCATORS.postalCodeInput, postalCode);
  }
}

export { CheckoutPage, CHECKOUT_PAGE_LOCATORS };
