import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppProdMapComponent } from './supp-prod-map.component';

describe('SuppProdMapComponent', () => {
  let component: SuppProdMapComponent;
  let fixture: ComponentFixture<SuppProdMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppProdMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppProdMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
