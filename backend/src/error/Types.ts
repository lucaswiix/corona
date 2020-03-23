import { ValidationError } from 'class-validator/build/package/validation/ValidationError';

export enum ErrorTypes {
  INVALID_PARAM = 'INVALID_PARAM',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
}

export interface ApplicationError<T = any> {
  status: number;
  type: string;
  code: number;
  message: string;
  description: string;
  fields?: ValidationError[];
  data?: T;
}
