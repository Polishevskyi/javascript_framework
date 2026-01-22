import { faker } from '@faker-js/faker';
import type { PetRequest, PetResponse, PetStatus } from '../api/schemas/petSchema.js';
import type { PetCategory } from '../api/schemas/petCategorySchema.js';
import type { PetTag } from '../api/schemas/petTagSchema.js';

// API data generators
class PetDataGenerator {
  static generateCategory(): PetCategory {
    return {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.helpers.arrayElement(['Dogs', 'Cats', 'Birds', 'Fish', 'Reptiles']),
    };
  }

  static generateTag(): PetTag {
    return {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.word.noun(),
    };
  }

  static generatePetRequest(overrides: Partial<PetRequest> = {}): PetRequest {
    return {
      id: faker.number.int({ min: 1, max: 100000 }),
      category: this.generateCategory(),
      name: faker.person.firstName(),
      photoUrls: [faker.image.urlLoremFlickr({ category: 'animals' })],
      tags: [this.generateTag()],
      status: faker.helpers.arrayElement<PetStatus>(['available', 'pending', 'sold']),
      ...overrides,
    };
  }

  static generatePetResponse(overrides: Partial<PetResponse> = {}): PetResponse {
    const basePet = this.generatePetRequest();
    return {
      ...basePet,
      id: faker.number.int({ min: 1, max: 100000 }),
      ...overrides,
    } as PetResponse;
  }

  static generatePetUpdate(existingPet: PetResponse | PetRequest): PetRequest {
    return {
      ...existingPet,
      name: faker.animal.type(),
      status: faker.helpers.arrayElement<PetStatus>(['available', 'pending', 'sold']),
    } as PetRequest;
  }

  static generatePetWithUniquePrefix(prefix: string): PetRequest {
    return this.generatePetRequest({
      name: `${prefix}_${faker.string.alphanumeric(8)}`,
    });
  }
}

const WebDataGenerator = {
  generateUserInfo() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  },
} as const;

// Mobile data generators
export class MobileDataGenerator {
  static generateInvalidCredentials() {
    return {
      invalidUsername: faker.internet.email(),
      invalidPassword: faker.internet.password(),
      randomUsername: faker.internet.username(),
      randomPassword: faker.internet.password({ length: 15 }),
    };
  }
}

export { PetDataGenerator };
export default WebDataGenerator;
export { PetDataGenerator as PetFactory };
