import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetVitalParameterComponent } from './pet-vital-parameter.component';

describe('PetVitalParameterComponent', () => {
  let component: PetVitalParameterComponent;
  let fixture: ComponentFixture<PetVitalParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetVitalParameterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetVitalParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
