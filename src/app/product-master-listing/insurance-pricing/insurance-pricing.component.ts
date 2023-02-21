import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReferenceService } from 'src/app/utilities/services/reference.service';
import { UtilityService } from 'src/app/utilities/services/utility.service';
import { ProductMasterService } from 'src/app/product-master/product-master.service';
import { InfoDialogComponent } from 'src/app/utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SupplierListDialogComponent } from 'src/app/utilities/supplier-list-dialog/supplier-list-dialog.component';
import { PreviousPriceListDialogComponent } from 'src/app/utilities/previousprice-list-dialog/previousprice-list-dialog.component';
import { isMethodSignature } from 'typescript';

@Component({
  selector: 'app-insurance-pricing',
  templateUrl: './insurance-pricing.component.html',
  styleUrls: ['./insurance-pricing.component.scss']
})
export class InsurancePricingComponent implements OnInit {
  @Input()
  prod_obj: any;
  @Output()
  emitBack = new EventEmitter();
  tableData: any = [];
  ins_types: any = [];
  eod: any;
  minDate: any;
  constructor(private ref: ReferenceService, private pms: ProductMasterService,
    private dialog: MatDialog, private util: UtilityService) { }

  ngOnInit(): void {
    this.ref.getEodDetailData().subscribe(data => {
      this.eod = data.results[0];
      this.fetchMinDate();
    })
    this.ref.getPatientTypes().subscribe(data => {
      this.ins_types = data.results;
    })

  }
  addRecord() {
    this.tableData.push({
      id: this.tableData.length,
      product_id: this.prod_obj.product_id,
      product_price: 0,

      patient_price: 0,
      insurance_price: 0,
      doctor_price: 0,

      eff_from: this.util.convertTodayTostr(),
      mrp_price: 0,
      discount_value: 0,
      discount_perc: 0,
      prod_name_invoice: '',
      insurance_type: 'C',

    })
  }

  delete_item(item: any) {
    this.tableData.splice(item.id, 1);

  }
  updateIP() {
    this.tableData.forEach((element: { id: any; }) => {
      delete element.id;

    });
    let payload = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      "product_pricing": this.tableData
    }

    this.pms.createProdP(payload).subscribe(data => {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Pricing Saved Successfully!!!'
      })
      dialogRef.afterClosed().subscribe(data => {
        this.emitBack.emit();

      })
    })
  }

  showSupplier() {
    this.ref.getSupplierDetails(this.prod_obj.product_id).subscribe(data => {
      const dialogRef = this.dialog.open(SupplierListDialogComponent, {
        width: '500px',
        position: { left: '50%' },
        data: data.results,
      });
    })


    // dialogRef.afterClosed().subscribe(data => {
  }

  showHistoryPrice() {
    this.pms.sellingPricePerProduct(this.prod_obj.product_id).subscribe(data => {
      const dialogRef = this.dialog.open(PreviousPriceListDialogComponent, {
        width: '500px',
        position: { left: '50%' },
        data: data.results,
      });
    })
  }
  validateMandatory() {
    // for(let i=0;i<this.tableData.length;i++){
    //   if(this.tableData[i].insurance_type)
    //}
  }

  cancel() {
    this.emitBack.emit();
  }
  fetchMinDate() {
    let eod = new Date(this.eod.eod_date);
    let today = new Date();
    if (eod < today) {
      this.minDate = eod;
    } else {
      this.minDate = today;
    }
  }


  setProductPrice(item: any) {
    console.log(item);
    item.product_price = item.patient_price + item.insurance_price;
  }

  validateDocPrice(item: any) {
    if (item.doctor_price > item.patient_price) {
     return item.doctor_price = 0;
    }
  }
}
