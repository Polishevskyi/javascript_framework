import 'dotenv/config';

class RequestSpecs {
  static petStoreSpec(): { baseURL: string | undefined; headers: { 'Content-Type': string; Accept: string } } {
    return {
      baseURL: process.env.API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }
}

export default RequestSpecs;
