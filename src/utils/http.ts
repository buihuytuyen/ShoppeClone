import { AuthReponse } from '@/types/auth.type';
import { clearAccessTokenFromLs, getAccessTokenFromLs, saveAssceeTokenToLs } from '@/utils/auth';
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = getAccessTokenFromLs();
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthReponse).data.access_token;
          saveAssceeTokenToLs(this.accessToken);
        } else if (url === '/logout') {
          this.accessToken = '';
          clearAccessTokenFromLs();
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }

  public getInstance = () => this.instance;
}

const http = new Http().instance;

export default http;
