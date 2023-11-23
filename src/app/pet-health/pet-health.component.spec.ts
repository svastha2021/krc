import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHealthComponent } from './pet-health.component';

describe('PetHealthComponent', () => {
  let component: PetHealthComponent;
  let fixture: ComponentFixture<PetHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetHealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
