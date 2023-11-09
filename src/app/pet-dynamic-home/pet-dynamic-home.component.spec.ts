import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDynamicHomeComponent } from './pet-dynamic-home.component';

describe('PetDynamicHomeComponent', () => {
  let component: PetDynamicHomeComponent;
  let fixture: ComponentFixture<PetDynamicHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetDynamicHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetDynamicHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
