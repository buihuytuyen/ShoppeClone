import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_ACCESS_TOKEN, URL_REGISTER } from '@/apis/auth.api';
import Config from '@/constants/config';
import { AuthResSuccess, RefreshTokenResError, RefreshTokenResSuccess } from '@/types/auth.type';
import { User } from '@/types/user.type';
import {
  getAccessTokenFromLs,
  getProfileFromLS,
  saveAccessTokenToLs,
  saveProfileToLS,
  clearLS,
  saveRefreshTokenToLs,
  getRefreshTokenFromLs
} from '@/utils/auth';
import { isAxiosError, isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/utils';
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

class Http {
  private instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;

  private refreshTokenRequest: Promise<string> | null;

  private profile: User | null;

  constructor() {
    this.accessToken = getAccessTokenFromLs();
    this.refreshToken = getRefreshTokenFromLs();
    this.refreshTokenRequest = null;
    this.profile = getProfileFromLS();

    this.instance = axios.create({
      baseURL: Config.BASE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 5,
        'expire-refresh-token': 60 * 60
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
        if (url === URL_LOGIN || url === URL_REGISTER) {
          this.accessToken = (response.data as AuthResSuccess).data.access_token;
          this.refreshToken = (response.data as AuthResSuccess).data.refresh_token;
          this.profile = (response.data as AuthResSuccess).data.user;
          saveAccessTokenToLs(this.accessToken);
          saveRefreshTokenToLs(this.refreshToken);
          saveProfileToLS(this.profile);
        } else if (url === URL_LOGOUT) {
          this.clearInstance();
        }
        return response;
      },

      (error: AxiosError) => {
        if (
          isAxiosError<{ message?: string }>(error) &&
          ![HttpStatusCode.Unauthorized, HttpStatusCode.UnprocessableEntity].includes(error.response?.status || 0)
        ) {
          const data = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message, {
            position: 'bottom-right',
            autoClose: 2000
          });
        }

        /**
         * - Token expired
         * - Token invalid
         */
        if (isAxiosUnauthorizedError<RefreshTokenResError>(error)) {
          const config = error.response?.config || { headers: {}, url: '' };

          const { url } = config;

          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_ACCESS_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });

            return this.refreshTokenRequest.then((access_token) =>
              this.instance({ ...config, headers: { ...config?.headers, authorization: access_token } })
            );
          }

          this.clearInstance();
          toast.error('Token invalid, please login again', {
            position: 'bottom-right',
            autoClose: 5000
          });
        }

        return Promise.reject(error);
      }
    );
  }

  public getInstance = () => this.instance;

  private clearInstance = () => {
    this.accessToken = '';
    this.refreshToken = '';
    this.profile = null;
    clearLS();
  };

  private handleRefreshToken = () =>
    this.instance
      .post<RefreshTokenResSuccess>(URL_REFRESH_ACCESS_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        this.accessToken = res.data.data.access_token;
        saveAccessTokenToLs(this.accessToken);
        return this.accessToken;
      })
      .catch((error) => {
        this.clearInstance();
        throw error;
      });
}

const http = new Http().getInstance();

export default http;
