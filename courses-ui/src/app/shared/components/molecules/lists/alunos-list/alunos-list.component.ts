import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Aluno } from '../../../../../core/models/aluno.model';
import { MatTableModule } from '@angular/material/table';
import { ApplicationService } from '../../../../../core/services/application.service';
import { Enum } from '../../../../../core/types/types';
import { ENUMS_NAMES } from '../../../../../core/consts/consts';
import { Optional } from '../../../../../core/utils/optional';
import { MatIconModule } from '@angular/material/icon';
import { AlunoService } from '../../../../../core/services/aluno.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '../../../../pipes/pipes.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'alunos-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, PipesModule],
  templateUrl: './alunos-list.component.html',
  styleUrl: './alunos-list.component.scss'
})
export class AlunosListComponent implements OnInit {

  public readonly displayedColumns: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'situacao', 'createdAt', 'acoes'];

  public readonly alunoSituacoes$: BehaviorSubject<Enum[]> = new BehaviorSubject<Enum[]>(null);

  public readonly alunos$: BehaviorSubject<Aluno[]> = new BehaviorSubject<Aluno[]>(null);

  @Input()
  public set alunos(value: Aluno[]) {
    this.alunos$.next(value);
  }

  @Output()
  public readonly onEdit: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public readonly reload: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly toastrService: ToastrService,
    private readonly alunoService: AlunoService
  ) { }

  public ngOnInit(): void {
    this.loadEnums();
  }

  public findDescriptionFromValue(value: string): string {
    return Optional.ofNullable(value)
      .map((value: string) => this.alunoSituacoes$.value.find((alunoSituacao: Enum) => alunoSituacao.name === value))
      .map((alunoSituacao: Enum) => alunoSituacao.description)
      .orElse(null);
  }

  public onClickEdit(id: number): void {
    this.onEdit.emit(id);
  }

  public onClickDelete(id: number): void {
    this.alunoService.delete(id)
      .subscribe(() => {
        this.reload.emit();
        this.toastrService.success('Aluno excluído com sucesso!');
      });
  }

  private loadEnums(): void {
    this.applicationService.findEnumByName(ENUMS_NAMES.SituacaoAluno)
      .subscribe((alunoSituacoes: Enum[]) => this.alunoSituacoes$.next(alunoSituacoes));
  }

}
