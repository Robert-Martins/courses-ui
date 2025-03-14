import { Component, inject, model, ModelSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CursoFormComponent } from '../../../molecules/forms/curso-form/curso-form.component';
import { CursoService } from '../../../../../core/services/curso.service';
import { Optional } from '../../../../../core/utils/optional';
import { Curso } from '../../../../../core/models/curso.model';
import { acceptTrueOrElse } from '../../../../../core/utils/functions';
import { MatButtonModule } from '@angular/material/button';

type CursoFormDialogData = {
  cursoId?: number;
}

@Component({
  selector: 'app-curso-form-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, CursoFormComponent, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Formulário de Curso</h2>
    <mat-dialog-content>
      <curso-form [cursoForm]="cursoForm()"></curso-form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-stroked-button color="warn" mat-dialog-close>Fechar</button>
      <button mat-flat-button color="primary" (click)="onClickSave()">Salvar</button>
    </mat-dialog-actions>
  `
})
export class CursoFormDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<CursoFormDialogComponent>);
  private readonly data = inject(MAT_DIALOG_DATA) as CursoFormDialogData;
  
  public readonly cursoForm: ModelSignal<FormGroup> = model(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly cursoService: CursoService
  ) { }

  public ngOnInit(): void {
    Optional.ofNullable(this.data)
      .map((data) => data.cursoId)
      .ifPresentOrElse(
        (cursoId: number) => this.findById(cursoId),
        () => this.createCursoForm()
      );
  }

  public onClickSave(): void {
    const form: FormGroup = this.cursoForm();
    acceptTrueOrElse(
      form.valid,
      () => this.saveCurso(form.value as Curso),
      () => this.onFormInvalid(form)
    );
  }

  private saveCurso(curso: Curso): void {
    Optional.ofNullable(curso.id)
      .ifPresentOrElse(
        () => this.updateCurso(curso),
        () => this.createCurso(curso)
      );
  }

  private createCurso(curso: Curso): void {
    this.cursoService.create(curso)
      .subscribe(() => this.onPersistSuccess());
  }

  private updateCurso(curso: Curso): void {
    this.cursoService.update(curso)
      .subscribe(() => this.onPersistSuccess());
  }

  private onPersistSuccess(): void {
    this.closeDialog();
  }

  private onFormInvalid(form: FormGroup): void {
    form.markAllAsTouched();
  }

  private findById(cursoId: number): void {
    this.cursoService.findById(cursoId)
      .subscribe((curso) => this.createCursoForm(curso));
  }

  private createCursoForm(curso: Curso = null): void {
    this.cursoForm.set(
      this.fb.group({
        id: [curso?.id],
        nome: [curso?.nome, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        inicioAulas: [curso?.inicioAulas, [Validators.required]],
        fimAulas: [curso?.fimAulas, [Validators.required]],
        ativo: [curso?.ativo],
        createdAt: [{ value: curso?.createdAt, disabled: true }],
        updatedAt: [{ value: curso?.updatedAt, disabled: true }]
      })
    );
  }

  private closeDialog(): void {
    this.dialogRef.close(true);
  }

}
