import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'curso-filter',
  imports:[CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatRadioModule],
  templateUrl: './curso-filter.component.html',
  styleUrl: './curso-filter.component.scss'
})
export class CursoFilterComponent {

  public filterForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  @Input()
  public set filterForm(value: FormGroup) {
    this.filterForm$.next(value);
  }
  
}
