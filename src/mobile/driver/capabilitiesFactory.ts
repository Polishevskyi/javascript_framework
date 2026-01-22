type Capability = Record<string, any>;

export class CapabilitiesFactory {
  private static getBrowserStackOptions() {
    const buildName = `${process.env.MOBILE_PLATFORM!} - ${new Date().toLocaleString()}`;

    return {
      userName: process.env.BROWSERSTACK_USERNAME!,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY!,
      appiumVersion: process.env.BROWSERSTACK_APPIUM_VERSION!,
      buildName,
      projectName: 'Mobile Automation',
    };
  }

  private static createAndroidLocalCapabilities(): Capability {
    return {
      platformName: 'Android',
      'appium:deviceName': process.env.ANDROID_LOCAL_DEVICE_NAME!,
      'appium:platformVersion': process.env.ANDROID_LOCAL_PLATFORM_VERSION!,
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': process.env.ANDROID_LOCAL_APP_PACKAGE!,
      'appium:appActivity': process.env.ANDROID_LOCAL_APP_ACTIVITY!,
    };
  }

  private static createAndroidCloudCapabilities(): Capability {
    return {
      platformName: 'Android',
      'appium:deviceName': process.env.ANDROID_CLOUD_DEVICE_NAME!,
      'appium:platformVersion': process.env.ANDROID_CLOUD_PLATFORM_VERSION!,
      'appium:automationName': 'UiAutomator2',
      'appium:app': process.env.BROWSERSTACK_ANDROID_APP!,
      'appium:appPackage': process.env.ANDROID_CLOUD_APP_PACKAGE!,
      'appium:appActivity': process.env.ANDROID_CLOUD_APP_ACTIVITY!,
      'bstack:options': this.getBrowserStackOptions(),
    };
  }

  private static createIosLocalCapabilities(): Capability {
    return {
      platformName: 'iOS',
      'appium:deviceName': process.env.IOS_LOCAL_DEVICE_NAME!,
      'appium:platformVersion': process.env.IOS_LOCAL_PLATFORM_VERSION!,
      'appium:automationName': 'XCUITest',
      'appium:bundleId': process.env.IOS_LOCAL_BUNDLE_ID!,
      'appium:udid': process.env.IOS_LOCAL_UDID!,
    };
  }

  private static createIosCloudCapabilities(): Capability {
    return {
      platformName: 'iOS',
      'appium:deviceName': process.env.IOS_CLOUD_DEVICE_NAME!,
      'appium:platformVersion': process.env.IOS_CLOUD_PLATFORM_VERSION!,
      'appium:automationName': 'XCUITest',
      'appium:app': process.env.BROWSERSTACK_IOS_APP!,
      'appium:bundleId': process.env.IOS_CLOUD_BUNDLE_ID!,
      'bstack:options': this.getBrowserStackOptions(),
    };
  }

  static createCapabilities(): Capability[] {
    const platform = process.env.MOBILE_PLATFORM!;
    const isCloud = process.env.MOBILE_IS_CLOUD === 'true';

    if (platform === 'android') {
      return [isCloud ? this.createAndroidCloudCapabilities() : this.createAndroidLocalCapabilities()];
    }
    return [isCloud ? this.createIosCloudCapabilities() : this.createIosLocalCapabilities()];
  }
}
