import { type Locator } from '@playwright/test';
import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  private readonly usernameInput: Locator;

  private readonly passwordInput: Locator;

  private readonly loginButton: Locator;

  constructor(page: BasePage['page']) {
    super(page);
    this.usernameInput = this.page.locator('#user-name');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async waitForLoginPage(): Promise<void> {
    await this.page.goto('/');
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
  }
}

export { LoginPage };
