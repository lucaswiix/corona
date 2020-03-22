import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import dotenv from 'dotenv';
import * as path from 'path';

// TODO: When everything is centered here, the dotenv will only be used here
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

if (process.env.NODE_ENV === 'test') {
  Object.assign(process.env, {
    SQL_PORT: '65432',
    SQL_USER: 'thor',
    SQL_DATABASE: 'livehere',
    SQL_PASSWORD: 'livehere',
    SQL_HOST: 'localhost',
    TWILIO_ACCOUNT_SID: 'AC092jfiowjg092opwe2309j1ioe2km320', // FAKE
    TWILIO_AUTH_TOKEN: '0923jri240gnr9384jitnoejwn092r3r', // FAKE
    TWILIO_NUMBER: '+16316512345', // FAKE,
    TWILIO_AUTH_SERVICE_SID: '0923jri240gnr9384jitnoejwn092r3r', // FAKE
  });
}

export interface IGlobalConfig {
  /* Application */
  NODE_ENV: 'production' | 'homologation' | 'development' | 'test',
  DEBUG: string,
  PORT: number,
  APP_HOST: string,
  HOST: string,

  /* Database */
  SQL_USER: string,
  SQL_PASSWORD: string,
  SQL_DATABASE: string,
  SQL_HOST: string,
  SQL_PORT: string,

  TWILIO_ACCOUNT_SID: string,
  TWILIO_AUTH_TOKEN: string;
  TWILIO_NUMBER: string;
  TWILIO_AUTH_SERVICE_SID: string;

  USER_JWT_SECRET: string,
  USER_JWT_EXPIRATION_TIME: number,

}

class GlobalConfigValidator implements IGlobalConfig {
  @IsNotEmpty()
  @IsString()
  NODE_ENV: 'production' | 'homologation' | 'development' | 'test';

  DEBUG: string;

  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  TWILIO_ACCOUNT_SID: string;

  @IsNotEmpty()
  @IsString()
  TWILIO_AUTH_TOKEN: string;

  @IsNotEmpty()
  @IsString()
  TWILIO_NUMBER: string;

  @IsNotEmpty()
  @IsString()
  TWILIO_AUTH_SERVICE_SID: string;

  @IsNotEmpty()
  @IsString()
  SQL_USER: string;

  @IsNotEmpty()
  @IsString()
  SQL_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  SQL_DATABASE: string;

  @IsNotEmpty()
  @IsString()
  SQL_HOST: string;

  @IsNotEmpty()
  @IsString()
  SQL_PORT: string;

  @IsNotEmpty()
  @IsString()
  APP_HOST: string;

  @IsNotEmpty()
  @IsString()
  HOST: string;

  @IsNotEmpty()
  @IsString()
  USER_JWT_SECRET: string;

  @IsNotEmpty()
  @IsNumber()
  USER_JWT_EXPIRATION_TIME: number;

}

const globalConfig = buildGlobalConfig();
export default globalConfig;

export function buildGlobalConfig({ optionalConf = null, throwErr = false } = {}) {
  const validator = new GlobalConfigValidator();
  const baseConf = {
    ...optionalConf,
    ...process.env,
  };
  const conf: Readonly<IGlobalConfig> = Object.freeze({
    ...baseConf,
    NODE_ENV: String(baseConf.NODE_ENV).toLowerCase(),
    PORT: Number(baseConf.PORT),
    SQL_USER: baseConf.SQL_USER,
    USER_JWT_EXPIRATION_TIME: Number(baseConf.USER_JWT_EXPIRATION_TIME),
  });
  Object.assign(validator, conf);

  const errors = validateSync(validator, { forbidUnknownValues: false });
  if (errors.length) {
    const errListFmt = errors.map(({ property, constraints }) => ({ property, constraints }));
    const err = Error(JSON.stringify(errListFmt));
    if (throwErr) {
      throw err;
    } else {
      console.warn(err);
    }
  }
  return conf;
}

function tryParse(val) {
  try {
    if (typeof val === 'string') {
      return JSON.parse(val);
    }
    return val;
  } catch (e) {
    return val;
  }
}
