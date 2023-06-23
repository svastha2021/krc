import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientScheduleTableComponent } from './patient-schedule-table.component';

describe('PatientScheduleTableComponent', () => {
  let component: PatientScheduleTableComponent;
  let fixture: ComponentFixture<PatientScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientScheduleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
