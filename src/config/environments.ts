import 'dotenv/config';
import * as joi from 'joi';

interface IEnvsVars {
  PORT: number;
  DATABASE_URL: string;
}

const envsSchema = joi
  .object<IEnvsVars>({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: IEnvsVars = value;

export const envs = {
  port: envsVars.PORT,
  databaseUrl: envsVars.DATABASE_URL,
};
