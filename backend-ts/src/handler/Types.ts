import { AxiosInstance } from 'axios';
import { ApplicationError } from '../error/Types';

export interface ResponseAPI<T = any, E = any> {
  status: number;
  success: boolean;
  data?: T;
  results?: T[];
  message?: string;
  metadata?: ResponseMetadata;
  error?: E;
  links?: any;
}

export interface ResponseAPIV2<T = any, E = ApplicationError> {
  status: number;
  success: boolean;
  metadata?: ResponseMetadata;
  links?: any;
  data: T;
  results: T[];
  error?: E;
}

export interface ResponseMetadata {
  count: number;
  offset: number;
  limit: number;
  next?: string;
  previous?: string;
}

export interface Options {
  cacheControl: string;
  axiosInstance?: AxiosInstance;
}
