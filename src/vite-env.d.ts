interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_MANAGER: string;
  readonly VITE_URL: string;
  readonly VITE_SERVE_URL: string;
  readonly VITE_ACCESS_TOKEN: string;
  readonly VITE_REFRESH_TOKEN: string;
  readonly VITE_PROFILE: string;
  // add any additional VITE_ variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}