import Axios from 'axios';
import jwt from 'jwt-simple';
import globalConfig from '../config/GlobalConfig';
import RequestModel from '../model/Request';
import { IRequest, RequestStatus } from '../model/RequestInterface';
import UserModel from '../model/User';
import '../sequelize/Sequelize';
import { API_URL } from '../test/config';
import { RequestSeed, UserSeed } from '../test/seed';
import { newExp } from '../util/utilFunctions';

const loggedUser = (async function createAndLoginUser() {
  const createdUser = await UserModel.create({
    ...UserSeed.data[0],
    key: undefined,
    phone: '+5581984074021',
    email: 'logged@teste.com'
  }, { returning: true });


  const jwtData = {
    exp: newExp(globalConfig.USER_JWT_EXPIRATION_TIME),
    user: {
      key: createdUser.key,
      name: createdUser.name,
      phone: createdUser.phone,
      email: createdUser.email,
    },
  };

  return {
    ...jwtData.user,
    authToken: jwt.encode(jwtData, globalConfig.USER_JWT_SECRET),
  };
})();

describe('should test a integration API', () => {

  it('should test a find all request method', async () => {

    const createdUser = await UserModel.create({
      ...UserSeed.data[0],
      key: undefined,
      phone: '+5581984074022',
      email: 'lucas@teste.com'
    }, { returning: true });


    const bookRequest: Partial<IRequest>[] = [
      {
        ...RequestSeed.data[0],
        key: undefined,
        description: 'longe pra carai',
        latitude: '-22.907790',
        longitude: '-47.061943',
        user_account_key: createdUser.key,
        voluntary_user_account_key: (await loggedUser).key,
        status: RequestStatus.accepted
      },
      {
        ...RequestSeed.data[0],
        key: undefined,
        description: 'perto',
        latitude: '-22.848232',
        longitude: '-47.085378',
        user_account_key: createdUser.key,
        voluntary_user_account_key: (await loggedUser).key,
        status: RequestStatus.finished
      }
    ];

    await RequestModel.bulkCreate(bookRequest,
      { returning: true }
    )

    const data = await Axios.get(`${API_URL}/v1/request/`, {
      headers: {
        'x-auth-token': (await loggedUser).authToken
      }
    });

    expect(data.status).toBe(200);
    expect(data.data.results.length > 0).toBe(true);

  });
  it('should test a create request method', async () => {

    const bookRequest = {
      ...RequestSeed.data[0],
      key: undefined,
      description: 'longe pra carai',
      latitude: '-22.907790',
      longitude: '-47.061943',
    };

    delete bookRequest.key;

    const data = await Axios.post(`${API_URL}/v1/request/new_request`, bookRequest, {
      headers: {
        'x-auth-token': (await loggedUser).authToken
      }
    });

    expect(data.status).toBe(200);

  });
})