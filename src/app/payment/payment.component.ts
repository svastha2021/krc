import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from './payment.service';
import { BillingService } from '../billing/billing.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { PromptDialogComponent } from '../utilities/prompt-dialog/prompt-dialog.component';
import { ViewProductDialogComponent } from '../utilities/view-product-dialog/view-product-dialog.component';
import { InvoicePrintService } from '../invoice-print/invoice-print.service';
export interface DialogData {
  branch_id: string,
  patient_id: '',
  invoice_no: '',
  inv_sr_no: '',
  amt_payment: 0,
  payment_mode: '',
  updated_by: '',
  net_balance: 0,
  bu_patient_amt_bal:0,
  advance_amount_balance?: 0
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  patientHeader: any;
  mobile_no: string = '';
  invoice: string = '';
  patientDetail = false;
  invoiceDetails: any;
  invoiceArray: any = [];
  billingArray: any = [];
  payTypes: payType[] = [];
  paymentItem = {
    org_id: localStorage.getItem('org_id'),
    branch_id: localStorage.getItem('branch_id'),
    user_id: localStorage.getItem('user_id'),
    invoice_no: this.invoice,
    inv_srl_no: '',
    payment_amount: '',
    payment_mode: '',
    payment_remark: '',
    payment_source:'P',
    updated_by: localStorage.getItem('user_id')
  }
  constructor(private bs: BillingService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private ps: PaymentService,
    private _location: Location,
    private invoicePrintService: InvoicePrintService) {

  }


  ngOnInit(): void {
    this.ps.getPaymentTypes().subscribe(types => {
      console.log(types);
      this.payTypes = types.results;
    })
    this.route.params.subscribe(data => {
      this.invoice = data.item;
      // this.paymentItem.patient_id = data.patient_id;
      this.ps.fetchBillingDetail(this.invoice).subscribe(data => {
        // if (data.length > 0) {
        //   data.forEach((element: any) => {
        //     this.setProductAlias(element)
        //   });
        // }

        this.billingArray = data.invoice_details;
        this.patientHeader = JSON.parse(localStorage.getItem('header')!);
      });
    })
  }

  setProductAlias(element: any) {
    if (element.bill_type_id === 'P') {
      element.billAlias = 'PHARMACY';
    } else if (element.bill_type_id === 'D') {
      element.billAlias = 'DIALYSIS';
    } else {
      element.billAlias = 'LAB';
    }

  }
  clearDialogFields(item: any) {
    item.amt_payment = ''
    item.payment_mode = '';
  }
  showPayment(item: any) {
    this.clearDialogFields(item);
    item.advance_amount_balance = this.patientHeader.advance_amount_balance;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paymentItem.payment_amount = result.amt_payment;
        this.paymentItem.payment_mode = result.payment_mode;
        this.paymentItem.inv_srl_no = result.inv_srl_no;
        this.paymentItem.invoice_no = result.invoice_no;
        // this.paymentItem.patient_id = this.bs.patient_id;
        const prompt = this.dialog.open(PromptDialogComponent, {
          width: '250px',
          data: "Received Rs." + result.amt_payment + " Through " + this.fetchPaytype(result.payment_mode)
        })

        prompt.afterClosed().subscribe(result => {
          if (result) {
            this.makePayment();
          } else {
            this.resetFields();
          }
        })
      } else {
        this.resetFields();
      }

    });
  }
  makePayment() {
    this.ps.submitPayment(this.paymentItem).subscribe(data => {
      alert('payment done');
      this.paymentItem = {
        org_id: localStorage.getItem('org_id'),
        branch_id: localStorage.getItem('branch_id'),
        user_id: localStorage.getItem('user_id'),
        invoice_no: this.invoice,
        inv_srl_no: '',
        payment_amount: '',
        payment_mode: '',
        payment_remark: '',
        payment_source:'P',
        updated_by: localStorage.getItem('user_id')
      }

      this.ps.fetchBillingDetail(this.invoice).subscribe(data => {

        this.billingArray = data.invoice_details;
      });
    })
  }

  fetchPaytype(payMode: any) {
    let payDes;
    this.payTypes.forEach(item => {
      if (item.ref_code === payMode) {
        payDes = item.ref_desc;
      }

    })
    return payDes;
  }
  resetFields() {
    this.paymentItem = {
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      invoice_no: this.invoice,
      inv_srl_no: '',
      payment_amount: '',
      payment_mode: '',
      payment_remark: '',
      payment_source:'P',
      updated_by: localStorage.getItem('user_id')
    }
  }
  navigateToInvoice() {
    this.router.navigate(['invoice', { patient_id: this.patientHeader.patient_id }]);
    //this._location.back();
  }

  displayProducts() {
    this.ps.fetchBilling(this.invoice).subscribe(data => {
      const dialogRef = this.dialog.open(ViewProductDialogComponent, {
        width: '500px',
        data:data.invoice_details ,
      });
    })

  }

  //Print Inv
  navigateToPrint() {
    // let data = {patient_id: this.patientHeader.patient_id, invoice: this.invoice}
    this.invoicePrintService.invData(this.patientHeader.patient_id, this.invoice);
    this.router.navigate(['/print'])
  }
}
interface payType {
  ref_type: string,
  ref_code: string,
  ref_desc: String
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  [x: string]: any;
  payTypes: payType[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private ps: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }
  ngOnInit() {
    this.ps.getPaymentTypes().subscribe(types => {
      console.log(types);
      this.payTypes = types.results;
    })
    this.maxAmount = this.data.net_balance;
    this.data.amt_payment = this.data.net_balance
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  showAdvanceError = false;
  showamountError = false;
  isAdvancePayment = false
  maxAmount: any;

  changePaymentMode() {
    let amtError = this.validateAmount();
    if (!amtError) {
      if (this.data.payment_mode && this.data.payment_mode === 'A') {
        if (this.data.advance_amount_balance && this.data.amt_payment <= this.data.advance_amount_balance) {
          this.showAdvanceError = false;
          // return true;
        } else {
          this.showAdvanceError = true;
          //return false;
        }
      } else {
        this.showAdvanceError = false;
      }
    }

  }

  validateAmount() {
    if (this.data.amt_payment <= this.data.net_balance) {
      this.showamountError = false;
      return false;
    } else {
      this.showamountError = true;
      return true;
    }
  }


}
