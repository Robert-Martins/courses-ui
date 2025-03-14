import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CursoFilter, Page } from '../../core/types/types';
import { Curso } from '../../core/models/curso.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../shared/components/services/local-storage.service';
import { CursoService } from '../../core/services/curso.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CursoFilterComponent } from '../../shared/components/molecules/forms/curso-filter/curso-filter.component';
import { CursosListComponent } from '../../shared/components/molecules/lists/cursos-list/cursos-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CursoFormDialogComponent } from '../../shared/components/organisms/dialogs/curso-form-dialog/curso-form-dialog.component';

@Component({
  selector: 'app-cursos',
  imports: [CursoFilterComponent, CursosListComponent, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit, OnDestroy {

  private readonly CURSO_FILTER_CACHE_KEY: string = 'CURSO_FILTER';
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  public cursos: Page<Curso> = null;
  public filterForm: FormGroup = null;
  public page: number = 0;
  public size: number = 10;

  constructor(
      private readonly localStorageService: LocalStorageService,
      private readonly fb: FormBuilder,
      private readonly dialog: MatDialog,
      private readonly cursoService: CursoService
    ) { }

  public ngOnInit(): void {
    this.checkCache();
    this.findAllCursos();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onClickAdd(): void {
    this.dialog.open(
      CursoFormDialogComponent,
      {
        width: '400px'
      }
    )
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((bool: boolean) => bool && this.findAllCursos());
  }

  public applyFilter(): void {
    this.page = 0;
    this.findAllCursos();
  }

  public clearFilter(): void {
    this.filterForm.reset();
    this.applyFilter();
  }

  public onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.findAllCursos();
  }

  private findAllCursos(): void {
    const filter: CursoFilter = this.filterForm.value;
  
    this.cursoService.findAll(this.page, this.size, 'id,asc', filter)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: Page<Curso>) => this.cursos = data,
        error: () => this.cursos = null,
      });
  }

  private checkCache(): void {
    const cache: CursoFilter = this.localStorageService.getItem(this.CURSO_FILTER_CACHE_KEY);
    this.createForm(cache);
    this.cacheOnFormChanges();
  }

  private createForm(alunoFilter: CursoFilter = null): void {
    this.filterForm = this.fb.group({
      id: [alunoFilter?.id],
      nome: [alunoFilter?.nome],
      inicioAulas: [alunoFilter?.inicioAulas],
      fimAulas: [alunoFilter?.fimAulas],
      ativo: [alunoFilter?.ativo],
    });
  }

  private cacheOnFormChanges(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((formValue: CursoFilter) => 
        this.localStorageService.setItem(this.CURSO_FILTER_CACHE_KEY, formValue));
  }
}
