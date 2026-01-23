import type { Options } from '@wdio/types';
import { config as loadEnv } from 'dotenv';
import { CapabilitiesFactory } from './main/mobile/driver/capabilitiesFactory.js';

loadEnv();

const isCloud = process.env.MOBILE_IS_CLOUD === 'true';
const serverUrl = new URL(isCloud ? process.env.BROWSERSTACK_HUB_URL! : process.env.APPIUM_LOCAL_URL!);
let serverPort: number;
if (serverUrl.port !== '') {
  serverPort = Number(serverUrl.port);
} else if (serverUrl.protocol === 'https:') {
  serverPort = 443;
} else {
  serverPort = 80;
}

export const config: Options.Testrunner = {
  user: isCloud ? process.env.BROWSERSTACK_USERNAME : undefined,
  key: isCloud ? process.env.BROWSERSTACK_ACCESS_KEY : undefined,
  hostname: serverUrl.hostname,
  port: serverPort,
  protocol: serverUrl.protocol.replace(':', '') as 'http' | 'https',
  path: serverUrl.pathname,
  services: isCloud ? ['browserstack'] : [],
  specs: ['./tests/mobile/**/*.ts'],
  reporters: [
    [
      'spec',
      {
        showPreface: false,
        realtimeReporting: true,
      },
    ],
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  maxInstances: isCloud ? 4 : 1,
  capabilities: CapabilitiesFactory.createCapabilities(),
  framework: 'mocha',
  mochaOpts: {
    timeout: 120_000,
    retries: 3,
  },
  autoCompileOpts: {
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
};
