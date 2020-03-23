import { IsNotEmpty, IsOptional, validateSync, ValidationError } from 'class-validator';
import { ApplicationError } from '../error/Types';
import { IRequest, RequestStatus } from '../model/RequestInterface';
import { INVALID_REQUEST } from './Errors';

class ValidationRequest implements Partial<IRequest> {
  @IsOptional()
  key: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  user_account_key: string;

  @IsOptional()
  voluntary_user_account_key: string;

  @IsNotEmpty()
  status: RequestStatus;

  @IsNotEmpty()
  priority: number;

  @IsOptional()
  evaluation: number;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  latitude: string;
}
export function validateRequest(
  data: Partial<IRequest>
): [Partial<IRequest>, ApplicationError] {
  const handledRequest: Partial<IRequest> = {
    ...data,
  };

  const validator = new ValidationRequest();
  Object.assign(validator, handledRequest);

  const errors: ValidationError[] = validateSync(validator, {
    forbidUnknownValues: true,
  });
  if (errors.length) {
    return [undefined, INVALID_REQUEST(errors)];
  }

  return [handledRequest, undefined];
}
