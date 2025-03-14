import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Aluno } from '../models/aluno.model';
import { Observable } from 'rxjs';
import { AlunoFilter, Page } from '../types/types';
import { Optional } from '../utils/optional';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly ALUNO_API_PATH: string = 'alunos';

  private alunoApiUrl: string;

  constructor(
    private readonly httpClient: HttpClient
  ) { 
    this.alunoApiUrl = `${environment.apiUrl}/${this.ALUNO_API_PATH}`;
  }

  public create(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.alunoApiUrl, aluno);
  }

  public findAll(
    page: number = 0,
    size: number = 10,
    sort: string = 'id,desc',
    alunoFilter: AlunoFilter
  ): Observable<Page<Aluno>> {
    return this.httpClient.get<Page<Aluno>>(
      this.alunoApiUrl, 
      {
        params: {
          page: page.toString(),
          size: size.toString(),
          sort: sort,
          id: Optional.ofNullable(alunoFilter.id).map(id => id.toString()).orElse(''),
          nome: Optional.ofNullable(alunoFilter.nome).orElse(''),
          cpf: Optional.ofNullable(alunoFilter.cpf).orElse(''),
          situacao: Optional.ofNullable(alunoFilter.situacao).orElse(''),
          cursoId: Optional.ofNullable(alunoFilter.cursoId).map(cursoId => cursoId.toString()).orElse('')
        }
      }
    );
  }

  public findById(id: number): Observable<Aluno> {
    return this.httpClient.get<Aluno>(`${this.alunoApiUrl}/${id}`);
  }

  public update(aluno: Aluno): Observable<void> {
    return this.httpClient.put<void>(this.alunoApiUrl, aluno);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.alunoApiUrl}/${id}`);
  }

}
