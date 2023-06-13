import { FunctionCall } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AptBookingComponent } from './apt-booking/apt-booking.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { DocConsultationComponent } from './doc-consultation/doc-consultation.component';
import { BillingComponent } from './billing/billing.component';
import { PaymentComponent } from './payment/payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { InvoicePrintComponent } from './invoice-print/invoice-print.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PatientwiseReportComponent } from './patientwise-report/patientwise-report.component';
import { CollectionwiseReportComponent } from './collectionwise-report/collectionwise-report.component';
import { OutstantingInvwiseComponent } from './outstanting-invwise/outstanting-invwise.component';
import { OutstantingPtwiseComponent } from './outstanting-ptwise/outstanting-ptwise.component';
import { SupplierMasterComponent } from './supplier/supplier-master/supplier-master.component';
import { SupplierProductComponent } from './supplier-product/supplier-product.component';
import { EodComponent } from './eod/eod.component';
import { PoComponent } from './po/po.component';
import { CollectionPaymentwiseReportComponent } from './collection-payment-report/collection-payment-report.component';
import { InsuranceSummaryComponent } from './insurance-summary/insurance-summary.component';
import { PatientScheduleComponent } from './patient-schedule/patient-schedule.component';
import { PatientListingReportComponent } from './patient-listing-report/patient-listing-report.component';
import { PoSubmissionComponent } from './po-submission/po-submission.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { SupplierPaymentComponent } from './supplier-payment/supplier-payment.component';
import { PaymentReceiptsComponent } from './payment-receipts/payment-receipts.component';
import { UpdatePayreceiptsComponent } from './update-payreceipts/update-payreceipts.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { ProductMasterListingComponent } from './product-master-listing/product-master-listing.component';
import { PoReportsComponent } from './po-reports/po-reports.component';
import { GoodsReportsComponent } from './goods-reports/goods-reports.component';
import { SupplierReportsComponent } from './supplier-reports/supplier-reports.component';
import { ReceiptPaymentReportComponent } from './receipt-payment-report/receipt-payment-report.component';
import { StockRegisterReportComponent } from './stock-register-report/stock-register-report.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AccountMasterComponent } from './account-master/account-master.component';
import { DoctorMasterComponent } from './doctor-master/doctor-master.component';
import { InventoryConfigComponent } from './inventory-config/inventory-config.component';
import { SuppProdMapComponent } from './supp-prod-map/supp-prod-map.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { PatientHealthComponent } from './patient-health/patient-health.component';
import { DoctorReportComponent } from './doctor-report/doctor-report.component';
import { ExportReportComponent } from './export-report/export-report.component';
import { InvoicePaymentReportComponent } from './invoice-payment-report/invoice-payment-report.component';
import { InvoiceProductReportComponent } from './invoice-product-report/invoice-product-report.component';
import { PatientVisit360ViewComponent } from './patient-visit360-view/patient-visit360-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'patient-reg',
    component: PatientRegistrationComponent
  },
  {
    path: 'apt-booking',
    component: AptBookingComponent
  },
  {
    path: 'doc-consult',
    component: DocConsultationComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'invoice/:item',
    component: PaymentComponent
  },
  {
    path: 'adv-payment',
    component: AdvancePaymentComponent
  },
  {
    path: 'print',
    component: InvoicePrintComponent
  },
  {
    path: 'manage-patient',
    component: ManagePatientComponent
  },
  {
    path: 'insurance',
    component: InsuranceComponent
  },
  {
    path: 'patientwise-report',
    component: PatientwiseReportComponent
  },
  {
    path: 'collectionwise-report',
    component: CollectionwiseReportComponent
  },
  {
    path: 'outstanding-invwise-report',
    component: OutstantingInvwiseComponent
  },
  {
    path: 'outstanding-ptwise-report',
    component: OutstantingPtwiseComponent
  },
  {
    path: 'collection-payment-wise',
    component: CollectionPaymentwiseReportComponent
  },
  {
    path: 'supplier-master',
    component: SupplierMasterComponent
  },
  {
    path: 'supplier-product',
    component: SupplierProductComponent
  },
  {
    path: 'eod',
    component: EodComponent
  },
  {
    path: 'po',
    component: PoComponent
  },
  {
    path: 'collection-paymentwise-report',
    component: CollectionPaymentwiseReportComponent
  },
  {
    path: 'insurance-summary',
    component: InsuranceSummaryComponent
  },
  {
    path: 'patient-schedule',
    component: PatientScheduleComponent
  },
  {
    path: 'patient-listing',
    component: PatientListingReportComponent
  },
  {
    path: 'po-submission',
    component: PoSubmissionComponent
  },
  {
    path: 'goods-receipt',
    component: GoodsReceiptComponent
  },
  {
    path: 'supplier-payment',
    component: SupplierPaymentComponent
  }, {
    path: 'payment-receipts',
    component: PaymentReceiptsComponent
  },
  {
    path: 'update-payreceipts',
    component: UpdatePayreceiptsComponent
  },
  {
    path: 'product-master',
    component: ProductMasterComponent
  },
  {
    path: 'product-master-listing',
    component: ProductMasterListingComponent
  }, {
    path: 'po-reports',
    component: PoReportsComponent
  },
  {
    path: 'goods-reports',
    component: GoodsReportsComponent
  },
  {
    path: 'supplier-reports',
    component: SupplierReportsComponent
  },
  {
    path: 'payment-reports',
    component: ReceiptPaymentReportComponent
  },
  {
    path: 'stock-reports',
    component: StockRegisterReportComponent
  },
  {
    path: 'upload',
    component: FileUploadComponent
  },
  {
    path: 'account-master',
    component: AccountMasterComponent
  },
  {
    path: 'doctor-master',
    component: DoctorMasterComponent
  },
  {
    path: 'inventory',
    component: InventoryConfigComponent
  },
  {
    path: 'main-supp',
    component: SuppProdMapComponent
  },
  {
    path: 'user-master',
    component: UserMasterComponent
  },
  {
    path: 'pwd',
    component: LoginUserComponent
  },
  {
    path: 'patient-health',
    component: PatientHealthComponent
  },
  {
    path: 'doc-report',
    component: DoctorReportComponent
  },
  {
    path: 'invoice-payment-report',
    component: InvoicePaymentReportComponent
  },
  {
    path: 'invoice-product-report',
    component: InvoiceProductReportComponent
  },
  {
    path: 'patient-visit360-view',
    component: PatientVisit360ViewComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
