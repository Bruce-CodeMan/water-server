import * as fs from "fs";

import * as dotenv from "dotenv";
import { ConfigEnum } from "@/enum/config.enum";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

function getEnv(env: string): Record<string, unknown> {
  if(fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {}
}

function buildConnectionOptions() {
  const defaultConfig = getEnv(".env");
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || `development`}`);
  const config = {...defaultConfig, ...envConfig};

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSPORT],
    database: config[ConfigEnum.DB_DATABASE],
    entities: [`${__dirname}/src/modules/**/*.entity.{ts,js}`],
    synchronize: config[ConfigEnum.DB_SYNC],
    logging: config[ConfigEnum.DB_LOGGING]
  } as TypeOrmModuleOptions;
}

export const connectionOptions = buildConnectionOptions();

export default new DataSource({
  ...connectionOptions,
  migrations: ["src/migrations/*"],
  subscribers: []
} as DataSourceOptions);