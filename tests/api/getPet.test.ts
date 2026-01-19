import { test, expect } from '../../src/api/fixtures/apiFixtures.js';
import { PetSteps } from '../../src/api/steps/petSteps.js';
import { HTTP_STATUS } from '../../src/api/specs/ResponseSpecs.js';
import { assertThatModels } from '../../src/api/models/comparison/modelAssertions.js';

test.describe('GET Pet Test', () => {
  test('Verify that pet can be retrieved successfully by ID', async ({ request, softly }) => {
    const petSteps = new PetSteps(request);
    const createdPet = await petSteps.createPet();
    const retrievedPet = await petSteps.getPetById(createdPet.responseData!.id!);

    expect(retrievedPet.status).toBe(HTTP_STATUS.OK);

    softly.assertThat(retrievedPet.responseData).isNotNull();

    await assertThatModels(createdPet.responseData!, retrievedPet.responseData!).match();
  });
});
