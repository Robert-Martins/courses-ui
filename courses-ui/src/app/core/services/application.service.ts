import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Enum } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly APP_PATH: '/app';

  private appApiUrl: string;

  constructor(
    private readonly httpClient: HttpClient
  ) { 
    this.appApiUrl = `${environment.apiUrl}/${this.APP_PATH}`;
  }

  public health(): Observable<string> {
    return this.httpClient.get<string>(this.appApiUrl);
  }

  public findEnumByName(name: string): Observable<Enum> {
    return this.httpClient.get<Enum>(`${this.appApiUrl}/enums/${name}`);
  }

}
