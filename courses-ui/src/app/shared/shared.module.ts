import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class SharedModule { }
