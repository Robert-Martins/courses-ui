import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosListComponent } from './alunos-list/alunos-list.component';
import { CursosListComponent } from './cursos-list/cursos-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlunosListComponent,
    CursosListComponent
  ],
  exports: [
    AlunosListComponent,
    CursosListComponent
  ]
})
export class ListsModule { }
