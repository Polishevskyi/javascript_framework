import BasePage, { BASE_LOCATORS } from './BasePage.js';

const LOGIN_PAGE_LOCATORS = {
  usernameInput: '#user-name',
  passwordInput: '#password',
  loginButton: '#login-button',
  ...BASE_LOCATORS,
  errorButton: '.error-button',
};

class LoginPage extends BasePage {
  async fillLoginCredentials(username: string, password: string): Promise<void> {
    await this.setValue(LOGIN_PAGE_LOCATORS.usernameInput, username);
    await this.setValue(LOGIN_PAGE_LOCATORS.passwordInput, password);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillLoginCredentials(username, password);
    await this.tapWhenVisible(LOGIN_PAGE_LOCATORS.loginButton);
  }

  async assertLoginPageDisplayed(): Promise<void> {
    await this.assertElementIsVisible(LOGIN_PAGE_LOCATORS.usernameInput);
    await this.assertElementIsVisible(LOGIN_PAGE_LOCATORS.passwordInput);
    await this.assertElementIsVisible(LOGIN_PAGE_LOCATORS.loginButton);
  }
}

export { LoginPage, LOGIN_PAGE_LOCATORS };
