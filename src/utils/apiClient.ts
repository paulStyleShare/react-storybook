import axios, { AxiosRequestConfig } from 'axios';

export const growthProxyConfig: AxiosRequestConfig = {
  baseURL: 'https://growth-proxy.styleshare.kr',
  withCredentials: true,
};
export const baseApiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? (process.env.API_BASE_URL as string)
      : '/api',
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
  withCredentials: true,
});
