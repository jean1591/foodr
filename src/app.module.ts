import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from '@frameworks/web/nestjs/routes/routes.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ControllersModule,
  ],
})
export class AppModule {}
