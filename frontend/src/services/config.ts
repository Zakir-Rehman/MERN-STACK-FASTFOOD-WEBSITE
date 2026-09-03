const isProd = (import.meta as any).env.VITE_MODE === 'prod';

export const config = {
  baseUrl: isProd
    ? (import.meta as any).env.VITE_PROD_BASE_URL
    : (import.meta as any).env.VITE_DEV_BASE_URL,
};

console.log('config', config);