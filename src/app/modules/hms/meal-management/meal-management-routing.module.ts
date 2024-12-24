import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodCategoryComponent } from './food-category/food-category.component';
import { FoodItemComponent } from './food-item/food-item.component';


const routes: Routes = [
  { path: 'food-category', component: FoodCategoryComponent },
  { path: 'food-item', component: FoodItemComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealManagementRoutingModule { }
