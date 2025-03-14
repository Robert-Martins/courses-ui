import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from './forms/forms.module';
import { ListsModule } from './lists/lists.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ListsModule
  ],
  exports: [
    FormsModule,
    ListsModule
  ]
})
export class MoleculesModule { }
