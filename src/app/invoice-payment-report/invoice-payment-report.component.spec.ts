import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePaymentReportComponent } from './invoice-payment-report.component';

describe('PatientHeaderComponent', () => {
  let component: InvoicePaymentReportComponent;
  let fixture: ComponentFixture<InvoicePaymentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePaymentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
