
import { RequestSeed } from '../test/seed';
import { validateRequest } from './ValidationRequest';

const { id, ...data } = RequestSeed.data[0];

describe('RequestsValidation', () => {
  it('should validate requests with no errors', () => {
    const [parsedData, err] = validateRequest(data);

    expect(err).toBeUndefined();
    expect(parsedData).toEqual(data);
  });

  it('should return error in validation', () => {
    const _data = {
      ...data,
      user_id: null,
      latitude: undefined
    };
    const [parsedData, err] = validateRequest(_data);

    expect(err).toBeDefined();
    expect(parsedData).toBeUndefined();
  });
});
