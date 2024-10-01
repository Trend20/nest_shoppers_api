import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../common/config/ormConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule,
    TypeOrmModule.forRoot(ormConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
