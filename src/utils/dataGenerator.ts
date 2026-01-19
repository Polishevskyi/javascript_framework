import { faker } from '@faker-js/faker';

// API types
interface PetData {
  id: number;
  category: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: string[];
  tags: Array<{
    id: number;
    name: string;
  }>;
  status: 'available' | 'pending' | 'sold';
}

// Web types
interface UserInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

// API generators
const generatePet = (): PetData => ({
  id: faker.number.int({ min: 1, max: 100000 }),
  category: {
    id: faker.number.int({ min: 1, max: 100 }),
    name: faker.helpers.arrayElement(['Dogs', 'Cats', 'Birds', 'Fish', 'Reptiles']),
  },
  name: faker.person.firstName(),
  photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
  tags: [
    {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.word.noun(),
    },
  ],
  status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
});

const generatePetUpdate = (existingPet: PetData): PetData => ({
  ...existingPet,
  name: faker.animal.type(),
  status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
});

// Web generators
class DataGenerator {
  static generateUserInfo(): UserInfo {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}

export { generatePet, generatePetUpdate };
export default DataGenerator;
export type { PetData, UserInfo };
