import express, { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { INVALID_PARAM } from '../error/Errors';
import { defaultMiddlewares, optionsMiddleware } from '../handler/Middlewares';
import { UserService } from './UserService';
import { buildResponseData } from '../handler/Util';


export function handler(): Router {
  const userService = UserService();
  const router = express.Router({ mergeParams: true });
  const middlewares = [...defaultMiddlewares, optionsMiddleware];

  router.post(
    '/send_token',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { phone } = req.body;
        if (!phone) {
          return res.status(400).json(INVALID_PARAM('phone'));
        }
        const [result, err] = await userService.sendToken(phone);

        const responseData = buildResponseData({
          status: 200,
          data: result,
          err,
        });

        res.status(responseData.status).json(responseData);

      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/check_token',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        if (!data.phone || data.code) {
          return res.status(400).json(INVALID_PARAM('phone|code'));
        }
        const [result, err] = await userService.checkToken(data);

        const responseData = buildResponseData({
          status: 201,
          data: result,
          err,
        });
        res.status(responseData.status).json(responseData);

      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
