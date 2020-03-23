import { UserService } from './UserService';

const phone = '+5519982589820';
describe('UserService Testing', () => {
  it('should send token to phone', async () => {
    const mockedUserModelCount = jest.fn((data) => Promise.resolve(1))
    const mockedTwilioSendToken = jest.fn((phone) => Promise.resolve([{ text: 'dasdasd' }, undefined]))
    const mockedUserService = UserService({
      userModel: {
        count: mockedUserModelCount
      } as any,
      twilioService: {
        sendToken: mockedTwilioSendToken
      } as any
    });

    const [data, err] = await mockedUserService.sendToken(phone);
    expect(err).toBeUndefined();
    expect(mockedUserModelCount).toBeCalled();

  });
})