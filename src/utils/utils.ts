import { AxiosError, HttpStatusCode, isAxiosError as isError } from 'axios';

export const isAxiosError = <Error>(error: unknown): error is AxiosError<Error> => isError(error);

export const isAxiosUnprocessableEntity = <Error>(error: unknown): error is AxiosError<Error> =>
  isError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;

export const formatCurrency = (currency: number): string => {
  return new Intl.NumberFormat('de-DE').format(currency);
};

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase();
};
