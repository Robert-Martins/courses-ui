import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BehaviorSubject } from 'rxjs';
import { Optional } from '../../../../../core/utils/optional';

@Component({
  selector: 'curso-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatRadioModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss'
})
export class CursoFormComponent {

  private _created: boolean = false;

  public readonly cursoForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
  
  @Input()
  public set cursoForm(value: FormGroup) {
    this.cursoForm$.next(value);
    this.created = value;
  }

  public get created(): boolean {
    return this._created;
  }

  public set created(value: FormGroup) {
    this._created = Optional.ofNullable(value)
      .map((form) => form.get('id'))
      .map(id => id.value)
      .isPresent();
  }

}
