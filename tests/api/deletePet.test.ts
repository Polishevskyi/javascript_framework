import { test, expect } from '../../src/api/fixtures/apiFixtures.js';
import { PetSteps } from '../../src/api/steps/petSteps.js';
import { HTTP_STATUS } from '../../src/api/specs/ResponseSpecs.js';

test.describe('DELETE Pet Test', () => {
  test('Verify that pet can be deleted successfully by ID', async ({ request }) => {
    const petSteps = new PetSteps(request);
    const createdPet = await petSteps.createPet();
    const petId = createdPet.responseData!.id!;

    const deletedPet = await petSteps.deletePet(petId);

    expect(deletedPet.status).toBe(HTTP_STATUS.OK);
  });
});
