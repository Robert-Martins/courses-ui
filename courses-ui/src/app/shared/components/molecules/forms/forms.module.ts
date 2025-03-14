import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoFilterComponent } from './aluno-filter/aluno-filter.component';
import { CursoFilterComponent } from './curso-filter/curso-filter.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlunoFilterComponent,
    CursoFilterComponent
  ],
  exports: [
    AlunoFilterComponent,
    CursoFilterComponent
  ]
})
export class FormsModule { }
