import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentTableComponent } from './appointment-table.component';

describe('AppoinmentTableComponent', () => {
  let component: AppoinmentTableComponent;
  let fixture: ComponentFixture<AppoinmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
