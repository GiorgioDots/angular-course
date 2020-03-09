import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Test Recipe1", "This is a test1", "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg"),
    new Recipe("Test Recipe2", "This is a test2", "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg"),
    new Recipe("Test Recipe3", "This is a test3", "https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg")
  ];

  constructor() { }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);

  }

  ngOnInit(): void {
  }

}
