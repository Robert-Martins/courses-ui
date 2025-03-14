import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoFormDialogComponent } from './curso-form-dialog.component';

describe('CursoFormDialogComponent', () => {
  let component: CursoFormDialogComponent;
  let fixture: ComponentFixture<CursoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
