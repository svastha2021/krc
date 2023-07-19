import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveRefractionComponent } from './objective-refraction.component';

describe('ObjectiveRefractionComponent', () => {
  let component: ObjectiveRefractionComponent;
  let fixture: ComponentFixture<ObjectiveRefractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectiveRefractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectiveRefractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
