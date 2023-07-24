import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisAndAdviceComponent } from './diagnosis-and-advice.component';

describe('DiagnosisAndAdviceComponent', () => {
  let component: DiagnosisAndAdviceComponent;
  let fixture: ComponentFixture<DiagnosisAndAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisAndAdviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisAndAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
