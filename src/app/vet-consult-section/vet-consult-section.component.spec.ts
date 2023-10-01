import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetConsultSectionComponent } from './vet-consult-section.component';

describe('VetConsultSectionComponent', () => {
  let component: VetConsultSectionComponent;
  let fixture: ComponentFixture<VetConsultSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetConsultSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetConsultSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
