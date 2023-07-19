import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentGlassPowerComponent } from './present-glass-power.component';

describe('PresentGlassPowerComponent', () => {
  let component: PresentGlassPowerComponent;
  let fixture: ComponentFixture<PresentGlassPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentGlassPowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentGlassPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
