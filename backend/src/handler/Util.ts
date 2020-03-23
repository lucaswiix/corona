import { get as _get } from 'lodash';
import { ApplicationError } from '../error/Types';
import { ResponseAPI, ResponseAPIV2, ResponseMetadata } from './Types';

export const PAGE_SIZE = 25;

export interface IBuildResponseDataInput<T, E extends ApplicationError> {
  status: number;
  data?: T;
  err?: E;
}

export interface UserAuthResponse {
  authToken: string;
}

export interface IBuildResponseResultsInput<T, E extends ApplicationError> {
  status: number;
  results: T[];
  metadata: ResponseMetadata;
  err?: E;
}

export function buildResponseData<T, E extends ApplicationError>(
  responseData: IBuildResponseDataInput<T, E>
): ResponseAPI<T, E> {
  const { status = 500, data, err } = responseData;
  return err
    ? {
      status: err.status || 500,
      success: false,
      message: err.message,
      error: err,
    }
    : {
      status,
      success: true,
      ...{ data },
    };
}

export function buildResponseResults<T, E extends ApplicationError>(
  responseData: IBuildResponseResultsInput<T, E>
): ResponseAPI<T, E> {
  const { status = 500, results, metadata, err } = responseData;

  return err
    ? {
      status: err.status || 500,
      success: false,
      error: err,
    }
    : {
      status,
      success: true,
      results,
      metadata,
    };
}

export async function handleAxiosResponse(
  fn: () => Promise<any>
): Promise<ResponseAPI<any, any>> {
  try {
    return await fn();
  } catch (err) {
    if (err?.response?.data?.status) {
      return err.response.data;
    }

    return {
      status: err.response.status,
      success: false,
      data: err.response.data,
      message: err.message,
      error: err,
    };
  }
}

export async function handleAxiosResponseV2(
  fn: () => Promise<any>
): Promise<ResponseAPIV2<any, any>> {
  try {
    return await fn();
  } catch (err) {
    if (err?.response?.data?.status) {
      return err.response.data;
    }

    return {
      status: err.response.status,
      success: false,
      error: err,
    } as ResponseAPIV2;
  }
}

export interface IPagination {
  offset: number;
  limit: number;
}

export function getPagination(options?): IPagination {
  const offset = Number(_get(options, 'offset')) || 0;
  const limit = Number(_get(options, 'limit')) || PAGE_SIZE;
  return {
    offset,
    limit,
  };
}
