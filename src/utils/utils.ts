import { AxiosError, HttpStatusCode, isAxiosError as isError } from 'axios';

export const isAxiosError = <Error>(error: unknown): error is AxiosError<Error> => isError(error);

export const isAxiosUnprocessableEntity = <Error>(error: unknown): error is AxiosError<Error> =>
  isError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
