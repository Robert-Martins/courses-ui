import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosListComponent } from './alunos-list/alunos-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlunosListComponent
  ],
  exports: [
    AlunosListComponent
  ]
})
export class ListsModule { }
