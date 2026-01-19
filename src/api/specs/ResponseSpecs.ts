/* eslint-disable max-classes-per-file */
interface Response {
  status(): number;
}

class ResponseSpecification {
  private expectedStatus: number;

  constructor(expectedStatus: number) {
    this.expectedStatus = expectedStatus;
  }

  validate(response: Response): Response {
    if (!response) {
      throw new Error('Response is null or undefined');
    }
    const status = typeof response.status === 'function' ? response.status() : response.status;
    if (status !== this.expectedStatus) {
      throw new Error(`Expected status ${this.expectedStatus}, but got ${status}`);
    }
    return response;
  }
}

class ResponseSpecs {
  static requestReturnsOKSpec(): ResponseSpecification {
    return new ResponseSpecification(200);
  }

  static requestReturnsCreatedSpec(): ResponseSpecification {
    return new ResponseSpecification(201);
  }

  static requestReturnsNoContentSpec(): ResponseSpecification {
    return new ResponseSpecification(204);
  }
}

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
} as const;

export { HTTP_STATUS, ResponseSpecs, ResponseSpecification };
export type { Response };
