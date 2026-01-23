import {
  expect,
  MobileConstants,
  validCredentials,
  MobileDataGenerator,
  productsScreen,
  loginScreen,
  LoginErrorType,
  LoginErrorTypes,
} from '../../main/mobile/fixtures/baseTest.js';

describe('Login negative cases functionality', () => {
  const { invalidUsername, invalidPassword, randomUsername, randomPassword } =
    MobileDataGenerator.generateInvalidCredentials();

  interface TestCase {
    description: string;
    username: string;
    password: string;
    expectedError: string;
    errorType: LoginErrorType;
  }

  const testCases: TestCase[] = [
    {
      description: 'Verify that error is shown when username is empty',
      username: '',
      password: validCredentials.password,
      expectedError: MobileConstants.ERROR_MESSAGES.USERNAME_REQUIRED,
      errorType: LoginErrorTypes.USERNAME,
    },
    {
      description: 'Verify that error is shown when password is empty',
      username: validCredentials.username,
      password: '',
      expectedError: MobileConstants.ERROR_MESSAGES.PASSWORD_REQUIRED,
      errorType: LoginErrorTypes.PASSWORD,
    },
    {
      description: 'Verify that error is shown when both are empty',
      username: '',
      password: '',
      expectedError: MobileConstants.ERROR_MESSAGES.USERNAME_REQUIRED,
      errorType: LoginErrorTypes.USERNAME,
    },
    {
      description: 'Verify that error is shown when username is invalid',
      username: invalidUsername,
      password: validCredentials.password,
      expectedError: MobileConstants.ERROR_MESSAGES.INVALID_CREDENTIALS,
      errorType: LoginErrorTypes.CREDENTIALS,
    },
    {
      description: 'Verify that error is shown when password is invalid',
      username: validCredentials.username,
      password: invalidPassword,
      expectedError: MobileConstants.ERROR_MESSAGES.INVALID_CREDENTIALS,
      errorType: LoginErrorTypes.CREDENTIALS,
    },
    {
      description: 'Verify that error is shown when both credentials are invalid',
      username: randomUsername,
      password: randomPassword,
      expectedError: MobileConstants.ERROR_MESSAGES.INVALID_CREDENTIALS,
      errorType: LoginErrorTypes.CREDENTIALS,
    },
  ];

  before(async () => {
    const menuScreen = await productsScreen.openMenu();
    await menuScreen.navigateToLogin();
  });

  testCases.forEach(({ description, username, password, expectedError, errorType }) => {
    it(description, async () => {
      await loginScreen.enterUsername(username);
      await loginScreen.enterPassword(password);
      await loginScreen.tapLoginButtonExpectingError();

      const actualError = await loginScreen.getErrorText(errorType);
      expect(actualError).toBe(expectedError);
    });
  });
});
