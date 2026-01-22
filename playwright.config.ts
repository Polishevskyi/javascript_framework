import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';
import { config } from 'dotenv';

config();

const browsers = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
};

const viewports = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
};

const projects: PlaywrightTestConfig['projects'] = [
  ...Object.entries(browsers).flatMap(([browserName, device]) =>
    Object.entries(viewports).map(([envName, viewport]) => ({
      name: `${browserName}-${envName}`,
      testDir: './tests/web',
      use: {
        ...device,
        baseURL: process.env.WEB_BASE_URL!,
        viewport,
        screenshot: 'only-on-failure' as const,
      },
      metadata: { browser: browserName, env: envName, type: 'e2e' },
    }))
  ),
  {
    name: 'api',
    testDir: './tests/api',
    use: {
      baseURL: process.env.API_BASE_URL!,
    },
    metadata: { type: 'api' },
  },
];

export default defineConfig({
  fullyParallel: true,
  retries: 3,
  workers: 3,
  testMatch: /.*\.(test|spec)\.(ts|js|tsx|jsx)/,
  reporter: 'list',
  use: {
    headless: process.env.WEB_HEADLESS === 'true',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 10_000,
    actionTimeout: 10_000,
  },
  projects,
});
