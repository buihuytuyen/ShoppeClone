import Config from '@/constants/config';
import { AxiosError, HttpStatusCode, isAxiosError as isError } from 'axios';
import avt from '@/assets/images/avt.jpg';
import { RefreshTokenResError } from '@/types/auth.type';

export const isAxiosError = <Error>(error: unknown): error is AxiosError<Error> => isError(error);

export const isAxiosUnprocessableEntityError = <UnprocessableEntityError>(
  error: unknown
): error is AxiosError<UnprocessableEntityError> =>
  isError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;

export const isAxiosUnauthorizedError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> =>
  isError(error) && error.response?.status === HttpStatusCode.Unauthorized;

export const isAxiosExpiredTokenError = <ExpiredTokenResError>(
  error: unknown
): error is AxiosError<ExpiredTokenResError> =>
  isAxiosUnauthorizedError<RefreshTokenResError>(error) && error.response?.data.data?.name === 'EXPIRED_TOKEN';

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

export const rateSale = (original: number, sale: number): string =>
  Math.round(((original - sale) / original) * 100) + '%';

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return `${removeSpecialCharacter(name).replace(/\s/g, '-')}-i.${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i.');
  return arr[arr.length - 1];
};

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${Config.BASE_API_URL}/images/${avatarName}` : avt);
