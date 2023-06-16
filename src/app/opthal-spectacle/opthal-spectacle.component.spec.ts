import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpthalSpectacleComponent } from './opthal-spectacle.component';

describe('OpthalSpectacleComponent', () => {
  let component: OpthalSpectacleComponent;
  let fixture: ComponentFixture<OpthalSpectacleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpthalSpectacleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpthalSpectacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
