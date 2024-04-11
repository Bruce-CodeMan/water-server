import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the custom files
import { UserModule } from '@/modules';
import { configOptions, connectionOptions } from "@/utils";


@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRoot(connectionOptions),
    UserModule
  ]
})
export class AppModule {}
