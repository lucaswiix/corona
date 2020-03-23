import Twilio from 'twilio';
import GlobalConfig from '../config/GlobalConfig';
import { ApplicationError } from '../error/Types';
import { INVALID_TOKEN } from './Errors';

export interface ITwilioService {
  sendToken(
    phone: string,
  ): Promise<[string, ApplicationError]>;
  checkToken(
    phone: string,
    code: string,
  ): Promise<[string, ApplicationError]>;
}

export const TwilioService = ({ twilio = getInstance() } = {}) =>
  Object.freeze<ITwilioService>({
    async sendToken(phone: string) {

      try {
        const verification = await twilio.verify
          .services(getServiceSID('auth'))
          .verifications.create({ to: phone, channel: 'sms' });

        return [verification, undefined];
      } catch (e) {
        return [undefined, e];
      }
    },

    async checkToken(phone: string, code: string) {
      try {
        const verification_check = await twilio.verify
          .services(GlobalConfig.TWILIO_AUTH_SERVICE_SID)
          .verificationChecks.create({ to: phone, code });

        if (verification_check.status !== 'approved') {
          return [verification_check.status, INVALID_TOKEN()];
        }
        return [verification_check.status, undefined];
      } catch (error) {
        return [undefined, error];
      }
    },
  });

export const getNumber = (): string => {
  const number = (GlobalConfig.TWILIO_NUMBER || '').trim();
  if (!number) {
    throw new Error('Missing Twillio Number');
  }
  return number;
};

export const getServiceSID = (serviceName: string): string => {
  const TwilioServices = {
    auth: () => (GlobalConfig.TWILIO_AUTH_SERVICE_SID || '').trim(),
    default: () => new Error('Missing Twillio Service name'),
  };

  return (
    TwilioServices[serviceName.toLowerCase()] || TwilioServices.default
  )();
};

export const getInstance = (): any => {
  return Twilio(
    GlobalConfig.TWILIO_ACCOUNT_SID,
    GlobalConfig.TWILIO_AUTH_TOKEN
  );
};
