import { Controller, Get, Param } from '@nestjs/common';
import { Recipe } from '@entities/entities';

import { RecipeRepository } from '@frameworks/db/in-memory/repositories';
import { RecipesController } from '@interface-adapters/controllers';

@Controller('recipes')
export class RecipesRoute {
  recipeRepository = new RecipeRepository();

  recipesController = new RecipesController(this.recipeRepository);

  @Get('/')
  async getRecipes(): Promise<Recipe[]> {
    return this.recipesController.getRecipes();
  }

  @Get('/:recipeId')
  async getRecipeById(@Param('recipeId') recipeId: string): Promise<Recipe> {
    return this.recipesController.getRecipeById(recipeId);
  }
}
