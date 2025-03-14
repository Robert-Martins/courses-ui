import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApplicationService } from '../../../../../core/services/application.service';
import { Enum } from '../../../../../core/types/types';
import { ENUMS_NAMES } from '../../../../../core/consts/consts';
import { Optional } from '../../../../../core/utils/optional';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'aluno-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent {

  private _created: boolean = false;

  public readonly alunoSituacoes$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public readonly alunoForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input()
  public set alunoForm(value: FormGroup) {
    this.alunoForm$.next(value);
    this.created = value;
  }

  constructor(
    private readonly applicationService: ApplicationService
  ) { }

  public get created(): boolean {
    return this._created;
  }

  public set created(value: FormGroup) {
    this._created = Optional.ofNullable(value)
      .map((form) => form.get('id'))
      .map(id => id.value)
      .isPresent();
  }

  public ngOnInit(): void {
    this.loadEnums();
  }

  private loadEnums(): void {
    this.applicationService.findEnumByName(ENUMS_NAMES.SituacaoAluno)
      .subscribe((alunoSituacoes: Enum[]) => this.alunoSituacoes$.next(alunoSituacoes));
  }

}
