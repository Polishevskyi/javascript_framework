# Mobile Tests Fix Guide

## 🔴 Current Issue

Mobile tests are failing with the error:

```
[BROWSERSTACK_INVALID_OS_VERSION] OS version 13.0 is not supported for device google pixel 6 pro.
Supported OS versions for device google pixel 6 pro are: 12.0, 15.0.
```

## ✅ Solution

BrowserStack only supports **Android 12.0** or **Android 15.0** for Google Pixel 6 Pro device.

### Steps to Fix:

1. **Update GitHub Secret:**
   - Go to: https://github.com/Polishevskyi/typescript_framework/settings/secrets/actions
   - Find `ANDROID_CLOUD_PLATFORM_VERSION`
   - Change value from `13.0` to `15.0` (recommended) or `12.0`
   - Click **Update secret**

2. **Verify BrowserStack Device Capabilities:**
   - Visit: https://www.browserstack.com/app-automate/capabilities
   - Select your device to see all supported OS versions

3. **Alternative: Change Device**

   If you want to keep Android 13.0, use a different device that supports it:
   - Update `ANDROID_CLOUD_DEVICE_NAME` secret to a device that supports Android 13.0
   - Check supported devices at: https://www.browserstack.com/list-of-browsers-and-platforms/app_automate

## 📋 Updated Configuration

After fixing, your GitHub Secrets should have:

```
ANDROID_CLOUD_DEVICE_NAME=Google Pixel 6 Pro
ANDROID_CLOUD_PLATFORM_VERSION=15.0  ← Changed from 13.0
```

## 🧪 Test the Fix

After updating the secret:

1. Go to: https://github.com/Polishevskyi/typescript_framework/actions/workflows/mobile-tests.yml
2. Click **Run workflow**
3. Select platform: **android**
4. Click **Run workflow** button

The tests should now connect to BrowserStack successfully! ✅
