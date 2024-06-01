import UrlPath from '@/constants/path';
import { AuthReponse } from '@/types/auth.type';
import { User } from '@/types/user.type';
import { getAccessTokenFromLs, getProfileFromLS, saveAccessTokenToLs, saveProfileToLS, clearLS } from '@/utils/auth';
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

class Http {
  private instance: AxiosInstance;
  private accessToken: string;

  private profile: User | null;

  constructor() {
    this.accessToken = getAccessTokenFromLs();
    this.profile = getProfileFromLS();

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
        if (url === UrlPath.Login || url === UrlPath.Register) {
          this.accessToken = (response.data as AuthReponse).data.access_token;
          this.profile = (response.data as AuthReponse).data.user;
          saveAccessTokenToLs(this.accessToken);
          saveProfileToLS(this.profile);
        } else if (url === '/logout') {
          this.accessToken = '';
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(message, {
            position: 'bottom-right',
            autoClose: 2000
          });
        }

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS();
        }

        return Promise.reject(error);
      }
    );
  }

  public getInstance = () => this.instance;
}

const http = new Http().getInstance();

export default http;
