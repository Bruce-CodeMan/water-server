import * as fs from "fs";
import * as path from "path";

import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DbEnum } from "@/enum/config.enum";

/**
 * Reads and parses environment files, merging the default and environment-specific configurations.
 * @returns An object representing the parsed and combined environment variables.
 */
function loadConfig(): Record<string, any> {
  const basePath = process.cwd();
  const defaultEnvPath = path.resolve(basePath, ".env");
  const environment = process.env.NODE_ENV || `development`;
  const envFilePath = path.resolve(basePath, `.env.${environment}`);

  let config = {};

  if(fs.existsSync(defaultEnvPath)) {
    Object.assign(config, dotenv.parse(fs.readFileSync(defaultEnvPath)))
  }
  if(fs.existsSync(envFilePath)) {
    Object.assign(config, dotenv.parse(fs.readFileSync(envFilePath)))
  }

  return config;
}

/**
 * Converts a string to a boolean or returns a default value.
 * @param value - The string to convert.
 * @param defaultValue - The default value to use if conversion fails.
 * @returns The boolean value or the default value.
 */
function parsePort(value: string | undefined, defaultValue: number): number {
  return value ? parseInt(value, 10) : defaultValue;
}

/**
 * Converts a string to a boolean or returns a default value.
 * @param value - The string to convert.
 * @param defaultValue - The default value to use if conversion fails.
 * @returns The boolean value or the default value.
 */
function parseBoolean(value: string | undefined, defaulValue: boolean): boolean {
  return value ? value === "true" : defaulValue;
}

// Load and combine environment configurations
const config = loadConfig();

export const connectionOptions: TypeOrmModuleOptions = {
  type: config[DbEnum.TYPE],
  host: config[DbEnum.HOST],
  port: parsePort(config[DbEnum.PORT], 3306),
  username: config[DbEnum.USERNAME],
  password: config[DbEnum.PASSWORD],
  database: config[DbEnum.DATABASE],
  entities: [`${__dirname}/../modules/**/*.entity.{ts,js}`],
  synchronize: parseBoolean(config[DbEnum.SYNC], false),
  logging: parseBoolean(config[DbEnum.LOGGING], false)
}

