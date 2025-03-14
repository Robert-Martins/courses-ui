import { Component, inject, model, ModelSignal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AlunoFormComponent } from '../../../molecules/forms/aluno-form/aluno-form.component';
import { AlunoService } from '../../../../../core/services/aluno.service';
import { Optional } from '../../../../../core/utils/optional';
import { Aluno } from '../../../../../core/models/aluno.model';
import { acceptTrueOrElse } from '../../../../../core/utils/functions';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

type AlunoFormDialogData = {
  alunoId?: number;
}

@Component({
  selector: 'app-aluno-form-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, AlunoFormComponent, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Formulário de Aluno</h2>
    <mat-dialog-content>
      <aluno-form [alunoForm]="alunoForm()"></aluno-form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-stroked-button color="warn" mat-dialog-close>Fechar</button>
      <button mat-flat-button color="primary" (click)="onClickSave()">Salvar</button>
    </mat-dialog-actions>
  `
})
export class AlunoFormDialogComponent implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<AlunoFormDialogComponent>);
  private readonly data = inject(MAT_DIALOG_DATA) as AlunoFormDialogData;

  public readonly alunoForm: ModelSignal<FormGroup> = model(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastrService: ToastrService,
    private readonly alunoService: AlunoService
  ) { }

  public ngOnInit(): void {
    Optional.ofNullable(this.data)
      .map((data) => data.alunoId)
      .ifPresentOrElse(
        (alunoId: number) => this.findById(alunoId),
        () => this.createAlunoForm()
      );
  }

  public onClickSave(): void {
    const form: FormGroup = this.alunoForm();
    acceptTrueOrElse(
      form.valid,
      () => this.saveAluno(form.value as Aluno),
      () => this.onFormInvalid(form)
    );
  }

  private saveAluno(aluno: Aluno): void {
    Optional.ofNullable(aluno.id)
      .ifPresentOrElse(
        () => this.updateAluno(aluno),
        () => this.createAluno(aluno)
      );
  }

  private createAluno(aluno: Aluno): void {
    this.alunoService.create(aluno)
      .subscribe(() => this.onPersistSuccess());
  }

  private updateAluno(aluno: Aluno): void {
    this.alunoService.update(aluno)
      .subscribe(() => this.onPersistSuccess());
  }

  private onPersistSuccess(): void {
    this.closeDialog();
    this.toastrService.success('Aluno salvo com sucesso!');
  }

  private onFormInvalid(form: FormGroup): void {
    form.markAllAsTouched();
  }

  private findById(alunoId: number): void {
    this.alunoService.findById(alunoId)
      .subscribe((aluno) => this.createAlunoForm(aluno));
  }

  private createAlunoForm(aluno: Aluno = null): void {
    this.alunoForm.set(
      this.fb.group({
        id: [aluno?.id],
        nome: [aluno?.nome, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        cpf: [aluno?.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        dataNascimento: [aluno?.dataNascimento, [Validators.required]],
        situacao: [aluno?.situacao, [Validators.required]],
        cursoId: [aluno?.cursoId, [Validators.required]],
        createdAt: [{ value: aluno?.createdAt, disabled: true }],
        updatedAt: [{ value: aluno?.updatedAt, disabled: true }]
      })
    );
  }

  private closeDialog(): void {
    this.dialogRef.close(true);
  }

}
