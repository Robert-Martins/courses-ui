import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Enum } from '../../../../../core/types/types';
import { ApplicationService } from '../../../../../core/services/application.service';
import { ENUMS_NAMES } from '../../../../../core/consts/consts';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'aluno-filter',
  imports:[CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, NgxMaskDirective],
  templateUrl: './aluno-filter.component.html',
  styleUrl: './aluno-filter.component.scss'
})
export class AlunoFilterComponent implements OnInit {

  public alunoSituacoes$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public filterForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input()
  public set filterForm(value: FormGroup) {
    this.filterForm$.next(value);
  }

  constructor(
    private readonly applicationService: ApplicationService
  ) { }

  public ngOnInit(): void {
    this.loadEnums();
  }

  private loadEnums(): void {
    this.applicationService.findEnumByName(ENUMS_NAMES.SituacaoAluno)
      .subscribe((alunoSituacoes: Enum[]) => this.alunoSituacoes$.next(alunoSituacoes));
  }

}
