import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import uuid from 'uuid';
import { ResponseAPI } from './Types';

const errorResponse: ResponseAPI = Object.freeze({
  status: 500,
  success: false,
  message: 'Internal Server Error',
});

export const defaultMiddlewares = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json({ limit: '100mb' }),
  cookieParser(),
  bodyParser.json({ type: 'application/vnd.api+json' }),
] as RequestHandler[];

export const optionsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin ? String(req.headers.origin) : '*';
  // res.header('Access-Control-Allow-Origin', allowedOrigins.has(origin) ? origin : '*');
  res.header('Access-Control-Allow-Origin', origin);
  res.header(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, DELETE, PUT, PATCH'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Authorization, X-Requested-With, Content-Type, Accept, Charset, X-Auth-Token'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

export const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

export const tidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tid = uuid.v1();
  res.locals.tid = tid;
  res.header('X-Tid', tid);
  next();
};

export const errorHandler = async (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    ...errorResponse,
    ...(String(req.path).includes('/restrict') && {
      error: err,
    }),
  });
};