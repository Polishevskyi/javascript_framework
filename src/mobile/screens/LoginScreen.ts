import { driver } from '@wdio/globals';
import { BaseScreen } from './BaseScreen.js';

export const LoginErrorTypes = {
  USERNAME: 'username',
  PASSWORD: 'password',
  CREDENTIALS: 'credentials',
} as const;

export type LoginErrorType = (typeof LoginErrorTypes)[keyof typeof LoginErrorTypes];

export class LoginScreen extends BaseScreen {
  private readonly usernameField = '~Username input field';

  private readonly passwordField = '~Password input field';

  private readonly loginButton = '~Login button';

  private userNameErrorText!: string;

  private passwordErrorText!: string;

  private credentialsErrorText!: string;

  private loginText!: string;

  constructor() {
    super();
    if (driver.isAndroid) {
      this.userNameErrorText =
        '//android.view.ViewGroup[@content-desc=\'Username-error-message\']/android.widget.TextView';
      this.passwordErrorText =
        '//android.view.ViewGroup[@content-desc=\'Password-error-message\']/android.widget.TextView';
      this.credentialsErrorText =
        '//android.view.ViewGroup[@content-desc=\'generic-error-message\']/android.widget.TextView';
      this.loginText = '(//android.widget.TextView[@text="Login"])[1]';
    } else {
      this.userNameErrorText = '//XCUIElementTypeOther[@name=\'Username-error-message\']/XCUIElementTypeStaticText';
      this.passwordErrorText = '//XCUIElementTypeOther[@name=\'Password-error-message\']/XCUIElementTypeStaticText';
      this.credentialsErrorText = '//XCUIElementTypeOther[@name=\'generic-error-message\']/XCUIElementTypeStaticText';
      this.loginText = '//XCUIElementTypeStaticText[@name=\'Login\']';
    }
  }

  async enterUsername(username: string): Promise<void> {
    await this.setValue(this.usernameField, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.setValue(this.passwordField, password);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.tapWhenVisible(this.loginText);
    await this.tapWhenVisible(this.loginButton);
  }

  async tapLoginButtonExpectingError(): Promise<void> {
    await this.tapWhenVisible(this.loginText);
    await this.tapWhenVisible(this.loginButton);
  }

  async getUserNameErrorText(): Promise<string> {
    return this.getElementText(this.userNameErrorText);
  }

  async getPasswordErrorText(): Promise<string> {
    return this.getElementText(this.passwordErrorText);
  }

  async getCredentialsErrorText(): Promise<string> {
    return this.getElementText(this.credentialsErrorText);
  }

  async getErrorText(errorType: LoginErrorType): Promise<string> {
    switch (errorType) {
      case LoginErrorTypes.USERNAME:
        return this.getUserNameErrorText();
      case LoginErrorTypes.PASSWORD:
        return this.getPasswordErrorText();
      case LoginErrorTypes.CREDENTIALS:
        return this.getCredentialsErrorText();
      default:
        throw new Error(`Unknown error type: ${errorType}`);
    }
  }
}
