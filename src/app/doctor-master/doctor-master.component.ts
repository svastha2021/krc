import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AptBookingService } from '../apt-booking/apt-booking.service';
import { PoService } from '../po/po.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { DoctorMasterService } from './doctor-master.service';

@Component({
  selector: 'app-doctor-master',
  templateUrl: './doctor-master.component.html',
  styleUrls: ['./doctor-master.component.scss']
})
export class DoctorMasterComponent implements OnInit {
  docForm!: FormGroup;
  doctorList: any[] = [];
  search: any;
  branchList: any;

  constructor(private formBuilder: FormBuilder, private dmService: DoctorMasterService, 
    private aptService: AptBookingService, private dialog: MatDialog, private pos: PoService,) { }

  ngOnInit(): void {
    this.doc();
    this.fetchDoctorsByBranchId();
    this.getBranch();
  }

  doc() {
    this.docForm = this.formBuilder.group(
      {
        doctor_name: ['', []],
        doctor_id: ['', ],
        doctor_contact_no: ['', []],
        doctor_email_id: ['', []],
        doctor_assistant_name: ['', []],
        doctor_assistant_contact_no: ['', []],
        doctor_asst_emailid: ['', []],
        doc_branch: ['', []]
      }
    );
  }

  getBranch(){
    this.pos.getBranchList().subscribe(data => {
      this.branchList = data.results;
    })
  }

  fetchDoctorsByBranchId() {
    this.aptService.fetchDoctors().subscribe(data => {
      this.doctorList = data.results;
    })
  }

  submit() {
    this.docForm.controls.doctor_id.value ? this.updateDoc() : this.createDoc();
  }

  createDoc() {
    let dmForm = this.docForm.controls;
    let params={
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      doctor_name: this.docForm.controls.doctor_name.value,   
      doctor_contact_no: this.docForm.controls.doctor_contact_no.value,
      doctor_email_id:this.docForm.controls.doctor_email_id.value,
      doctor_assistant_name: this.docForm.controls.doctor_assistant_name.value,   
      doctor_assistant_contact_no: this.docForm.controls.doctor_assistant_contact_no.value,
      doctor_asst_emailid: this.docForm.controls.doctor_asst_emailid.value,
      doctor_status:"Y"
    }
    this.dmService.createDM(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Doctor Master Created Successfully!!!'
      })
      this.docForm.reset();
      this.fetchDoctorsByBranchId();
    })
  }

  updateDoc() {
    let dmForm = this.docForm.controls;
    let params={
      doctor_id: this.docForm.controls.doctor_id.value,
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      doctor_name: this.docForm.controls.doctor_name.value,   
      doctor_contact_no: this.docForm.controls.doctor_contact_no.value,
      doctor_email_id:this.docForm.controls.doctor_email_id.value,
      doctor_assistant_name: this.docForm.controls.doctor_assistant_name.value,   
      doctor_assistant_contact_no: this.docForm.controls.doctor_assistant_contact_no.value,
      doctor_asst_emailid: this.docForm.controls.doctor_asst_emailid.value,
      doctor_status:"Y"
    }
    this.dmService.createDM(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Doctor Master Updated Successfully!!!'
      })
      this.docForm.reset();
      this.fetchDoctorsByBranchId();
    })
  }

  setProductCost(data: any) {
    let branchId = localStorage.getItem('branch_id');

    this.doctorList.forEach((element: any) => {
      if(data === element.doctor_name){
        this.docForm.controls.doctor_id.setValue(element.doctor_id);
        this.docForm.controls.doctor_contact_no.setValue(element.doctor_contact_no);
        this.docForm.controls.doctor_email_id.setValue(element.doctor_email_id);
        this.docForm.controls.doctor_assistant_name.setValue(element.doctor_assistant_name);
        this.docForm.controls.doctor_assistant_contact_no.setValue(element.doctor_assistant_contact_no);
        this.docForm.controls.doctor_asst_emailid.setValue(element.doctor_asst_emailid);
        this.docForm.controls.doc_branch.setValue(element.branch_id);
      }
    });
  }

  clear() {
    this.docForm.reset();
  }
}