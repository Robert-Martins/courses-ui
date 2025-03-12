import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoFilterComponent } from './aluno-filter/aluno-filter.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlunoFilterComponent
  ],
  exports: [
    AlunoFilterComponent
  ]
})
export class FormsModule { }
