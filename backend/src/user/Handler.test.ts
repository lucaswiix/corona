import axios from 'axios';
import globalConfig from '../config/GlobalConfig';

describe('test Handler request', () => {

  it('should be authenticate user', async () => {
    const phone = '81984074021';
    const data = await axios.post(`${globalConfig.APP_HOST}/v1/user/auth`, {
      phone
    });

    expect(data).toBeDefined();
  });

});