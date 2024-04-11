import * as fs from "fs";
import * as path from "path";

import * as dotenv from "dotenv";

/**
 * Reads and parses environment files, merging the default and environment-specific configurations.
 * @returns An object representing the parsed and combined environment variables.
 */
export function loadConfig(): Record<string, any> {
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