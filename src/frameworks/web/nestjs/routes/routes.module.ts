import { Module } from '@nestjs/common';
import { RecipesRoute } from './recipes.route';

@Module({
  imports: [],
  providers: [],
  controllers: [RecipesRoute],
})
export class ControllersModule {}
