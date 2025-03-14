import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlunoFilterComponent } from "../../shared/components/molecules/forms/aluno-filter/aluno-filter.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlunoFilter, Page } from '../../core/types/types';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../shared/components/services/local-storage.service';
import { AlunosListComponent } from "../../shared/components/molecules/lists/alunos-list/alunos-list.component";
import { Aluno } from '../../core/models/aluno.model';
import { AlunoService } from '../../core/services/aluno.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlunoFormDialogComponent } from '../../shared/components/organisms/dialogs/aluno-form-dialog/aluno-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alunos',
  imports: [AlunoFilterComponent, AlunosListComponent, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss'
})
export class AlunosComponent implements OnInit, OnDestroy {

  private readonly ALUNO_FILTER_CACHE_KEY: string = 'ALUNO_FILTER';
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  public alunos: Page<Aluno> = null;
  public filterForm: FormGroup = null;
  public page: number = 0;
  public size: number = 10;

  constructor(
      private readonly localStorageService: LocalStorageService,
      private readonly fb: FormBuilder,
      private readonly dialog: MatDialog,
      private readonly alunoService: AlunoService
    ) { }

  public ngOnInit(): void {
    this.checkCache();
    this.findAllAlunos();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onClickAdd(): void {
    this.openFormDialog();
  }

  public onClickEdit(id: any): void {
    this.openFormDialog(id);
  }

  public applyFilter(): void {
    this.page = 0;
    this.findAllAlunos();
  }

  public clearFilter(): void {
    this.filterForm.reset();
    this.applyFilter();
  }

  public onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.findAllAlunos();
  }

  private findAllAlunos(): void {
    const filter: AlunoFilter = this.filterForm.value;
  
    this.alunoService.findAll(this.page, this.size, 'id,desc', filter)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: Page<Aluno>) => this.alunos = data,
        error: () => this.alunos = null,
      });
  }

  private openFormDialog(alunoId: number = null): void {
    this.dialog.open(
      AlunoFormDialogComponent,
      {
        width: '400px',
        data: {
          alunoId
        }
      }
    )
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((bool: boolean) => bool && this.findAllAlunos());
  }

  private checkCache(): void {
    const cache: AlunoFilter = this.localStorageService.getItem(this.ALUNO_FILTER_CACHE_KEY);
    this.createForm(cache);
    this.cacheOnFormChanges();
  }

  private createForm(alunoFilter: AlunoFilter = null): void {
    this.filterForm = this.fb.group({
      id: [alunoFilter?.id],
      nome: [alunoFilter?.nome],
      cpf: [alunoFilter?.cpf],
      situacao: [alunoFilter?.situacao],
      cursoId: [alunoFilter?.cursoId]
    });
  }

  private cacheOnFormChanges(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((formValue: AlunoFilter) => 
        this.localStorageService.setItem(this.ALUNO_FILTER_CACHE_KEY, formValue));
  }
}