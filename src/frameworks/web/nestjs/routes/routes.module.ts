import { ContractsRoute } from './contracts.route';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [],
  controllers: [ContractsRoute],
})
export class ControllersModule {}
