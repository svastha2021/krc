import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTreatmentComponent } from './pet-treatment.component';

describe('PetTreatmentComponent', () => {
  let component: PetTreatmentComponent;
  let fixture: ComponentFixture<PetTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetTreatmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
