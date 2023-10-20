import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDiagnosisComponent } from './pet-diagnosis.component';

describe('PetDiagnosisComponent', () => {
  let component: PetDiagnosisComponent;
  let fixture: ComponentFixture<PetDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetDiagnosisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
