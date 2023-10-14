import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetConsulationComponent } from './pet-consulation.component';

describe('PetConsulationComponent', () => {
  let component: PetConsulationComponent;
  let fixture: ComponentFixture<PetConsulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetConsulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetConsulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
