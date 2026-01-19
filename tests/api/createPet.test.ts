import { test, expect } from '../../src/api/fixtures/apiFixtures.js';
import { PetSteps } from '../../src/api/steps/petSteps.js';
import { HTTP_STATUS } from '../../src/api/specs/ResponseSpecs.js';
import { assertThatModels } from '../../src/api/models/comparison/modelAssertions.js';
import PetRequestModel from '../../src/api/models/PetRequestModel.js';

test.describe('CREATE Pet Test', () => {
  test('Verify that pet can be created successfully with valid data', async ({ request, softly }) => {
    const petSteps = new PetSteps(request);
    const { requestData, responseData, status } = await petSteps.createPet();

    expect(status).toBe(HTTP_STATUS.OK);

    softly.assertThat(responseData).isNotNull();
    softly.assertThat(responseData?.id).isNotNull();

    const requestModel = new PetRequestModel(requestData);
    await assertThatModels(requestModel, responseData).match();
  });
});
