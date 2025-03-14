import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Curso } from '../../../../../core/models/curso.model';
import { CursoService } from '../../../../../core/services/curso.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '../../../../pipes/pipes.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cursos-list',
    imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, PipesModule],
  templateUrl: './cursos-list.component.html',
  styleUrl: './cursos-list.component.scss'
})
export class CursosListComponent {

  public readonly displayedColumns: string[] = ['id', 'nome', 'inicioAulas', 'fimAulas', 'ativo', 'createdAt', 'acoes'];

  public readonly cursos$: BehaviorSubject<Curso[]> = new BehaviorSubject<Curso[]>(null);

  @Input()
  public set cursos(value: Curso[]) {
    this.cursos$.next(value);
  }

  @Output()
  public readonly onEdit: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public readonly reload: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private readonly toastrService: ToastrService,
    private readonly cursoService: CursoService
  ) { }

  public onClickEdit(id: number): void {
    this.onEdit.emit(id);
  }

  public onClickDelete(id: number): void {
    this.cursoService.delete(id)
      .subscribe(() => {
        this.reload.emit();
        this.toastrService.success('Curso excluído com sucesso!');
      });
  }
}
