import { Recipe } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "Test Recipe1",
      "This is a test1",
      "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg",
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      "Test Recipe2",
      "This is a test2",
      "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg",
      [
        new Ingredient('Bread', 2),
        new Ingredient('Meat', 2)
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();//copy array
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
