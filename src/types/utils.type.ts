export interface ErrorReponse<Data> {
  message: string;
  data?: Data;
}

export interface SuccessReponse<Data> {
  message: string;
  data: Data;
}
