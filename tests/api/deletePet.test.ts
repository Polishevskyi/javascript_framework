import { test, expect, StatusCodes } from '../../main/api/fixtures/baseTest.js';

test.describe('Delete Pet', () => {
  test('Verify that pet can be deleted successfully by ID', async ({ petSteps }) => {
    const createdPet = await petSteps.create();
    expect(createdPet.status).toBe(StatusCodes.OK);

    const petId = createdPet.responseData!.id;
    const deletedPet = await petSteps.delete(petId);
    expect(deletedPet.status).toBe(StatusCodes.OK);

    const retrievedPet = await petSteps.get(petId);
    expect(retrievedPet.status).toBe(StatusCodes.NOT_FOUND);
  });
});
