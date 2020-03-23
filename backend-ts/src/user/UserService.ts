import jwt from 'jwt-simple';
import globalConfig from '../config/GlobalConfig';
import { INVALID_AUTH, INVALID_PARAM, TOKEN_EXPIRED } from '../error/Errors';
import { ApplicationError } from '../error/Types';
import UserModel from '../model/User';
import { IUser } from '../model/UserInterface';
import { TwilioService } from '../twilio/Service';
import { parsePhone } from '../util/utilFunctions';
import { UserAuthResponse } from '../handler/Util';


const DEFAULT_EXPIRATION_TIME = 7889400000;


export const UserService = ({
  userModel = UserModel,
  twilioService = TwilioService(),
  globalConf = globalConfig
} = {}) => {
  async function sendToken(phone: string): Promise<[IUser, ApplicationError]> {

    const parsedPhone = parsePhone(phone);
    const countUsers = await userModel.count({
      where: {
        phone
      },
    });

    if (countUsers === 0) {
      return [undefined, INVALID_AUTH(
        'Não achamos este celular no nosso sistema...'
      )];
    }

    const [data, err] = await twilioService.sendToken(parsedPhone);
    return [undefined, err];

  }

  async function checkToken(
    data,
  ): Promise<[UserAuthResponse, ApplicationError]> {
    if (!data || !data.phone || !data.code) {
      const err = INVALID_PARAM('phone|accessToken');
      return [undefined, err];
    }

    const phone = parsePhone(data.phone);
    const [match, errMatch] = await twilioService.checkToken(
      phone,
      data.code
    );

    if (errMatch) {
      return [undefined, errMatch];
    }

    if (!match) {
      return [undefined, TOKEN_EXPIRED];
    }

    const user: IUser = await userModel.findOne({
      where: { phone },
    });

    if (!user) {
      return [undefined, INVALID_AUTH()];
    }

    const jwtData = {
      exp: newExp(globalConf.USER_JWT_EXPIRATION_TIME),
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    };

    const token: UserAuthResponse = {
      authToken: jwt.encode(jwtData, globalConf.USER_JWT_SECRET),
    };

    return [token, undefined];
  }



  async function signup(data: Partial<IUser>): Promise<[IUser, ApplicationError]> {

    const countUsers = await userModel.count({
      where: {
        $or: [{
          phone: data.phone
        },
        {
          email: data.email
        }]
      },
    });

    if (countUsers > 0) {
      return [undefined, INVALID_AUTH('Este celular ou e-mail já esta sendo utilizado!')];
    }

    const createdUser = await userModel.create(data, {
      returning: true
    });

    return [createdUser, undefined];

  }



  return Object.freeze({
    sendToken,
    checkToken,
    signup
  });
};
function newExp(duration = DEFAULT_EXPIRATION_TIME): number {
  return new Date().getTime() + duration;
}