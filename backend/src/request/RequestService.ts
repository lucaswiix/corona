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
const DEFAULT_EXPIRATION_TIME = 7889400000;

const radius = 5000; //5km

export const RequestService = ({
  requestModel = RequestModel,
  globalConf = globalConfig,
  Db = defaultDb
} = {}) => {
  async function create(data: Partial<IRequest>): Promise<[IRequest, ApplicationError]> {
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
              user_id: data.user_id
            }
          ]
        }
      });

      const hasVoluntary = await requestModel.findAndCountAll({
        where: {
          voluntary_id: data.user_id,
          status: RequestStatus.accepted
        }
      });

      if (hasVoluntary.count > 0) {
        return [undefined, IS_VOLUNTARY_REQUEST_ERROR()]
      }

      const create = await requestModel.create({ ...data, priority: 1, status: RequestStatus.searching }, { returning: true });

      return [create, undefined];
    } catch (error) {
      return [undefined, error];
    }
  }

  async function findAll(userId, options?: Partial<BaseOptions>): Promise<[IRequest[], ResponseMetadata]> {
    const pagination = getPagination(options);
    const requests = await requestModel.findAll({
      where: {
        voluntary_id: userId,
        status: {
          $in: [RequestStatus.finished, RequestStatus.accepted, RequestStatus.cancelled]
        }
      },
      order: ['created_at', 'desc'],
      ...pagination
    });

    const totalCount = await requestModel.count({
      where: {
        voluntary_id: userId,
        status: {
          $in: [RequestStatus.finished, RequestStatus.accepted, RequestStatus.cancelled]
        }
      },
    });

    const metadata = {
      ...pagination,
      limit: requests.length,
      count: totalCount,
    };

    return [requests, metadata];
  }

  async function accept(
    data: Partial<IRequest>,
  ): Promise<[IRequest, ApplicationError]> {

    const isVoluntary = await requestModel.count({
      where: {
        voluntary_id: data.user_id,
        status: RequestStatus.accepted
      }
    });

    if (isVoluntary > 0) {
      return [undefined, IS_VOLUNTARY_REQUEST_ERROR()];
    }

    const [count, acceptUpdate] = await requestModel.update({
      voluntary_id: data.user_id,
      status: RequestStatus.accepted
    }, {
      where: {
        id: data.id,
        longitude: data.longitude,
        latitude: data.latitude
      },
      returning: true
    });

    if (count === 0) {
      return [undefined, REQUEST_NOT_FOUND(data.id)];
    }

    return [acceptUpdate[0], undefined];
  }

  async function findVoluntary(data: Partial<ISearchRequest>): Promise<[IRequest[], ApplicationError]> {

    const isVoluntary = await requestModel.count({
      where: {
        voluntary_id: data.user_id,
        status: RequestStatus.accepted
      }
    });

    if (isVoluntary > 0) {
      return [undefined, IS_VOLUNTARY_REQUEST_ERROR()];
    }

    const findData = await requestModel.findAll({
      where: {
        status: RequestStatus.searching,
        [Op.and]: [
          Db.literal(
            `acos(sin(${data.latitude}) * sin(latitude) + cos(${data.latitude}) * cos(Lat) * cos(Lon - (${data.longitude}))) * 6371 <= ${radius}`
          ),
        ]
      },
      order: ['created_at', 'desc'],
      limit: 10
    });

    return [findData, undefined]
  }

  async function finishRequest(data: Partial<IRequest>): Promise<[IRequest, ApplicationError]> {

    const [count, request] = await requestModel.update({ status: RequestStatus.finished }, {
      where: {
        id: data.id,
        status: RequestStatus.accepted,
        voluntary_id: data.user_id
      },
      returning: true
    });

    if (count === 0) {
      return [undefined, REQUEST_NOT_FOUND(data.user_id)];
    }

    return [request[0], undefined]
  }


  async function checkAuthToken(
    authToken: string,
  ): Promise<[any, ApplicationError]> {
    if (!authToken) {
      return [undefined, INVALID_AUTH()];
    }
    try {
      const payload = jwt.decode(authToken, globalConf.USER_JWT_SECRET);
      const exp = Number(payload?.exp);
      if (isNaN(exp) || exp < new Date().getTime()) {
        return [undefined, INVALID_AUTH()];
      }
      return [payload, undefined];
    } catch (err) {
      return [undefined, INVALID_AUTH()];
    }
  }

  return Object.freeze({
    create,
    accept,
    checkAuthToken,
    finishRequest,
    findVoluntary,
    findAll
  });
};
