import { test as base, expect } from '@playwright/test';

class SoftAssertions {
  private errors: string[] = [];

  assertThat(actual: unknown) {
    return {
      isNotNull: (): void => {
        if (actual === null || actual === undefined) {
          this.errors.push(`Expected value to be not null, but was ${actual}`);
        }
      },
      isEqualTo: (expected: unknown): void => {
        if (actual !== expected) {
          this.errors.push(`Expected ${expected}, but got ${actual}`);
        }
      },
      isNotNullAndEqualTo: (expected: unknown): void => {
        if (actual === null || actual === undefined) {
          this.errors.push(`Expected value to be not null, but was ${actual}`);
        } else if (actual !== expected) {
          this.errors.push(`Expected ${expected}, but got ${actual}`);
        }
      },
    };
  }

  assertAll(): void {
    if (this.errors.length > 0) {
      throw new Error(`Soft assertions failed:\n${this.errors.join('\n')}`);
    }
  }
}

const test = base.extend<{
  softly: SoftAssertions;
}>({
  softly: async ({}, use) => {
    const softly = new SoftAssertions();
    await use(softly);
    softly.assertAll();
  },
});

export { test, expect };
