import type BaseModel from '../models/BaseModel.js';

interface RequestInterface {
  post(model: BaseModel | Record<string, unknown>): Promise<unknown>;
  get(id: string | number): Promise<unknown>;
  put(model: BaseModel | Record<string, unknown>): Promise<unknown>;
  delete(id: string | number): Promise<unknown>;
}

class RequestInterfaceImpl implements RequestInterface {
  async post(): Promise<never> {
    throw new Error('post method must be implemented');
  }

  async get(): Promise<never> {
    throw new Error('get method must be implemented');
  }

  async put(): Promise<never> {
    throw new Error('put method must be implemented');
  }

  async delete(): Promise<never> {
    throw new Error('delete method must be implemented');
  }
}

export default RequestInterfaceImpl;
export type { RequestInterface };
