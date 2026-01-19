import type { APIRequestContext } from '@playwright/test';
import CrudRequester from './CrudRequester.js';
import BaseModel from '../../models/BaseModel.js';
import type { EndpointType } from '../Endpoint.js';

interface ResponseSpecification {
  validate(response: { status(): number }): void;
}

class ValidatedCrudRequester {
  private endpoint: EndpointType;

  private crudRequester: CrudRequester;

  constructor(
    requestContext: APIRequestContext,
    endpoint: EndpointType,
    responseSpecification: ResponseSpecification | null
  ) {
    this.endpoint = endpoint;
    this.crudRequester = new CrudRequester(requestContext, endpoint, responseSpecification);
  }

  async post(model: BaseModel | Record<string, unknown>): Promise<unknown> {
    const response = await this.crudRequester.post(model);
    const responseData = await response.json();
    if (!responseData) {
      throw new Error('Response data is null or undefined');
    }
    const ResponseModel = this.endpoint.responseModel;
    if (!ResponseModel) {
      return responseData;
    }
    return new ResponseModel(responseData as Record<string, unknown>);
  }

  async get(id: string | number): Promise<unknown> {
    const response = await this.crudRequester.get(id);
    const responseData = await response.json();
    if (!responseData) {
      return null;
    }
    const ResponseModel = this.endpoint.responseModel;
    if (!ResponseModel) {
      return responseData;
    }
    if ('fromJson' in ResponseModel && typeof (ResponseModel as { fromJson?: unknown }).fromJson === 'function') {
      return (ResponseModel as { fromJson: (json: Record<string, unknown>) => unknown }).fromJson(
        responseData as Record<string, unknown>
      );
    }
    return new ResponseModel(responseData as Record<string, unknown>);
  }

  async put(model: BaseModel | Record<string, unknown>): Promise<unknown> {
    const response = await this.crudRequester.put(model);
    const responseData = await response.json();
    if (!responseData) {
      throw new Error('Response data is null or undefined');
    }
    const ResponseModel = this.endpoint.responseModel;
    if (!ResponseModel) {
      return responseData;
    }
    if ('fromJson' in ResponseModel && typeof (ResponseModel as { fromJson?: unknown }).fromJson === 'function') {
      return (ResponseModel as { fromJson: (json: Record<string, unknown>) => unknown }).fromJson(
        responseData as Record<string, unknown>
      );
    }
    return new ResponseModel(responseData as Record<string, unknown>);
  }

  async delete(id: string | number): Promise<unknown> {
    const response = await this.crudRequester.delete(id);
    const status = typeof response.status === 'function' ? response.status() : response.status;
    const responseData = status !== 204 ? await response.json() : null;
    const ResponseModel = this.endpoint.responseModel;
    if (!ResponseModel || !responseData) {
      return responseData;
    }
    const hasFromJson =
      'fromJson' in ResponseModel && typeof (ResponseModel as { fromJson?: unknown }).fromJson === 'function';
    if (hasFromJson) {
      return (ResponseModel as { fromJson: (json: Record<string, unknown>) => unknown }).fromJson(
        responseData as Record<string, unknown>
      );
    }
    return new ResponseModel(responseData as Record<string, unknown>);
  }
}

export default ValidatedCrudRequester;
