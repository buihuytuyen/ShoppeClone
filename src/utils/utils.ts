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
