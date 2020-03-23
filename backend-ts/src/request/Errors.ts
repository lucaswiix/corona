import { ValidationError } from 'class-validator';
import { ApplicationError } from '../error/Types';
import { buildDescription } from '../error/Utils';

export enum ErrorCodes {
  REQUEST_NOT_FOUND = 1,
  INVALID_REQUEST = 2,
  REQUEST_ITEM_NOT_FOUND = 3,
  INVALID_REQUEST_ITEM = 4,
  IS_VOLUNTARY_ERROR = 5
}

export const REQUEST_NOT_FOUND = (key: string): ApplicationError => ({
  status: 404,
  code: ErrorCodes.REQUEST_NOT_FOUND,
  type: 'REQUEST_NOT_FOUND',
  message: 'A solicitação não foi encontrada',
  description: `Request (${key}) was not found`,
});

export const INVALID_REQUEST = (
  fields: ValidationError[]
): ApplicationError => ({
  status: 400,
  code: ErrorCodes.INVALID_REQUEST,
  type: 'INVALID_REQUEST',
  message: 'Dados inválidos',
  description: buildDescription(fields),
  fields,
});
export const IS_VOLUNTARY_REQUEST_ERROR = (): ApplicationError => ({
  status: 400,
  code: ErrorCodes.IS_VOLUNTARY_ERROR,
  type: 'IS_VOLUNTARY_ERROR',
  message: 'Você possui uma solicitação de voluntáriado em aberto.',
  description: `You have a voluntary request opened.`,
});

export const INVALID_REQUEST_ITEM = (
  fields: ValidationError[]
): ApplicationError => ({
  status: 400,
  code: ErrorCodes.INVALID_REQUEST_ITEM,
  type: 'INVALID_REQUEST_ITEM',
  message: 'Dados inválidos',
  description: buildDescription(fields),
  fields,
});
