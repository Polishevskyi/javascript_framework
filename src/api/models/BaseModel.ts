class BaseModel {
  [key: string]: unknown;

  constructor(data: Record<string, unknown> = {}) {
    Object.assign(this, data);
  }

  static fromJson<T extends BaseModel>(
    this: new (data: Record<string, unknown>) => T,
    json: Record<string, unknown>
  ): T {
    return new this(json);
  }

  toJson(): Record<string, unknown> {
    const json: Record<string, unknown> = { ...this };
    return json;
  }
}

export default BaseModel;
