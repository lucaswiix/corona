import { NextFunction, Request, Response } from 'express';
import { INVALID_AUTH } from '../error/Errors';
import { buildResponseData } from '../handler/Util';
import { UserService } from './UserService';

export const AuthMiddleware = (
  userService = UserService()
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers['x-auth-token'] ?? req?.cookies?.quarentena_auth_token;
    if (!authToken) {
      const response = buildResponseData({ status: 402, err: INVALID_AUTH(JSON.stringify(req.headers)) });
      res.status(response.status).json(response);
      return;
    }
    const [user, err] = await userService.checkAuthToken(authToken);
    if (err) {
      const response = buildResponseData({ status: err.status, err });
      res.status(response.status).json(response);
      return;
    }
    res.locals.auth = user;
    next();
  } catch (err) {
    next(err);
  }
};