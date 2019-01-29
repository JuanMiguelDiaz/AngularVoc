import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectsComponent } from './subjects/subjects.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
	//{path: "", redirectTo: '/subjects', pathMatch: 'full'},
	{path: "", pathMatch: 'full', component: LandingPageComponent},
	{path: 'subjects', component: SubjectsComponent},
	{path: 'quiz/:id', component: QuizComponent},
	{path: 'items/:subject', component: ItemListComponent},
	{path: 'addItem/:id', component:  AddItemComponent},
	{path: 'editItem/:subject/:id', component:  EditItemComponent},
	{path: "**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [SubjectsComponent, PageNotFoundComponent, QuizComponent, AddItemComponent, EditItemComponent, ItemListComponent, LandingPageComponent]