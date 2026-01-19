import BaseModel from './BaseModel.js';

interface PetCategoryData {
  id?: number;
  name?: string;
}

class PetCategoryModel extends BaseModel {
  id?: number;

  name?: string;

  constructor({ id, name }: PetCategoryData = {}) {
    super({
      id,
      name,
    });
  }
}

export default PetCategoryModel;
export type { PetCategoryData };
