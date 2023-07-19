import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAcceptanceComponent } from './subject-acceptance.component';

describe('SubjectAcceptanceComponent', () => {
  let component: SubjectAcceptanceComponent;
  let fixture: ComponentFixture<SubjectAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectAcceptanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
