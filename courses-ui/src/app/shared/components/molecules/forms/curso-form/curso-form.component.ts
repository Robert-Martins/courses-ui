import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'curso-form',
  imports: [],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss'
})
export class CursoFormComponent {

  public readonly cursoForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
  
  @Input()
  public set cursoForm(value: FormGroup) {
    this.cursoForm$.next(value);
  }

}
