import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentReceiptsService } from '../payment-receipts/payment-receipts.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { AccountMasterService } from './account-master.service';

@Component({
  selector: 'app-account-master',
  templateUrl: './account-master.component.html',
  styleUrls: ['./account-master.component.scss']
})
export class AccountMasterComponent implements OnInit {
  accForm!: FormGroup;
  fetchData: any;
  dataSource: any;
  displayedColumns: string[] = ['account_code', 'account_desc', 'account_type', 'active_flag', 'edit'];
  isShowEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private amService: AccountMasterService,
      private prs: PaymentReceiptsService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.acc();
    this.accForm.controls.status.setValue('Y');
    // this.changeAccount();
  }

  acc() {
    this.accForm = this.formBuilder.group(
      {
        acc_type: ['', []],
        receipt: ['', ],
        payment: ['', []],
        acc_code: ['', []],
        acc_desc: ['', []],
        status: ['', []]
      }
    );
  }

  submit() {
    this.accForm.controls.acc_code.value ? this.update() : this.create();
  }

  create() {
    let params = {
      org_id: localStorage.getItem('org_id'),
      user_id: localStorage.getItem('user_id'),
      account_type: this.accForm.controls.acc_type.value,
      account_desc: this.accForm.controls.acc_desc.value,
      active_flag: this.accForm.controls.status.value
    }
    // console.log(params)
    this.amService.createAM(params).subscribe(data => {
      // console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Account Master Created Successfully!!!'
      })
      this.accForm.reset();
      this.fetchData.length = 0;
      this.isShowEdit = false;
    })
  }

  update() {
    let params = {
      org_id: localStorage.getItem('org_id'),
      user_id: localStorage.getItem('user_id'),
      account_type: this.accForm.controls.acc_type.value,
      account_desc: this.accForm.controls.acc_desc.value ,
      account_code: this.accForm.controls.acc_code.value,
      active_flag: this.accForm.controls.status.value
    }
    // console.log(params)
    this.amService.createAM(params).subscribe(data => {
      // console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Account Master Updated Successfully!!!'
      })
      this.accForm.reset();
      this.fetchData.length = 0;
      this.isShowEdit = false;
    })
  }

  changeAccount() {
    this.prs.fetchAcMasterByType(this.accForm.controls.acc_type.value).subscribe(data => {
      this.fetchData = data.results;
      this.dataSource = new MatTableDataSource(this.fetchData);
    })
    this.clearInp();
  }

  edit(element: any) {
    this.isShowEdit = true;
    console.log(element)
    this.accForm.controls.acc_code.setValue(element.account_code);
    this.accForm.controls.acc_desc.setValue(element.account_desc);
    this.accForm.controls.status.setValue(element.active_flag);
  }
  
  clear() {
    this.accForm.reset();
    this.fetchData.length = 0;
    this.isShowEdit = false;
  }

  clearInp() {
    this.accForm.controls.acc_code.setValue(null);
    this.accForm.controls.acc_desc.setValue(null);
    this.accForm.controls.status.setValue(null);
  }
}