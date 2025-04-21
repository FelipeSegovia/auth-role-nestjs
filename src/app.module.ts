import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/env.validation';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './features/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
