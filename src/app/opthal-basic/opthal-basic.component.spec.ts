import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpthalBasicComponent } from './opthal-basic.component';

describe('OpthalBasicComponent', () => {
  let component: OpthalBasicComponent;
  let fixture: ComponentFixture<OpthalBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpthalBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpthalBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
