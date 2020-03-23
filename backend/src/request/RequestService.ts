import * as dateFns from 'date-fns';
import jwt from 'jwt-simple';
import { Op } from 'sequelize';
import globalConfig from '../config/GlobalConfig';
import { INVALID_AUTH } from '../error/Errors';
import { ApplicationError } from '../error/Types';
import { ResponseMetadata } from '../handler/Types';
import { getPagination } from '../handler/Util';
import RequestModel from '../model/Request';
import { IRequest, RequestStatus } from '../model/RequestInterface';
import defaultDb from '../sequelize/Sequelize';
import { BaseOptions } from '../util/Types';
import { IS_VOLUNTARY_REQUEST_ERROR, REQUEST_NOT_FOUND } from './Errors';
import { ISearchRequest } from './Types';
import { validateRequest } from './ValidationRequest';

const radius = 5000; // 5km

export const RequestService = ({
  requestModel = RequestModel,
  globalConf = globalConfig,
  Db = defaultDb
} = {}) => {
  async function create(data: Partial<IRequest>, options?: BaseOptions): Promise<[IRequest, ApplicationError]> {
    try {
      await requestModel.update({
        status: RequestStatus.cancelled,
      }, {
        where: {
          status: RequestStatus.searching,
          $or: [
            {
              created_at: {
                $lte: dateFns.subMinutes(new Date(), 10)
              },
            },
            {
              user_account_key: data.user_account_key
            }
          ]
        },
        transaction: options?.transaction
      });

      const hasVoluntary = await requestModel.findAndCountAll({
        where: {
          voluntary_user_account_key: data.user_account_key,
          status: RequestStatus.accepted
        },
        transaction: options?.transaction
      });

      if (hasVoluntary.count > 0) {
        return [undefined, IS_VOLUNTARY_REQUEST_ERROR()]
      }

      const createdData = { ...data, priority: 1, status: RequestStatus.searching };
      const [curr, err] = await validateRequest(createdData);
      if (err) {
        return [undefined, err];
      }
      const create = await requestModel.create(curr, { returning: true, transaction: options?.transaction });

      return [create, undefined];
    } catch (error) {
      return [undefined, error];
    }
  }

  async function findAll(userKey, options?: Partial<BaseOptions>): Promise<[IRequest[], ResponseMetadata]> {
    const pagination = getPagination(options);
    const requests = await requestModel.findAll({
      where: {
        voluntary_user_account_key: userKey,
        status: {
          $in: [RequestStatus.finished, RequestStatus.accepted]
        }
      },
      order: [['created_at', 'desc']],
      ...pagination,
      transaction: options?.transaction
    });

    const totalCount = await requestModel.count({
      where: {
        voluntary_user_account_key: userKey,
        status: {
          $in: [RequestStatus.finished, RequestStatus.accepted]
        }
      },
      transaction: options?.transaction
    });

    const metadata = {
      ...pagination,
      limit: requests.length,
      count: totalCount,
    };

    return [requests, metadata];
  }

  async function findVoluntary(data: Partial<ISearchRequest>, options?: Partial<BaseOptions>): Promise<[IRequest[], ApplicationError]> {

    const isVoluntary = await requestModel.count({
      where: {
        voluntary_user_account_key: data.user_account_key,
        status: RequestStatus.accepted
      },
      transaction: options?.transaction
    });

    if (isVoluntary > 0) {
      return [undefined, IS_VOLUNTARY_REQUEST_ERROR()];
    }

    const findData = await requestModel.findAll({
      where: {
        status: RequestStatus.searching,
        [Op.and]: [
          Db.literal(
            `earth_distance(ll_to_earth(latitude::numeric, longitude::numeric), ll_to_earth(${Number(data.latitude)}, ${Number(data.longitude)})) < ${data.radius || radius}`
          ),
        ]
      },
      order: [['created_at', 'desc']],
      limit: 10,
      transaction: options?.transaction
    });

    return [findData, undefined]
  }

  async function accept(
    data: Partial<IRequest>,
    options?: Partial<BaseOptions>
  ): Promise<[IRequest, ApplicationError]> {

    const isVoluntary = await requestModel.count({
      where: {
        voluntary_user_account_key: data.user_account_key,
        status: RequestStatus.accepted
      },
      transaction: options?.transaction

    });

    if (isVoluntary > 0) {
      return [undefined, IS_VOLUNTARY_REQUEST_ERROR()];
    }

    const [count, acceptUpdate] = await requestModel.update({
      voluntary_user_account_key: data.user_account_key,
      status: RequestStatus.accepted
    }, {
      where: {
        user_account_key: {
          $not: data.user_account_key
        },
        key: data.key,
        longitude: data.longitude,
        latitude: data.latitude
      },
      returning: true,
      transaction: options?.transaction
    });

    if (count === 0) {
      return [undefined, REQUEST_NOT_FOUND(data.key)];
    }

    return [acceptUpdate[0], undefined];
  }

  async function finishRequest(data: Partial<IRequest>, options?: Partial<BaseOptions>): Promise<[IRequest, ApplicationError]> {

    const [count, request] = await requestModel.update({ status: RequestStatus.finished }, {
      where: {
        key: data.key,
        status: RequestStatus.accepted,
        $or: [
          {
            voluntary_user_account_key: data.user_account_key
          },
          {
            user_account_key: data.user_account_key,
          }
        ]

      },
      returning: true,
      transaction: options?.transaction
    });

    if (count === 0) {
      return [undefined, REQUEST_NOT_FOUND(data.user_account_key)];
    }

    return [request[0], undefined]
  }

  return Object.freeze({
    create,
    accept,
    finishRequest,
    findVoluntary,
    findAll
  });
};
