import { test } from '@playwright/test';
import AllureReporter from '@wdio/allure-reporter';

type StepExecutor = (stepName: string, fn: () => Promise<unknown>) => Promise<unknown>;

function formatMethodName(methodName: string): string {
  return methodName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function maskSensitiveData(arg: unknown): string {
  if (typeof arg === 'string') {
    return '********';
  }
  if (typeof arg === 'object' && arg !== null) {
    const masked = { ...arg };
    Object.keys(masked).forEach((key) => {
      if (key.toLowerCase().includes('pass')) {
        masked[key as keyof typeof masked] = '********' as never;
      }
    });
    return JSON.stringify(masked);
  }
  return String(arg);
}

function formatArguments(args: unknown[], methodName: string): string[] {
  return args.map((arg) => {
    const methodNameLower = methodName.toLowerCase();
    if (methodNameLower.includes('pass')) {
      return maskSensitiveData(arg);
    }
    if (typeof arg === 'object' && arg !== null) {
      return JSON.stringify(arg);
    }
    return String(arg);
  });
}

function createStepWrapper(stepExecutor: StepExecutor) {
  return function wrapInAllureStep<T extends object>(instance: T): T {
    return new Proxy(instance, {
      get(target, propKey) {
        const originalValue = Reflect.get(target, propKey);

        if (typeof originalValue !== 'function') {
          return originalValue;
        }

        return async function asyncWrapper(...args: unknown[]) {
          const readableName = formatMethodName(propKey.toString());
          const formattedArgs = formatArguments(args, propKey.toString());
          const stepLabel = formattedArgs.length > 0 ? `${readableName} (${formattedArgs.join(', ')})` : readableName;
          const className = target.constructor.name;
          const stepName = `${className}: ${stepLabel}`;

          return stepExecutor(stepName, async () => originalValue.apply(target, args));
        };
      },
    });
  };
}

export function wrapInAllureStepPlaywright<T extends object>(instance: T): T {
  return createStepWrapper((stepName, fn) => test.step(stepName, fn))(instance);
}

export function wrapInAllureStepWebdriverIO<T extends object>(instance: T): T {
  return createStepWrapper(async (stepName, fn) => {
    try {
      AllureReporter.addStep(stepName);
      return await fn();
    } catch (error) {
      AllureReporter.addStep(`Failed: ${stepName}`, String(error));
      throw error;
    }
  })(instance);
}

export const wrapInAllureStep = wrapInAllureStepPlaywright;
