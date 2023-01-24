import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMasterComponent } from './doctor-master.component';

describe('DoctorMasterComponent', () => {
  let component: DoctorMasterComponent;
  let fixture: ComponentFixture<DoctorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
