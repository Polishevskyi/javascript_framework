import type { APIRequestContext } from '@playwright/test';
import { generatePet, type PetData } from '../../utils/dataGenerator.js';
import PetRequestModel from '../models/PetRequestModel.js';
import type PetResponseModel from '../models/PetResponseModel.js';
import { CREATE_PET, GET_PET, UPDATE_PET, DELETE_PET } from '../requests/Endpoint.js';
import ValidatedCrudRequester from '../requests/client/ValidatedCrudRequester.js';
import { ResponseSpecs, HTTP_STATUS } from '../specs/ResponseSpecs.js';

interface PetStepResult {
  requestData: PetData | null;
  responseData: PetResponseModel | null;
  status: number;
}

class PetSteps {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async createPet(petData: PetData | null = null): Promise<PetStepResult> {
    const requestData = petData || generatePet();
    const requester = this.createRequester(CREATE_PET);
    const responseData = (await requester.post(new PetRequestModel(requestData))) as PetResponseModel;

    return {
      requestData,
      responseData,
      status: HTTP_STATUS.OK,
    };
  }

  async getPetById(petId: number): Promise<PetStepResult> {
    const requester = this.createRequester(GET_PET);
    const responseData = (await requester.get(petId)) as PetResponseModel;

    return {
      requestData: null,
      responseData,
      status: HTTP_STATUS.OK,
    };
  }

  async updatePet(petData: PetData): Promise<PetStepResult> {
    const requester = this.createRequester(UPDATE_PET);
    const responseData = (await requester.put(new PetRequestModel(petData))) as PetResponseModel;

    return {
      requestData: petData,
      responseData,
      status: HTTP_STATUS.OK,
    };
  }

  async deletePet(petId: number): Promise<PetStepResult> {
    const requester = this.createRequester(DELETE_PET);
    await requester.delete(petId);

    return {
      requestData: null,
      responseData: null,
      status: HTTP_STATUS.OK,
    };
  }

  private createRequester(
    endpoint: typeof CREATE_PET | typeof GET_PET | typeof UPDATE_PET | typeof DELETE_PET
  ): ValidatedCrudRequester {
    const responseSpec = ResponseSpecs.requestReturnsOKSpec();
    return new ValidatedCrudRequester(this.requestContext, endpoint, responseSpec);
  }
}

export { PetSteps };
export type { PetStepResult };
