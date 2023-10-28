import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetVisit360ViewComponent } from './pet-visit360-view.component';

describe('PetVisit360ViewComponent', () => {
  let component: PetVisit360ViewComponent;
  let fixture: ComponentFixture<PetVisit360ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetVisit360ViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetVisit360ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
