import { test, expect } from '../../src/api/fixtures/apiFixtures.js';
import { PetSteps } from '../../src/api/steps/petSteps.js';
import { HTTP_STATUS } from '../../src/api/specs/ResponseSpecs.js';
import { assertThatModels } from '../../src/api/models/comparison/modelAssertions.js';
import { generatePetUpdate } from '../../src/utils/dataGenerator.js';
import PetRequestModel from '../../src/api/models/PetRequestModel.js';

test.describe('UPDATE Pet Test', () => {
  test('Verify that pet can be updated successfully with new data', async ({ request, softly }) => {
    const petSteps = new PetSteps(request);
    const createdPet = await petSteps.createPet();

    const updatedPetData = generatePetUpdate(createdPet.responseData!);
    const updatedPet = await petSteps.updatePet(updatedPetData);

    expect(updatedPet.status).toBe(HTTP_STATUS.OK);

    softly.assertThat(updatedPet.responseData).isNotNull();
    softly.assertThat(updatedPet.responseData?.id).isNotNullAndEqualTo(createdPet.responseData!.id);
    softly.assertThat(updatedPet.responseData?.name).isNotNullAndEqualTo(updatedPetData.name);

    const updatedPetModel = new PetRequestModel(updatedPetData);
    await assertThatModels(updatedPetModel, updatedPet.responseData!).match();
  });
});
