import RequestModel from '../model/Request';
import { IRequest, RequestStatus } from '../model/RequestInterface';
import UserModel from '../model/User';
import db from '../sequelize/Sequelize';
import { RequestSeed, UserSeed } from '../test/seed';
import { DEFAULT_TIMEOUT } from '../util/Constants';
import { ErrorCodes } from './Errors';
import { RequestService } from './RequestService';
import { ISearchRequest } from './Types';

jest.setTimeout(DEFAULT_TIMEOUT);

const requestService = RequestService();
describe('RequestService', () => {

  describe('test create request', () => {

    it('should be create a request', async () => {
      const transaction = await db.transaction();

      const data = {
        ...RequestSeed.data[0]
      };

      delete data.key;

      const [created, error] = await requestService.create(data, { transaction });

      expect(error).toBeUndefined();
      expect(created).toBeDefined();
      await transaction.rollback();
    });

    it('should return error on try create', async () => {
      const transaction = await db.transaction();
      const data = {
        ...RequestSeed.data[0],
        latitude: undefined
      };

      delete data.key;

      const [created, error] = await requestService.create(data, { transaction });

      expect(error).toBeDefined();
      expect(created).toBeUndefined();
      await transaction.rollback();
    });
  });
  describe('should tested findAll requests', () => {

    it('should be search all requests in valid latitude', async () => {

      const transaction = await db.transaction();

      const createdUser = (
        await UserModel.create({
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074021',
          email: 'lucas@teste.com'
        }, { transaction })
      ).toJSON();

      await RequestModel.create(
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'testando agora',
          latitude: '-22.849198',
          longitude: '-47.083815',
          voluntary_user_account_key: createdUser.key,
          status: RequestStatus.accepted
        }, { transaction }
      )

      const [requests, metadata] = await requestService.findAll(createdUser.key, { transaction });

      expect(requests).toBeDefined();
      expect(requests.length > 0).toBe(true);
      await transaction.rollback();

    });
  })

  describe('should tested findVoluntary', () => {

    it('should be return a valid requests within latitude and longitude ranges', async () => {
      const transaction = await db.transaction();

      const bookUser = [
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074021',
          email: 'lucas@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074022',
          email: 'wiix@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074023',
          email: 'logged@teste.com'
        }
      ]
      const createdUser = (
        await UserModel.bulkCreate(bookUser, { transaction, returning: true })
      );

      const bookRequest = [
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'longe pra carai',
          latitude: '-22.907790',
          longitude: '-47.061943',
          user_account_key: createdUser[0].key,
          status: RequestStatus.searching
        },
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'perto',
          latitude: '-22.848232',
          longitude: '-47.085378',
          user_account_key: createdUser[1].key,
          status: RequestStatus.searching
        }
      ];

      await RequestModel.bulkCreate(bookRequest,
        { transaction }
      )

      const data: ISearchRequest = {
        user_account_key: createdUser[2].key,
        latitude: '-22.849802',
        longitude: '-47.083456',
        radius: 5000
      };

      const [requests, err] = await requestService.findVoluntary(data, { transaction });
      expect(err).toBeUndefined();
      expect(requests.length > 0).toBe(true);
      expect(requests[0].description).toEqual(bookRequest[1].description)
      await transaction.rollback();
    });

  });

  describe('should tested accept', () => {

    it('should be accepted a valid request', async () => {

      const transaction = await db.transaction();

      const bookUser = [
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074021',
          email: 'lucas@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074022',
          email: 'wiix@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074023',
          email: 'logged@teste.com'
        }
      ]
      const createdUser = (
        await UserModel.bulkCreate(bookUser, { transaction, returning: true })
      );

      const bookRequest = [
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'longe pra carai',
          latitude: '-22.907790',
          longitude: '-47.061943',
          user_account_key: createdUser[0].key,
          status: RequestStatus.searching
        },
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'perto',
          latitude: '-22.848232',
          longitude: '-47.085378',
          user_account_key: createdUser[1].key,
          status: RequestStatus.searching
        }
      ];

      const bookCreate = await RequestModel.bulkCreate(bookRequest,
        { transaction, returning: true }
      )

      const [accepted, err] = await requestService.accept({
        user_account_key: createdUser[2].key,
        key: bookCreate[1].key,
        latitude: bookCreate[1].latitude,
        longitude: bookCreate[1].longitude
      }, { transaction });

      expect(err).toBeUndefined();
      expect(accepted.key).toBe(bookCreate[1].key);
      await transaction.rollback();
    });

    it('should dont accept request because already has voluntary request', async () => {
      const transaction = await db.transaction();

      const bookUser = [
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074021',
          email: 'lucas@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074022',
          email: 'wiix@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074023',
          email: 'logged@teste.com'
        }
      ]
      const createdUser = (
        await UserModel.bulkCreate(bookUser, { transaction, returning: true })
      );

      const bookRequest: Partial<IRequest>[] = [
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'longe pra carai',
          latitude: '-22.907790',
          longitude: '-47.061943',
          voluntary_user_account_key: createdUser[2].key,
          user_account_key: createdUser[0].key,
          status: RequestStatus.accepted
        },
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'perto',
          latitude: '-22.848232',
          longitude: '-47.085378',
          user_account_key: createdUser[1].key,
          status: RequestStatus.searching
        }
      ];

      const bookCreate = await RequestModel.bulkCreate(bookRequest,
        { transaction, returning: true }
      )

      const [, err] = await requestService.accept({
        user_account_key: createdUser[2].key,
        key: bookCreate[1].key,
        latitude: bookCreate[1].latitude,
        longitude: bookCreate[1].longitude
      }, { transaction });

      expect(err).toBeDefined();
      expect(err.code).toBe(ErrorCodes.IS_VOLUNTARY_ERROR);

      await transaction.rollback();
    });

    it('should be failed because cant find request', async () => {
      const transaction = await db.transaction();

      const bookUser = [
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074021',
          email: 'lucas@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074022',
          email: 'wiix@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074023',
          email: 'logged@teste.com'
        }
      ]
      const createdUser = (
        await UserModel.bulkCreate(bookUser, { transaction, returning: true })
      );

      const bookRequest: Partial<IRequest>[] = [
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'longe pra carai',
          latitude: '-22.907790',
          longitude: '-47.061943',
          user_account_key: createdUser[0].key,
          status: RequestStatus.searching
        },
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'perto',
          latitude: '-22.848232',
          longitude: '-47.085378',
          user_account_key: createdUser[1].key,
          status: RequestStatus.searching
        }
      ];

      const bookCreate = await RequestModel.bulkCreate(bookRequest,
        { transaction, returning: true }
      )

      const [, err] = await requestService.accept({
        user_account_key: createdUser[2].key,
        key: '12332',
        latitude: bookCreate[1].latitude,
        longitude: bookCreate[1].longitude
      }, { transaction });

      expect(err).toBeDefined();
      expect(err.code).toBe(ErrorCodes.REQUEST_NOT_FOUND);

      await transaction.rollback();
    });


  });

  describe('should be tested finish request', async () => {

    it('should be finish a valid request', async () => {

      const transaction = await db.transaction();

      const bookUser = [
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074021',
          email: 'lucas@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074022',
          email: 'wiix@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074023',
          email: 'logged@teste.com'
        }
      ]
      const createdUser = (
        await UserModel.bulkCreate(bookUser, { transaction, returning: true })
      );

      const bookRequest: Partial<IRequest>[] = [
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'longe pra carai',
          latitude: '-22.907790',
          longitude: '-47.061943',
          user_account_key: createdUser[0].key,
          voluntary_user_account_key: createdUser[2].key,
          status: RequestStatus.accepted
        },
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'perto',
          latitude: '-22.848232',
          longitude: '-47.085378',
          user_account_key: createdUser[1].key,
          status: RequestStatus.searching
        }
      ];

      const requestBookCreate = await RequestModel.bulkCreate(bookRequest,
        { transaction, returning: true }
      )

      const [finished, err] = await requestService.finishRequest({
        user_account_key: createdUser[2].key,
        key: requestBookCreate[0].key,
        latitude: requestBookCreate[0].latitude,
        longitude: requestBookCreate[0].longitude
      }, { transaction });

      expect(err).toBeUndefined();
      expect(finished.key).toBe(requestBookCreate[0].key);

      await transaction.rollback();
    })

    it('should be cant finished request because is a invalid status', async () => {
      const transaction = await db.transaction();

      const bookUser = [
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074021',
          email: 'lucas@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074022',
          email: 'wiix@teste.com'
        },
        {
          ...UserSeed.data[0],
          key: undefined,
          phone: '+5581984074023',
          email: 'logged@teste.com'
        }
      ]
      const createdUser = (
        await UserModel.bulkCreate(bookUser, { transaction, returning: true })
      );

      const bookRequest: Partial<IRequest>[] = [
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'longe pra carai',
          latitude: '-22.907790',
          longitude: '-47.061943',
          user_account_key: createdUser[0].key,
          status: RequestStatus.searching
        },
        {
          ...RequestSeed.data[0],
          key: undefined,
          description: 'perto',
          latitude: '-22.848232',
          longitude: '-47.085378',
          user_account_key: createdUser[1].key,
          status: RequestStatus.searching
        }
      ];

      const requestBookCreate = await RequestModel.bulkCreate(bookRequest,
        { transaction, returning: true }
      )

      const [, err] = await requestService.finishRequest({
        user_account_key: createdUser[2].key,
        key: requestBookCreate[0].key,
        latitude: requestBookCreate[0].latitude,
        longitude: requestBookCreate[0].longitude
      }, { transaction });

      expect(err).toBeDefined();
      expect(err.code).toBe(ErrorCodes.REQUEST_NOT_FOUND);


      await transaction.rollback();
    })

  });

})