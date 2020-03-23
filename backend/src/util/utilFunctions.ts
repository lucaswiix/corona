import { DEFAULT_EXPIRATION_TIME } from './Constants';

export const parsePhone = (phone: string) => {
  return phone.replace(/[^0-9+]/g, '');
}

export const newExp = (duration = DEFAULT_EXPIRATION_TIME): number => {
  return new Date().getTime() + duration;
}