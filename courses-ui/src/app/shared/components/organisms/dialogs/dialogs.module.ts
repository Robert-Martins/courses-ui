import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoFormDialogComponent } from './aluno-form-dialog/aluno-form-dialog.component';
import { CursoFormDialogComponent } from './curso-form-dialog/curso-form-dialog.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlunoFormDialogComponent,
    CursoFormDialogComponent
  ],
  exports: [
    AlunoFormDialogComponent,
    CursoFormDialogComponent
  ]
})
export class DialogsModule { }
