// Import the core libraries
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// Import the custom files
import { DbEnum } from "@/enum/config.enum";
import { loadConfig } from "@/utils/config.loader";


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

