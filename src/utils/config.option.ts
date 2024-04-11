import { ConfigModuleOptions } from "@nestjs/config";
import { loadConfig } from "./config.loader";

const config = loadConfig()

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [() => config]
}