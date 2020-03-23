import express, { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { defaultMiddlewares, optionsMiddleware } from '../handler/Middlewares';
import { buildResponseData, buildResponseResults } from '../handler/Util';
import { IRequest } from '../model/RequestInterface';
import { AuthMiddleware } from '../user/Middlewares';
import { RequestService } from './RequestService';
import { ISearchRequest } from './Types';

export function handler(): Router {
  const requestService = RequestService();
  const router = express.Router({ mergeParams: true });
  const middlewares = [...defaultMiddlewares, optionsMiddleware];

  router.get('/',
    AuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { offset, limit } = req.query;
        const [results, metadata] = await requestService.findAll(res?.locals?.auth.user.key, {
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
    AuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data: Partial<IRequest> = req.body;

        const [result, err] = await requestService.create({ ...data, user_account_key: res?.locals?.auth?.user?.key });

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
    AuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data: Partial<IRequest> = req.body;

        const [result, err] = await requestService.finishRequest({ ...data, user_account_key: res?.locals?.auth?.user?.key });

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
    AuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data: Partial<ISearchRequest> = req.body;

        const [result, err] = await requestService.findVoluntary({ ...data, user_account_key: res?.locals?.auth?.user?.key });

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
    AuthMiddleware(),
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body

        const [result, err] = await requestService.accept({ ...data, user_account_key: res?.locals?.auth?.user?.key });

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
