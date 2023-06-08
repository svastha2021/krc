import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BillingService } from './billing.service';
import { BillingItem, Bu } from './billing.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ReferenceService } from '../utilities/services/reference.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { InfoObjDialogComponent } from '../utilities/info-obj-dialog/info-obj-dialog.component';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    bu_id: [null, {
      validators: [Validators.required],
      updateOn: "change"
    }],

    product_cost: [, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: "change"
    }],
    product_qty: [, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: "change"
    }],
    other_charge1: [],
    other_charge2: [],
    other_charge3: [],
    total_charges: [],
    gross_inv_amount: [],
    patient_inv_gross_amt: [],
    other_charge_remark1: [],
    other_charge_remark2: [],
    other_charge_remark3: [],
    discount_remark1: [],
    discount_remark2: [],
    discount_remark3: [],
    discount1: [],
    discount2: [],
    discount3: [],
    total_discount: [],
    net_amount: [],
    net_patient_amount: []

  });
  showItemDetails = false;
  editBillingItem = false;
  selectedBu: any;
  buList: Bu[] = [];
  patientDetail = false;
  headerDetail = false;
  patientHeader: any;
  patientList: any;
  mobile_no: string = '';
  billingArray: any = [];
  showModal = false;
  finalPay: number = 0;
  showBillingForm = false;
  isShowHeader = false;
  myControl = new FormControl();
  options: any = [];
  dialysisProducts: BillingItem[] = [];
  labProducts: BillingItem[] = [];
  pharmacyProducts: BillingItem[] = [];
  showInsurancePriceAsDiscount = false;
  discount = { label1: 'Concession', label2: 'Insurance', label3: 'Discount' };
  billingItem = {
    bu_id: '',
    patient_id: '',
    product_id: '',
    product_type: '',
    product_cost: Number(0),
    patient_base_price: Number(0),
    product_name: '',
    product_qty: 1,
    product_value: Number(0),
    other_charge1: Number(0),
    other_charge2: Number(0),
    other_charge3: Number(0),
    total_charges: Number(0),
    other_charge_remark1: '',
    other_charge_remark2: '',
    other_charge_remark3: '',
    gross_inv_amount: Number(0),
    patient_inv_gross_amt: Number(0),
    discount1: Number(0),
    discount2: Number(0),
    discount3: Number(0),
    discount_remark1: '',
    discount_remark2: '',
    discount_remark3: '',
    gross_discount: Number(0),
    net_amount: Number(0),
    net_patient_amount: Number(0),
    net_balance: Number(0),
    net_paid: Number(0),
    patient_inv_value: Number(0),
    insurance_inv_value: Number(0),
    doctor_inv_value: Number(0)

  }
  totalAmount = 0;
  eodData: any;
  totalOtherCharges = 0;
  totalGrossDiscount = 0;
  filteredOptions: Observable<any[]> | undefined;
  headerDetailData: any;
  constructor(private bs: BillingService,
    private dialog: MatDialog, private router: Router, private fb: FormBuilder,
    private ref: ReferenceService) { }

  ngOnInit(): void {

    this.fetchBu();
    this.getEodDetails();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  getEodDetails() {
    this.ref.getEodDetailData().subscribe(data => {
      console.log("EOD data", data.results);
      this.eodData = data.results[0].eod_date;

    })
  }

  fetchBu() {
    this.bs.fetchBuList().subscribe(data => {
      this.buList = data.results;
      // this.myForm.get('bu_id')?.setValue('PHARM');
      // this.fetchProductNew('PHARM');
      // this.myControl.setValue('EID Injection');
    })
  }

  fetchUser() {
    this.bs.fetchUserData(this.mobile_no).subscribe(data => {
      this.patientDetail = true;
      //this.patientHeader = data.results;
      this.patientList = data.results;
      this.showPatientList(this.patientList);
      console.log(data);
    })
  }
  showPatientList(result: any) {
    const dialogRef = this.dialog.open(PatientListDialogComponent, {
      width: '500px',
      data: result,
    });

    dialogRef.afterClosed().subscribe(data => {
      this.billingItem.patient_id = data.patient_id;
      this.bs.fetchHeader(data.patient_id).subscribe(data => {
        this.headerDetail = true;
        this.isShowHeader = true;
        this.patientHeader = data;
      });

    })
  }

  setProductCost(data: any) {
    this.billingItem.product_id = data.value.product_id;
    this.billingItem.product_cost = parseInt(data.value.product_price);
    this.billingItem.patient_base_price = parseInt(data.value.patient_price);
    this.billingItem.product_value = (this.billingItem.product_qty * this.billingItem.product_cost);
    this.billingItem.patient_inv_value = (this.billingItem.product_qty * this.billingItem.patient_base_price);
    this.billingItem.insurance_inv_value = parseInt(data.value.insurance_price)

    this.calclulateOthercharges(this.billingItem.product_cost);
    if (this.showInsurancePriceAsDiscount) {
      this.billingItem.discount_remark1 = "Patient concession";
      this.billingItem.discount_remark2 = "Patient insurance";
      this.discount.label1 = 'Concession';
      this.discount.label2 = 'Insurance';
      this.discount.label3 = 'Discount';
      this.billingItem.discount1 = this.billingItem.patient_base_price;
      this.billingItem.discount2 = this.billingItem.insurance_inv_value;
      this.calclulateDiscount();
      // this.billingItem.gross_discount = this.billingItem.patient_base_price + this.billingItem.insurance_inv_value + this.billingItem.discount3;
      // this.calclulateNetPay();
    }
  }
  displayProperty(value: any) {
    if (value) {
      //this.billingItem.amount = value.selling_price;      
      return value.product_name;
    }
  }

  fetchProductNew(data: any) {

    this.options = [];
    this.billingItem.bu_id = data;
    let patientType = this.headerDetailData.patient_type;
    this.resetFieldsCalculation();
    switch (data) {
      case 'DIALY': {
        this.bs.fetchProducts(data, patientType, this.eodData).subscribe(data => {
          this.options = data.results;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
        })
        break;
      }
      case 'PHARM': {
        this.bs.fetchProducts(data, patientType, this.eodData).subscribe(data => {
          this.options = data.results;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
        })
        break;
      }
      case 'LAB': {
        this.bs.fetchProducts(data, patientType, this.eodData).subscribe(data => {
          this.options = data.results;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
        })
        break;
      }
      default: {

      }

    }
  }
  checkForInsuranceCustomer(type: string) {
    if (type === "DIALY" && (this.headerDetailData.patient_type === 'C' || this.headerDetailData.patient_type === 'P' || this.headerDetailData.patient_type === 'W')) {
      this.showInsurancePriceAsDiscount = true;

    } else {
      this.showInsurancePriceAsDiscount = false;
      this.billingItem.discount_remark1 = "";
      this.billingItem.discount_remark2 = "";
      this.discount.label1 = 'Concession';
      this.discount.label2 = 'Insurance';
      this.discount.label3 = 'Discount';
    }
  }

  fetchProductsDynamic(data: any) {
    this.checkForInsuranceCustomer(data);
    this.options = [];
    this.billingItem.bu_id = data;
    let patientType = this.headerDetailData.patient_type;
    this.resetFieldsCalculation();
    this.bs.fetchProducts(data, patientType, this.eodData).subscribe(data => {
      this.options = data.results;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    })
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option: { product_name: string; }) => option.product_name.toLowerCase().includes(filterValue));
  }

  calculateAmountPerQty(data: number) {
    this.billingItem.product_value = (this.billingItem.product_qty * this.billingItem.product_cost);
    this.billingItem.patient_inv_value = (this.billingItem.product_qty * this.billingItem.patient_base_price);//new code
    this.calclulateOthercharges(data);
  }

  calclulateOthercharges(data: number) {
    this.setChargesMandatory();
    this.billingItem.total_charges = this.billingItem.other_charge1 + this.billingItem.other_charge2 + this.billingItem.other_charge3;
    // this.billingItem.gross_inv_amount = (this.billingItem.product_qty * this.billingItem.product_cost) + this.billingItem.other_charge1 + this.billingItem.other_charge2 + this.billingItem.other_charge3;
    this.billingItem.gross_inv_amount = (this.billingItem.product_qty * this.billingItem.product_cost) + this.billingItem.other_charge1 + this.billingItem.other_charge2 + this.billingItem.other_charge3;
    //new code
    this.billingItem.patient_inv_gross_amt = (this.billingItem.product_qty * this.billingItem.patient_base_price) + this.billingItem.other_charge1 + this.billingItem.other_charge2 + this.billingItem.other_charge3;
    //ends
    this.calclulateNetPay();
    //this.billingItem.gross = 4+5;
  }
  calclulateDiscount() {
    this.setDiscountMandatory();
    this.billingItem.gross_discount = this.billingItem.discount1 + this.billingItem.discount2 + this.billingItem.discount3;
    this.calclulateNetPay();
  }

  setDiscountMandatory() {
    this.clearDiscountValidator();
    if (this.billingItem.discount1) {
      this.myForm.get('discount_remark1')?.setValidators([Validators.required]);
      this.myForm.get('discount_remark1')?.updateValueAndValidity();
    }
    if (this.billingItem.discount2) {
      this.myForm.get('discount_remark2')?.setValidators([Validators.required]);
      this.myForm.get('discount_remark2')?.updateValueAndValidity();
    }
    if (this.billingItem.discount3) {
      this.myForm.get('discount_remark3')?.setValidators([Validators.required]);
      this.myForm.get('discount_remark3')?.updateValueAndValidity();
    }
  }

  setChargesMandatory() {
    this.clearOtherChargesValidator();
    if (this.billingItem.other_charge1) {
      this.myForm.get('other_charge_remark1')?.setValidators([Validators.required]);
      this.myForm.get('other_charge_remark1')?.updateValueAndValidity();
    }
    if (this.billingItem.other_charge2) {
      this.myForm.get('other_charge_remark2')?.setValidators([Validators.required]);
      this.myForm.get('other_charge_remark2')?.updateValueAndValidity();
    }
    if (this.billingItem.other_charge3) {
      this.myForm.get('other_charge_remark3')?.setValidators([Validators.required]);
      this.myForm.get('other_charge_remark3')?.updateValueAndValidity();
    }
  }
  //clear validators
  clearOtherChargesValidator() {
    if (this.billingItem.other_charge1 === 0) {
      this.myForm.get('other_charge_remark1')?.clearValidators();
      this.myForm.get('other_charge_remark1')?.updateValueAndValidity();

    }
    if (this.billingItem.other_charge2 === 0) {
      this.myForm.get('other_charge_remark2')?.clearValidators();
      this.myForm.get('other_charge_remark2')?.updateValueAndValidity();

    }
    if (this.billingItem.other_charge3 === 0) {
      this.myForm.get('other_charge_remark3')?.clearValidators();
      this.myForm.get('other_charge_remark3')?.updateValueAndValidity();

    }
  }

  clearDiscountValidator() {
    if (this.billingItem.discount1 === 0) {
      this.myForm.get('discount_remark1')?.clearValidators();
      this.myForm.get('discount_remark1')?.updateValueAndValidity();

    }
    if (this.billingItem.discount2 === 0) {
      this.myForm.get('discount_remark2')?.clearValidators();
      this.myForm.get('discount_remark2')?.updateValueAndValidity();

    }
    if (this.billingItem.discount3 === 0) {
      this.myForm.get('discount_remark3')?.clearValidators();
      this.myForm.get('discount_remark3')?.updateValueAndValidity();

    }
  }

  calclulateNetPay() {

    this.billingItem.net_amount = this.billingItem.gross_inv_amount - this.billingItem.gross_discount;
    //new code ends
    // this.billingItem.doctor_inv_value = this.billingItem.net_patient_amount;
    // this.billingItem.net_amount = (this.billingItem.net_patient_amount) + this.billingItem.insurance_inv_value;
    //this.calculateFinal();
  }

  calculateFinal() {
    this.finalPay = this.finalPay + this.billingItem.net_amount;
    localStorage.setItem('billingarray', JSON.stringify(this.billingArray));

  }
  getBuName(bu: any) {

    switch (bu.bu_id) {
      case 'DIALY': {
        return 'Dialysis'
        break;
      }
      case 'PHARM': {
        return 'Pharmacy'
        break;
      }
      case 'LAB': {
        return 'Lab'
        break;
      }
      default: {
        return 'none'
      }
    }
  }
  constructBillPayload() {
    let billPayload = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      patient_id: this.headerDetailData.patient_id, invoice_details: this.billingArray
    }
    return billPayload;
  }

  submitData() {
    let payload = this.constructBillPayload();
    console.log("payload",payload)
    this.bs.submitInvoice(payload).subscribe(data => {
      console.log(data);
      this.bs.invoice_no = data.invoice_no;
      this.bs.patient_id = this.headerDetailData.patient_id;
      localStorage.setItem('header', JSON.stringify(this.headerDetailData));
      // this.router.navigate(['invoice']);
      this.router.navigate(['invoice', this.bs.invoice_no]);
    })



  }
  addItem() {
    this.billingArray.push(this.billingItem);
    this.totalAmount = this.totalAmount + this.billingItem.net_patient_amount;
    this.totalOtherCharges = this.totalOtherCharges + this.billingItem.total_charges;
    this.totalGrossDiscount = this.totalGrossDiscount + this.billingItem.gross_inv_amount;
    this.showBillingForm = false;
    //this.options = [];
    this.calculateFinal();
    this.resetFields();
    //this.clearValidation(this.myForm, this.myControl);   

  }
  clearValidation(myForm: any, myControl: any) {
    this.bs.clearValidation(myForm, myControl);
  }
  cancelNewItem() {
    if (this.editBillingItem) {
      this.billingArray.push(this.billingItemCopy)
    }

    this.resetFields();
    this.showBillingForm = false;
    this.editBillingItem = false;
    this.clearValidation(this.myForm, this.myControl);

  }
  billingItemCopy: any;
  editItem(item: any, index: any) {
    this.editBillingItem = true;
    this.showBillingForm = true;
    //item.bu_id = 'PHARMA';
    this.myForm.get('bu_id')?.setValue(item.bu_id);
    this.fetchProductNew(item.bu_id);
    this.billingItem = item;
    this.billingItemCopy = Object.assign({}, this.billingItem);
    this.billingArray.splice(index, 1)
  }
  updateItem() {
    this.editBillingItem = false;
    this.showBillingForm = false;
    this.billingArray.push(this.billingItem);
    let total = 0
    let tgdisc = 0;
    let tgother = 0;
    this.billingArray.forEach((element: any) => {
      total += element.net_amount;
      tgdisc += element.gross_discount;
      tgother += element.total_charges;
    });
    this.totalAmount = total;
    this.totalGrossDiscount = tgdisc;
    this.totalOtherCharges = tgother;
    this.resetFields();
  }
  resetFields() {

    this.billingItem = {
      bu_id: this.billingItem.bu_id,
      patient_id: '',
      product_id: '',
      product_type: '',
      product_cost: Number(0),
      patient_base_price: Number(0),

      product_name: '',
      product_qty: Number(1),
      product_value: Number(0),
      other_charge1: Number(0),
      other_charge2: Number(0),
      other_charge3: Number(0),
      total_charges: Number(0),
      other_charge_remark1: '',
      other_charge_remark2: '',
      other_charge_remark3: '',
      gross_inv_amount: Number(0),
      patient_inv_gross_amt: Number(0),
      discount1: Number(0),
      discount2: Number(0),
      discount3: Number(0),
      discount_remark1: '',
      discount_remark2: '',
      discount_remark3: '',
      gross_discount: Number(0),
      net_amount: Number(0),
      net_patient_amount: Number(0),
      net_balance: Number(0),
      net_paid: Number(0),
      patient_inv_value: Number(0),
      insurance_inv_value: Number(0),
      doctor_inv_value: Number(0)
    }
    //this.myForm.get('bu_id')?.setValue('');
  }
  resetFieldsCalculation() {
    this.billingItem = {
      bu_id: this.billingItem.bu_id,
      patient_id: '',
      product_id: '',
      product_type: '',
      product_cost: Number(0),
      patient_base_price: Number(0),

      product_name: '',
      product_qty: Number(1),
      product_value: Number(0),
      other_charge1: Number(0),
      other_charge2: Number(0),
      other_charge3: Number(0),
      total_charges: Number(0),
      other_charge_remark1: '',
      other_charge_remark2: '',
      other_charge_remark3: '',
      gross_inv_amount: Number(0),
      patient_inv_gross_amt: Number(0),
      discount1: Number(0),
      discount2: Number(0),
      discount3: Number(0),
      discount_remark1: '',
      discount_remark2: '',
      discount_remark3: '',
      gross_discount: Number(0),
      net_amount: Number(0),
      net_patient_amount: Number(0),
      net_balance: Number(0),
      net_paid: Number(0),
      patient_inv_value: Number(0),
      insurance_inv_value: Number(0),
      doctor_inv_value: Number(0)
    }
    // this.myForm.get('bu_id')?.setValue('');
  }

  editBilling(item: any) {

    this.showItemDetails = true;
    item.invoice_details[0].bu_id = 'PHARMA'

    this.billingArray = item.invoice_details;
  }

  createItem() {
    this.showBillingForm = true;
    this.isShowHeader = true;
    if (this.billingItem.bu_id) {
      this.fetchProductsDynamic(this.billingItem.bu_id);
    }
  }

  patientHeaderData(data: any) {
    this.headerDetail = true;
    this.headerDetailData = data;
  }
  showHiddenDetails = false;
  priceEditable = false;
  displayHidden() {
    this.showHiddenDetails = true;

    const dialogRef = this.dialog.open(InfoObjDialogComponent, {
      width: '500px',
      data: this.billingItem,
    });
  }

  validatePatientPrice(price: number) {
    if (price === 0) {
      this.priceEditable = true;
      return false;
    } else if (this.priceEditable) {
      return false;
    } else {
      this.priceEditable = false;
      return true;
    }
  }


}
function MdAutocompleteTrigger(MdAutocompleteTrigger: any) {
  throw new Error('Function not implemented.');
}

