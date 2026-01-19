import 'dotenv/config';
import type { APIRequestContext } from '@playwright/test';

interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

interface RequestResponse {
  data: unknown;
  status: number;
  headers: Record<string, string>;
}

class BaseRequest {
  protected requestContext: APIRequestContext;

  protected endpoint: unknown;

  protected responseSpecification: unknown;

  protected baseURL: string;

  protected defaultHeaders: Record<string, string>;

  constructor(requestContext: APIRequestContext, endpoint: unknown = null, responseSpecification: unknown = null) {
    this.requestContext = requestContext;
    this.endpoint = endpoint;
    this.responseSpecification = responseSpecification;
    this.baseURL = process.env.API_BASE_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async get(url: string, config: RequestConfig = {}): Promise<RequestResponse> {
    const response = await this.requestContext.get(`${this.baseURL}${url}`, {
      headers: { ...this.defaultHeaders, ...config.headers },
      params: config.params,
    });

    return {
      data: await response.json(),
      status: response.status(),
      headers: response.headers(),
    };
  }

  async post(url: string, data: unknown, config: RequestConfig = {}): Promise<RequestResponse> {
    const response = await this.requestContext.post(`${this.baseURL}${url}`, {
      headers: { ...this.defaultHeaders, ...config.headers },
      data,
    });

    return {
      data: await response.json(),
      status: response.status(),
      headers: response.headers(),
    };
  }

  async put(url: string, data: unknown, config: RequestConfig = {}): Promise<RequestResponse> {
    const response = await this.requestContext.put(`${this.baseURL}${url}`, {
      headers: { ...this.defaultHeaders, ...config.headers },
      data,
    });

    return {
      data: await response.json(),
      status: response.status(),
      headers: response.headers(),
    };
  }

  async delete(url: string, config: RequestConfig = {}): Promise<RequestResponse> {
    const response = await this.requestContext.delete(`${this.baseURL}${url}`, {
      headers: { ...this.defaultHeaders, ...config.headers },
    });

    let data: unknown = null;
    const status = response.status();

    if (status !== 204) {
      const text = await response.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }
    }

    return {
      data,
      status,
      headers: response.headers(),
    };
  }
}

export default BaseRequest;
export type { RequestConfig, RequestResponse };
