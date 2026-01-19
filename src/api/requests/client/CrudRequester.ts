import type { APIRequestContext } from '@playwright/test';
import BaseRequest from '../BaseRequest.js';
import BaseModel from '../../models/BaseModel.js';
import type { EndpointType } from '../Endpoint.js';

interface ResponseSpecification {
  validate(response: { status(): number }): void;
}

class CrudRequester extends BaseRequest {
  protected endpoint: EndpointType;

  protected responseSpecification: ResponseSpecification | null;

  constructor(
    requestContext: APIRequestContext,
    endpoint: EndpointType,
    responseSpecification: ResponseSpecification | null
  ) {
    super(requestContext, endpoint, responseSpecification);
    this.endpoint = endpoint;
    this.responseSpecification = responseSpecification;
  }

  async post(model: BaseModel | Record<string, unknown>): Promise<{ status(): number; json(): Promise<unknown> }> {
    const body = model || {};
    const url = this.endpoint.getUrl();
    const response = await this.requestContext.post(`${this.baseURL}${url}`, {
      headers: this.defaultHeaders,
      data: body instanceof BaseModel ? body.toJson() : body,
    });

    if (this.responseSpecification) {
      this.responseSpecification.validate(response);
    }

    return response;
  }

  async get(id: string | number): Promise<{ status(): number; json(): Promise<unknown> }> {
    const url = this.endpoint.getUrl({ petId: id });
    const response = await this.requestContext.get(`${this.baseURL}${url}`, {
      headers: this.defaultHeaders,
    });

    if (this.responseSpecification) {
      this.responseSpecification.validate(response);
    }

    return response;
  }

  async put(model: BaseModel | Record<string, unknown>): Promise<{ status(): number; json(): Promise<unknown> }> {
    const url = this.endpoint.getUrl();
    const response = await this.requestContext.put(`${this.baseURL}${url}`, {
      headers: this.defaultHeaders,
      data: model instanceof BaseModel ? model.toJson() : model,
    });

    if (this.responseSpecification) {
      this.responseSpecification.validate(response);
    }

    return response;
  }

  async delete(id: string | number): Promise<{ status(): number; json(): Promise<unknown> }> {
    const url = this.endpoint.getUrl({ petId: id });
    const response = await this.requestContext.delete(`${this.baseURL}${url}`, {
      headers: this.defaultHeaders,
    });

    if (this.responseSpecification) {
      this.responseSpecification.validate(response);
    }

    return response;
  }
}

export default CrudRequester;
export type { ResponseSpecification };
