import { ApplicationError } from './Types';

export enum ErrorCodes {
  INVALID_PARAM = 1,
  NOT_FOUND = 2,
  UNIQUE_CONSTRAINT_VIOLATION = 3,
  INVALID_AUTH = 4,
  DEFAULT_ERROR = 5,
  MAX_ATTEMPTS = 6,
  ACCOUNT_KIT = 100,
  LEAD = 200,
  BROKER_PREFIX = 300,
  VISIT_PREFIX = 400,
  ROOM_PREFIX = 500,
  ROOM_REVIEW_PREFIX = 600,

  REFERENCE_POINT_PREFIX = 700,
  ANNOUNCE_PREFIX = 800,
  BEPAY_ACCOUNT_PREFIX = 900,
  SLIP_PREFIX = 1000,
  PROPERTY_PREFIX = 1100,
  BEPAY_TRANSACTION_PREFIX = 1200,
  CPFL_PREFIX = 1300,
  BROKER_AVAILIABILITY_PREFIX = 1400,
  TIMESLOT_PREFIX = 1500,
  OFFER_PREFIX = 1600,
  BROKER_NOTIFICATION = 1700,
}

export const TOKEN_EXPIRED: ApplicationError = ({
  status: 400,
  code: ErrorCodes.LEAD + 1,
  type: 'TOKEN_EXPIRED',
  message: 'Seu código expirou, tente novamente',
  description: `Accountkit token expired or phone did not matched`,
});

export const INVALID_PARAM = (
  paramName: string,
  paramValue?: string
): ApplicationError => ({
  status: 400,
  code: ErrorCodes.INVALID_PARAM,
  type: 'INVALID_PARAM',
  message: 'Dados inválidos',
  description: paramValue
    ? `Value ${paramValue} of parameter ${paramName} is invalid`
    : `${paramName} parameter is invalid`,
});

export const INVALID_PHONE = (): ApplicationError => ({
  status: 400,
  code: ErrorCodes.INVALID_PARAM,
  type: 'INVALID_PARAM',
  message: 'Número de celular inválido',
  description: 'Invalid phone number',
});

export const MAX_CHECK_ATTEMPTS = (): ApplicationError => ({
  status: 429,
  code: ErrorCodes.MAX_ATTEMPTS,
  type: 'MAX_CHECK_ATTEMPTS',
  message: 'Número de tentativas excedido, tente novamente mais tarde.',
  description: 'Max check attempts reached',
});

export const INVALID_TRACKING_CODE = (
  trackingCode: string
): ApplicationError => ({
  status: 400,
  code: ErrorCodes.INVALID_PARAM,
  type: 'INVALID_TRACKING_CODE',
  message: 'Código inválido',
  description: `Tracking code ${trackingCode} is invalid`,
});

export const INVALID_UUID = (uuid: string): ApplicationError => ({
  status: 400,
  code: ErrorCodes.INVALID_PARAM,
  type: 'INVALID_UUID',
  message: 'Uuid inválido',
  description: `Uuid ${uuid} is invalid`,
});

export const INVALID_KEY = (
  key: any,
  message?: string,
  description?: string
): ApplicationError => ({
  status: 400,
  code: ErrorCodes.INVALID_PARAM,
  type: 'INVALID_KEY',
  message: message || 'Chave inválida',
  description: description || `Key ${key} is invalid`,
});

export const NOT_FOUND = (
  message: string = 'Não encontrado'
): ApplicationError => ({
  status: 404,
  code: ErrorCodes.NOT_FOUND,
  type: 'NOT_FOUND',
  message,
  description: `Resource not found.`,
});

export const INVALID_EMAIL: ApplicationError = {
  status: 401,
  code: ErrorCodes.INVALID_AUTH,
  type: 'INVALID_AUTH',
  message: 'Este email já está sendo usado por outro número.',
  description: 'This email is already being used by another number.',
};

export const INVALID_AUTH = (message?: string): ApplicationError => ({
  status: 401,
  code: ErrorCodes.INVALID_AUTH,
  type: 'INVALID_AUTH',
  message: message ?? 'Credencias inválidas',
  description: 'Invalid credentials',
});

export const UNIQUE_CONSTRAINT_VIOLATION = (
  message: string = 'Dado único duplicado'
): ApplicationError => ({
  status: 422,
  code: ErrorCodes.UNIQUE_CONSTRAINT_VIOLATION,
  type: 'UNIQUE_CONSTRAINT_VIOLATION',
  message,
  description: `Unique constraint violation.`,
});
