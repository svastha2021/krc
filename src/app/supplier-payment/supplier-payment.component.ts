import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PoService } from '../po/po.service';
import { SupplierPaymentService } from './supplier-payment.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { ReferenceService } from '../utilities/services/reference.service';
import Swal from 'sweetalert2';
export interface Payment_mode {
  ref_type: string;
  ref_code: string;
  ref_desc: string;
}
@Component({
  selector: 'app-supplier-payment',
  templateUrl: './supplier-payment.component.html',
  styleUrls: ['./supplier-payment.component.scss']
})
export class SupplierPaymentComponent implements OnInit {
  supplierPaymentForm!: FormGroup;
  supplierIdData: any;
  suppPayData: any;
  isShowPayEntry: boolean = false;
  paymentTableData: any[]= [];
  getSuppData: any;
  count: number = 0;
  paymentModes: Payment_mode[] = [];
  branchList: any;

  HighlightRow : any;  
  Employee : any;  
  ClickedRow:any; 

  constructor(private formBuilder: FormBuilder, 
              private dialog: MatDialog, 
              private SuppPayService: 
              SupplierPaymentService, 
              private pos: PoService,
              private ref: ReferenceService) {     this.ClickedRow = function(index: any){  
                this.HighlightRow = index;  
            }}

  ngOnInit(): void {
    this.ref.getPaymentModes('PAYMOD').subscribe(data => {
      this.paymentModes = data.results;
    })
    this.supplierPayment();
    this.getBranch();
    this.loadBranchData();
  }

  loadBranchData() {
    const id = localStorage.getItem('branch_id');
    this.supplierPaymentForm.controls.branch_id.setValue(id);
    this.getSupplierList();
  }

  supplierPayment() {
    this.supplierPaymentForm = this.formBuilder.group(
      {
        branch_id: ['', [Validators.required]],
        supplier_id: ['', Validators.required],
        payment_date: ['', [Validators.required]],
        payment_mode: ['', [Validators.required]],
        payment_amount: ['', [Validators.required]],
        remarks: ['']
      }
    );
  }

  getSupplierList(){
    const branchId = this.supplierPaymentForm.controls.branch_id.value;
    this.pos.getSupplierList(branchId).subscribe(data => {
      console.log(data);
      this.supplierIdData = data.results;
    })
  }

  getPoSuppPayment() {
    const branchId = this.supplierPaymentForm.controls.branch_id.value;
    const suppId = this.supplierPaymentForm.controls.supplier_id.value;
    const org_id = localStorage.getItem('org_id');
    this.SuppPayService.getPoSuppPay(org_id, branchId, suppId).subscribe(data =>{
      console.log("suppPay", data);
      this.suppPayData = data.results;
    })
  }

  getSuppPayDetails(data: any) {
    const branchId = data.branch_id; const suppId = data.supplier_id;
    const poNumber = data.po_number; const suppInvNum = data.supplier_invoice_num;
    const org_id = localStorage.getItem('org_id');
    this.SuppPayService.getSuppPayDetails(org_id, branchId, suppId, poNumber, suppInvNum).subscribe(data =>{
      console.log("suppPay", data);
      this.paymentTableData = data.results;
    })
  }

  showPayEntry(data: any) {
    this.isShowPayEntry = true;
    console.log(data)
    this.getSuppData = data;
    this.getSuppPayDetails(data)
  }

  addToList() {
    if(this.count > 0 || this.supplierPaymentForm.invalid){
      return
    }
    const temp = {payment_date:'', payment_mode:'', payment_amount:'', remarks:''}
    // temp.payment_date = '';
    // temp.payment_mode = '';
    // temp.payment_amount = '';
    // temp.remarks = ''
    
    //set values
    temp.payment_date = this.supplierPaymentForm.controls.payment_date.value; 
    temp.payment_mode = this.supplierPaymentForm.controls.payment_mode.value;
    temp.payment_amount = this.supplierPaymentForm.controls.payment_amount.value;
    temp.remarks = this.supplierPaymentForm.controls.remarks.value;
    // this.paymentTableData.push(temp);
    this.count++;
    // this.clearFields();
  }

  clearFields() {  
    this.supplierPaymentForm.controls.payment_date.setValue(null);
    this.supplierPaymentForm.controls.payment_mode.setValue(null);
    this.supplierPaymentForm.controls.payment_amount.setValue(null);
    this.supplierPaymentForm.controls.remarks.setValue(null);
  }

  submit() {

    if (this.supplierPaymentForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter Valid Data in Payment!'
      })
      return
    }

    // console.log("supplierPaymentForm", this.supplierPaymentForm)
    // let payDate = (this.supplierPaymentForm.controls.payment_date.value).split('-');
    // payDate = payDate[2]+'-'+payDate[1]+'-'+payDate[0]
    let params = {
      org_id: localStorage.getItem('org_id'),
      branch_id : this.supplierPaymentForm.controls.branch_id.value,
      po_number : this.getSuppData.po_number,
      supplier_id : this.supplierPaymentForm.controls.supplier_id.value,
      supplier_invoice_num : this.getSuppData.supplier_invoice_num,
      
      po_date: this.getSuppData.po_date,
      payment_value: this.supplierPaymentForm.controls.payment_amount.value,
      payment_date: this.supplierPaymentForm.controls.payment_date.value,
      payment_mode: this.supplierPaymentForm.controls.payment_mode.value,
      payment_desc: this.supplierPaymentForm.controls.remarks.value,
      user_id: localStorage.getItem('user_id')
  }
    this.SuppPayService.createPayment(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Payment Entry Saved Successfully!!!'
      })
      this.getPoSuppPayment();
      this.paymentTableData.length = 0;
      this.clearFields();
    })
  }

  //getBranch
  getBranch(){
    this.pos.getBranchList().subscribe(data => {
      console.log(data);
      this.branchList = data.results;
    })
  }

  //validate Payment
  validatePayment() {
    const paymentVal = this.supplierPaymentForm.controls.payment_amount.value;
    const balAmt = this.getSuppData.supp_inv_amt_bal;
    if(!balAmt){
      return;
    }
    if ((paymentVal > balAmt)) {
      this.supplierPaymentForm.controls.payment_amount.setErrors({ 'incorrect': true });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Payment Amount should not be greater than Balance!'
      })
    } else {
      this.supplierPaymentForm.controls.payment_amount.setErrors(null);
    }
  }

  validateDate() {
    const paymentDate = this.supplierPaymentForm.controls.payment_date.value;
    const poDate = this.getSuppData.po_date;
    if(!poDate){
      return;
    }
    if ((paymentDate < poDate)) {
      this.supplierPaymentForm.controls.payment_date.setErrors({ 'incorrect': true });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Payment Date should not be Lesser than Inv Date!'
      })
    } else {
      this.supplierPaymentForm.controls.payment_date.setErrors(null);
    }
  }
}

export interface paymentItem {
  payment_date: string;
  payment_mode: string;
  payment_amount: string;
  remarks:string;
}
