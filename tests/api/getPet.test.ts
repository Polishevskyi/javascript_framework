import { test, expect, StatusCodes, PetResponseSchema } from '../../main/api/fixtures/baseTest.js';

test.describe('Get Pet', () => {
  test('Verify that pet can be retrieved successfully by ID', async ({ petSteps }) => {
    const createdPet = await petSteps.create();
    expect(createdPet.status).toBe(StatusCodes.OK);

    const petId = createdPet.responseData!.id;
    const retrievedPet = await petSteps.get(petId);
    expect(retrievedPet.status).toBe(StatusCodes.OK);
    PetResponseSchema.parse(retrievedPet.responseData);
    expect.soft(retrievedPet.responseData!.id).toBe(createdPet.responseData!.id);
    expect.soft(retrievedPet.responseData!.name).toBe(createdPet.responseData!.name);
  });
});
