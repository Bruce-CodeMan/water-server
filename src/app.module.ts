import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the libraries from the external
import { config } from "dotenv";

// Import the custom files
import { connectionOptions } from '@/utils/orm.connection';
import { UserModule } from '@/modules/user/user.module';

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
