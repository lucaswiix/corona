import { ErrorCodes } from '../error/Errors';
import { ApplicationError } from '../error/Types';

export const OAUTH_ERROR = (description?: string): ApplicationError => ({
  status: 400,
  code: ErrorCodes.ACCOUNT_KIT + 1,
  type: 'OAUTH_ERROR',
  message: 'Seu código expirou, tente novamente',
  description: description || '',
});

export const INVALID_TOKEN = (description?: string): ApplicationError => ({
  status: 401,
  code: ErrorCodes.ACCOUNT_KIT + 1,
  type: 'INVALID_TOKEN',
  message: 'Código inválido.',
  description: description || '',
});
