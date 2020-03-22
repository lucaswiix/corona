import { UserService } from './UserService';

const phone = '+5519982589820';
describe('UserService Testing', () => {
  it('should send token to phone', async () => {
    const mockedUserModelCount = jest.fn((data) => Promise.resolve(true))
    const mockedUserService = UserService({
      userModel: {
        count: mockedUserModelCount
      } as any
    });

    const [data, err] = await mockedUserService.sendToken(phone);
    expect(err).toBeUndefined();
    expect(mockedUserModelCount).toBeCalled();

  });
})