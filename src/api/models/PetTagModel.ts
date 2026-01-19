import BaseModel from './BaseModel.js';

interface PetTagData {
  id?: number;
  name?: string;
}

class PetTagModel extends BaseModel {
  id?: number;

  name?: string;

  constructor({ id, name }: PetTagData = {}) {
    super({
      id,
      name,
    });
  }
}

export default PetTagModel;
export type { PetTagData };
