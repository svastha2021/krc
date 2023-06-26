import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousLabComponent } from './previous-lab.component';

describe('PreviousLabComponent', () => {
  let component: PreviousLabComponent;
  let fixture: ComponentFixture<PreviousLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
