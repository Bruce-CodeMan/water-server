import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the libraries from the external
import { config } from "dotenv";
import { connectionOptions } from 'ormconfig';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => config({ path: '.env' })]
    }),
    TypeOrmModule.forRoot(connectionOptions)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
