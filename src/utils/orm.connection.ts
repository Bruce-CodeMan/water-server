import * as fs from "fs";
import * as path from "path";

import * as dotenv from "dotenv";
import { DbEnum } from "@/enum/config.enum";
import { DataSourceOptions, DataSource } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


function getEnv(envFilePath: string): Record<string, any> {
  const envPath = path.resolve(process.cwd(), envFilePath);
  if(fs.existsSync(envPath)) {
    return dotenv.parse(fs.readFileSync(envPath))
  }
  return {}
} 

function getBooleanValue(value: string): boolean {
  return value === "true";
}

function buildConnectionOptions() {
  const defaultConfig = getEnv(".env");
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || `development`}`);
  const config = {...defaultConfig, ...envConfig};

  const dbPort = config[DbEnum.PORT] ? parseInt(config[DbEnum.PORT], 3306): undefined;

  return {
    type: config[DbEnum.TYPE],
    host: config[DbEnum.HOST],
    port: dbPort,
    username: config[DbEnum.USERNAME],
    password: config[DbEnum.PASSWORD],
    database: config[DbEnum.DATABASE],
    entities: [`${__dirname}/../modules/**/*.entity.{ts,js}`],
    synchronize: getBooleanValue(config[DbEnum.SYNC]),
    logging: getBooleanValue(config[DbEnum.LOGGING])
  } as TypeOrmModuleOptions;
}

export const connectionOptions = buildConnectionOptions();

export default new DataSource({
  ...connectionOptions,
  migrations: [`${__dirname}/../migrations/*`],
  subscribers: []
} as DataSourceOptions)