import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/curso.model';
import { Observable } from 'rxjs';
import { CursoFilter, Page } from '../types/types';
import { Optional } from '../utils/optional';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private CURSO_API_PATH: string = 'cursos';

  private cursoApiUrl: string;

  constructor(
    private readonly httpClient: HttpClient
  ) { 
    this.cursoApiUrl = `${environment.apiUrl}/${this.CURSO_API_PATH}`;
  }

  public create(curso: Curso): Observable<Curso> {
    return this.httpClient.post<Curso>(this.cursoApiUrl, curso);
  }

  public findAll(
    page: number = 0,
    size: number = 10,
    sort: string = 'id,desc',
    cursoFilter: CursoFilter
  ): Observable<Page<Curso>> {
    return this.httpClient.get<Page<Curso>>(
      this.cursoApiUrl, 
      {
        params: {
          page: page.toString(),
          size: size.toString(),
          sort: sort,
          id: Optional.ofNullable(cursoFilter.id).map(id => id.toString()).orElse(''),
          nome: Optional.ofNullable(cursoFilter.nome).orElse(''),
          ativo: Optional.ofNullable(cursoFilter.ativo).map(ativo => ativo.toString()).orElse('')
        }
      }
    );
  }

  public findById(id: number): Observable<Curso> {
    return this.httpClient.get<Curso>(`${this.cursoApiUrl}/${id}`);
  }

  public update(curso: Curso): Observable<void> {
    return this.httpClient.put<void>(this.cursoApiUrl, curso);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.cursoApiUrl}/${id}`);
  }

}
