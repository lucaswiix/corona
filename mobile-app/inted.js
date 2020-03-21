import Twilio from 'twilio';

const SID = 'VA6d6f6a261ac06ad6d31d58f0b71ad03f	';
const AUTH_TOKEN = 'f97f78035815ac7e2845a084f5154f46';

export const TwilioService = ({ twilio = getInstance() } = {}) => ({
  async sendToken(phone, options) {
    try {
      const verification = await twilio.verify
        .services(getServiceSID('auth'))
        .verifications.create({ to: phone, channel: 'sms' });

      return [verification, undefined];
    } catch (e) {
      return [undefined, e];
    }
  },

  async checkToken(phone, code, options) {
    try {
      const verification_check = await twilio.verify
        .services(SID)
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

export const getNumber = () => {
  const number = (GlobalConfig.TWILIO_NUMBER || '').trim();
  if (!number) {
    throw new Error('Missing Twillio Number');
  }
  return number;
};

export const getServiceSID = (serviceName) => {
  const TwilioServices = {
    auth: () => (SID || '').trim(),
    default: () => new Error('Missing Twillio Service name'),
  };

  return (
    TwilioServices[serviceName.toLowerCase()] || TwilioServices.default
  )();
};

export const getInstance = () => {
  return Twilio(SID, AUTH_TOKEN);
};
