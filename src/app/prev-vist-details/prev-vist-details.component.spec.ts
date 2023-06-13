import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevVistDetailsComponent } from './prev-vist-details.component';

describe('PrevVistDetailsComponent', () => {
  let component: PrevVistDetailsComponent;
  let fixture: ComponentFixture<PrevVistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevVistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevVistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
