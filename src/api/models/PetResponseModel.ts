import BaseModel from './BaseModel.js';
import PetCategoryModel from './PetCategoryModel.js';
import PetTagModel from './PetTagModel.js';

interface PetResponseData {
  id?: number;
  category?: PetCategoryModel | { id?: number; name?: string };
  name?: string;
  photoUrls?: string[];
  tags?: Array<PetTagModel | { id?: number; name?: string }>;
  status?: 'available' | 'pending' | 'sold';
}

class PetResponseModel extends BaseModel {
  id?: number;

  category?: PetCategoryModel | null;

  name?: string;

  photoUrls?: string[];

  tags?: PetTagModel[] | null;

  status?: 'available' | 'pending' | 'sold';

  constructor({ id, category, name, photoUrls, tags, status }: PetResponseData = {}) {
    let categoryModel: PetCategoryModel | null = null;
    if (category instanceof PetCategoryModel) {
      categoryModel = category;
    } else if (category) {
      categoryModel = new PetCategoryModel(category);
    }
    super({
      id,
      category: categoryModel,
      name,
      photoUrls,
      tags: tags ? tags.map((tag) => (tag instanceof PetTagModel ? tag : new PetTagModel(tag))) : null,
      status,
    });
  }

  static fromJson(json: PetResponseData): PetResponseModel {
    return new PetResponseModel(json);
  }
}

export default PetResponseModel;
export type { PetResponseData };
