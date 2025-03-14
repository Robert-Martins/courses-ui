import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoFilterComponent } from './aluno-filter.component';

describe('AlunoFilterComponent', () => {
  let component: AlunoFilterComponent;
  let fixture: ComponentFixture<AlunoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
