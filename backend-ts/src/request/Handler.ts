import express, { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { defaultMiddlewares, optionsMiddleware } from '../handler/Middlewares';
import { buildResponseData, buildResponseResults } from '../handler/Util';
import { IRequest } from '../model/RequestInterface';
import { RequestService } from './RequestService';
import { ISearchRequest } from './Types';
import { INVALID_AUTH } from '../error/Errors';

export function handler(): Router {
  const requestService = RequestService();
  const router = express.Router({ mergeParams: true });
  const middlewares = [...defaultMiddlewares, optionsMiddleware];

  router.get('/',
    RequestAuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { offset, limit } = req.query;

        const [results, metadata] = await requestService.findAll(res?.locals?.user?.id, {
          offset: parseInt(offset, 10),
          limit: parseInt(limit, 10),
        });

        if (results.length === 0) {
          const responseData = buildResponseResults({
            status: 204,
            results: [],
            metadata
          });
          res.status(responseData.status).json(responseData);
          return;
        }

        const responseData = buildResponseResults({
          status: 200,
          results,
          metadata
        });
        res.status(responseData.status).json(responseData);

      } catch (err) {
        next(err);
      }
    })

  router.post(
    '/new_request',
    RequestAuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data: Partial<IRequest> = req.body;

        const [result, err] = await requestService.create({ ...data, user_id: res?.locals?.user?.id });

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
    '/finish_request',
    RequestAuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data: Partial<IRequest> = req.body;

        const [result, err] = await requestService.finishRequest({ ...data, user_id: res?.locals?.user?.id });

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

  router.get(
    '/find',
    RequestAuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data: Partial<ISearchRequest> = req.body;

        const [result, err] = await requestService.findVoluntary({ ...data, user_id: res?.locals?.user?.id });

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
    '/accept_request',
    RequestAuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body

        const [result, err] = await requestService.accept({ ...data, user_id: res?.locals?.user.id });

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

export const RequestAuthMiddleware = (
  requestService = RequestService()
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.header('auth-token');
    if (!authToken) {
      const response = buildResponseData({ status: 402, err: INVALID_AUTH() });
      res.status(response.status).json(response);
      return;
    }
    const [user, err] = await requestService.checkAuthToken(authToken);
    if (err) {
      const response = buildResponseData({ status: err.status, err });
      res.status(response.status).json(response);
      return;
    }
    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
