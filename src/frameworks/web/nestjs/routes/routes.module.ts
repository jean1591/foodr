import { ContractsRoute } from './contracts.route';
import { Module } from '@nestjs/common';
import { RecipesRoute } from './recipes.route';

@Module({
  imports: [],
  providers: [],
  controllers: [ContractsRoute, RecipesRoute],
})
export class ControllersModule {}
