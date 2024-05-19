export interface ErrorReponse<Data> {
  message: string;
  data?: Data;
}

export interface SuccessReponse<Data> {
  message: string;
  data: Data;
}

/**
 * -? remove undefined of key optional
 */
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
