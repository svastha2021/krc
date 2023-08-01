import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraOcularPressureComponent } from './intra-ocular-pressure.component';

describe('IntraOcularPressureComponent', () => {
  let component: IntraOcularPressureComponent;
  let fixture: ComponentFixture<IntraOcularPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraOcularPressureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntraOcularPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
