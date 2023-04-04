import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlitLampComponent } from './slit-lamp.component';

describe('SlitLampComponent', () => {
  let component: SlitLampComponent;
  let fixture: ComponentFixture<SlitLampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlitLampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlitLampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
