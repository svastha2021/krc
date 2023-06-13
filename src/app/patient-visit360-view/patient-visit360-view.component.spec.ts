import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisit360ViewComponent } from './patient-visit360-view.component';

describe('PatientVisit360ViewComponent', () => {
  let component: PatientVisit360ViewComponent;
  let fixture: ComponentFixture<PatientVisit360ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVisit360ViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisit360ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
