import { BaseScreen } from './BaseScreen.js';
import { LoginScreen } from './LoginScreen.js';

export class MenuScreen extends BaseScreen {
  private readonly loginMenuButton = '~menu item log in';

  async navigateToLogin(): Promise<LoginScreen> {
    await this.tapWhenVisible(this.loginMenuButton);
    return new LoginScreen();
  }
}
