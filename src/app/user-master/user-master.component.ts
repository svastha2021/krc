import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { create } from 'lodash';
import { PoService } from '../po/po.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { userMasterService } from './user-master.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {

  userMasterForm!: FormGroup;
  userList: any;
  search: any;
  userDetails: any;
  usertype: any;
  branchList: any;
  userId: any;

  constructor(private formBuilder: FormBuilder, private umService: userMasterService, 
      private dialog: MatDialog, private pos: PoService,) { }

  ngOnInit(): void {
    this.userMaster();
    this.getUserList();
    this.getUserType();
    this.getBranch();
  }

  userMaster() {
    this.userMasterForm = this.formBuilder.group(
      {
        user_name: ['', []],
        branch_id: ['', ],
        dob: ['', []],
        doj: ['', []],
        mobile_no: ['', ],
        home_contact_no: ['', []],
        residence_address: ['', []],
        email_id: ['', ],
        aadhar_no: ['', []],
        pan_no: ['', []],
        passport: ['', []],
        signature: ['', ],
        bank_account_no: ['', []],
        ifsc_code: ['', []],
        bank_name: ['', ],
        bank_address: ['', []],
        attached_branch: ['', []],
        pf_employee: ['', ],
        pf_start_date: ['', []],
        pf_number: ['', []],
        user_type: ['', ],
        user_status: ['', []],
        pwd: ['']
      }
    );
  }

  getBranch(){
    this.pos.getBranchList().subscribe(data => {
      this.branchList = data.results;
    })
  }

  getUserType() {
    this.umService.getUserTypes().subscribe(data => {
      this.usertype = data.results;
    })
  }

  getUserList(){
    let org_id = localStorage.getItem('org_id');
    let branchId = localStorage.getItem('branch_id');
    this.umService.getUserList(branchId, org_id).subscribe(data => {
      this.userList = data.results;
    })
  }

  submit() {
    this.userId ? this.update() : this.create();
  }

  fetchUserDetails(data: any) {
    let org_id = localStorage.getItem('org_id');
    let branchId = localStorage.getItem('branch_id');
    this.umService.getUserDetails(branchId, org_id, data).subscribe(data => {
      console.log(data)
      this.userDetails = data.results;
      this.userId = this.userDetails.user_id;
      this.userMasterForm.patchValue(this.userDetails)
    })
  }

  create() {
    this.userMasterForm.controls.user_status.setValue('Y');
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'),
      user_name: this.userMasterForm.controls.user_name.value,
      dob: this.userMasterForm.controls.dob.value,
      doj: this.userMasterForm.controls.doj.value,
      mobile_no: this.userMasterForm.controls.mobile_no.value,
      home_contact_no: this.userMasterForm.controls.home_contact_no.value,

      residence_address: this.userMasterForm.controls.residence_address.value,
      email_id: this.userMasterForm.controls.email_id.value,
      aadhar_no: this.userMasterForm.controls.aadhar_no.value,
      pan_no: this.userMasterForm.controls.pan_no.value,
      passport: this.userMasterForm.controls.passport.value,

      signature: this.userMasterForm.controls.signature.value,
      bank_account_no: this.userMasterForm.controls.bank_account_no.value,
      ifsc_code: this.userMasterForm.controls.ifsc_code.value,
      bank_name: this.userMasterForm.controls.bank_name.value,
      bank_address: this.userMasterForm.controls.bank_address.value,

      attached_branch: this.userMasterForm.controls.attached_branch.value,
      pf_employee: this.userMasterForm.controls.pf_employee.value,
      pf_start_date: this.userMasterForm.controls.pf_start_date.value,
      pf_number: this.userMasterForm.controls.pf_number.value,
      user_type: this.userMasterForm.controls.user_type.value,

      user_status: this.userMasterForm.controls.user_status.value,
      // pwd: this.userMasterForm.controls.pwd.value
    }
    this.umService.createUser(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'User Master Created Successfully!!!'
      })
      this.getUserList();
    })
    this.userMasterForm.reset();
  }

  update() {
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: this.userId,
      user_name: this.userMasterForm.controls.user_name.value,
      dob: this.userMasterForm.controls.dob.value,
      doj: this.userMasterForm.controls.doj.value,
      mobile_no: this.userMasterForm.controls.mobile_no.value,
      home_contact_no: this.userMasterForm.controls.home_contact_no.value,

      residence_address: this.userMasterForm.controls.residence_address.value,
      email_id: this.userMasterForm.controls.email_id.value,
      aadhar_no: this.userMasterForm.controls.aadhar_no.value,
      pan_no: this.userMasterForm.controls.pan_no.value,
      passport: this.userMasterForm.controls.passport.value,

      signature: this.userMasterForm.controls.signature.value,
      bank_account_no: this.userMasterForm.controls.bank_account_no.value,
      ifsc_code: this.userMasterForm.controls.ifsc_code.value,
      bank_name: this.userMasterForm.controls.bank_name.value,
      bank_address: this.userMasterForm.controls.bank_address.value,

      attached_branch: this.userMasterForm.controls.attached_branch.value,
      pf_employee: this.userMasterForm.controls.pf_employee.value,
      pf_start_date: this.userMasterForm.controls.pf_start_date.value,
      pf_number: this.userMasterForm.controls.pf_number.value,
      user_type: this.userMasterForm.controls.user_type.value,

      user_status: this.userMasterForm.controls.user_status.value,
      // pwd: this.userMasterForm.controls.pwd.value
    }
    this.umService.createUser(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'User Master Updated Successfully!!!'
      })
    })
    this.userMasterForm.reset();
    this.userId = null;
  }

}
