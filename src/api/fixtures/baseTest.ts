import * as base from '@playwright/test';
import { StatusCodes } from 'http-status-codes';
import { PetSteps } from '../steps/petSteps.js';
import { PetFactory } from '../../utils/dataGenerator.js';
import { PetResponseSchema } from '../schemas/petSchema.js';
import { wrapInAllureStep } from '../../utils/allure-proxy.js';

const test = base.test.extend<{
  petSteps: PetSteps;
}>({
  petSteps: async ({ request }, use) => {
    await use(wrapInAllureStep(new PetSteps(request)));
  },
});

export { test, StatusCodes, PetResponseSchema, PetFactory };
export const { expect } = base;
