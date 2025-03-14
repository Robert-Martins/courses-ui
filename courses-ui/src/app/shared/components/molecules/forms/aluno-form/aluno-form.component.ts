import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApplicationService } from '../../../../../core/services/application.service';
import { Enum } from '../../../../../core/types/types';
import { ENUMS_NAMES } from '../../../../../core/consts/consts';

@Component({
  selector: 'aluno-form',
  imports: [],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent {

  public readonly alunoSituacoes$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public readonly alunoForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input()
  public set alunoForm(value: FormGroup) {
    this.alunoForm$.next(value);
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
