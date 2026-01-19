declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL?: string;
    API_BASE_URL?: string;
    STANDARD_USER?: string;
    STANDARD_PASSWORD?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
