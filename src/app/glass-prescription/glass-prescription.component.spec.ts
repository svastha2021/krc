import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassPrescriptionComponent } from './glass-prescription.component';

describe('GlassPrescriptionComponent', () => {
  let component: GlassPrescriptionComponent;
  let fixture: ComponentFixture<GlassPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlassPrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
