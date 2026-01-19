import BaseModel from '../models/BaseModel.js';
import PetRequestModel from '../models/PetRequestModel.js';
import PetResponseModel from '../models/PetResponseModel.js';

class Endpoint {
  url: string;

  requestModel: typeof BaseModel;

  responseModel: typeof BaseModel;

  constructor(url: string, requestModel: typeof BaseModel, responseModel: typeof BaseModel) {
    this.url = url;
    this.requestModel = requestModel;
    this.responseModel = responseModel;
  }

  getUrl(pathParams: Record<string, string | number> = {}): string {
    let { url } = this;
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, String(value));
    });
    return url;
  }
}

export const CREATE_PET = new Endpoint('/pet', PetRequestModel, PetResponseModel);
export const GET_PET = new Endpoint('/pet/{petId}', BaseModel, PetResponseModel);
export const UPDATE_PET = new Endpoint('/pet', PetRequestModel, PetResponseModel);
export const DELETE_PET = new Endpoint('/pet/{petId}', BaseModel, PetResponseModel);

export { Endpoint };
export type { Endpoint as EndpointType };
