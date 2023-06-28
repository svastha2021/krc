import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousVitalComponent } from './previous-vital.component';

describe('PreviousVitalComponent', () => {
  let component: PreviousVitalComponent;
  let fixture: ComponentFixture<PreviousVitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousVitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
