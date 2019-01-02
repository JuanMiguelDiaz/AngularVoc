import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectsComponent } from './subjects/subjects.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddItemComponent } from './add-item/add-item.component';


const routes: Routes = [
	{path: "", redirectTo: '/subjects', pathMatch: 'full'},
	{path: 'subjects', component: SubjectsComponent},
	{path: 'quiz/:id', component: QuizComponent},
	{path: 'addItem/:id', component:  AddItemComponent},
	//{path: 'editItem/:id', component:  AddItemComponent},
	{path: "**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [SubjectsComponent, PageNotFoundComponent, QuizComponent, AddItemComponent,]