import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoFormComponent } from '../../molecules/forms/aluno-form/aluno-form.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlunoFormComponent
  ],
  exports: [
    AlunoFormComponent
  ]
})
export class DialogsModule { }
