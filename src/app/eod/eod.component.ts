import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EodService } from './eod.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UtilityService } from '../utilities/services/utility.service';
declare var $:any

export interface DialogData {
  eodData: any;
  setDate: any;
  newEod: any;
  currDate: any;
  newEodStr: any;
}
@Component({
  selector: 'app-eod',
  templateUrl: './eod.component.html',
  styleUrls: ['./eod.component.scss'],
  providers: [DatePipe]
})

export class EodComponent implements OnInit {
  orgId: any;
  branchId: any;
  eodForm!: FormGroup;
  eodData: any;
  setDate: any;
  newEod: any;
  currDate: any;
  newEodStr: any;
  

  constructor(private eodService: EodService, private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, 
    private dp: DatePipe, private us: UtilityService) { }

  ngOnInit(): void {
    this.orgId = localStorage.getItem('org_id');
    this.branchId = localStorage.getItem('branch_id');
    this.getEodDetails();
    this.eod();
  }

  
  eod() {
    this.eodForm = this.formBuilder.group(
      {
        eod_date: [this.eodData ? this.eodData.eod_date:'', []],
        supplier_id: [this.eodData ? this.eodData.supplier_id:'', []],
        new_eod_date: [this.eodData ? this.eodData.new_eod_date:'']
      }
    );
  }

  getEodDetails() {
    this.eodService.getEodDetailData(this.orgId, this.branchId).subscribe(data => {
      // console.log("EOD data", data.results);
      this.eodData = data.results[0];
      this.currDate = data.results[0].eod_date;
      this.eodForm.controls.eod_date.setValue(this.currDate);
      console.log(this.eodForm.controls.eod_date);
      this.eod();
      this.setNewEodDate();
    })
  }
  openModal() {
    this.setDate = this.newEodStr;
    let todayDate = (new Date()).getTime();
    let systemNewDate = (new Date(this.setDate)).getTime();
    if(todayDate == systemNewDate || todayDate < systemNewDate){
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Your Current Business Date Cannot be Future Date'
      })
      return;
    }
    this.setNewEodDate();
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {currDate: this.currDate, newEodStr: this.newEodStr, newEod: this.newEod}
    });
    // $("#MyPopup").modal("show");
  }

  // openModal1() {
  //   $("#MyPopup").modal("hide");
  //   $("#MyPopup1").modal("show");
  // }

  // close() {
  //   $("#MyPopup").modal("hide");
  // }

  // close1() {
  //   $("#MyPopup1").modal("hide");
  // }

  setNewEodDate() {
    let date = new Date(this.currDate);
    this.newEod = date.setDate(date.getDate() + 1);
    this.newEodStr = this.us.convertTodayTostr(date)
    console.log(this.us.convertTodayTostr(date))
  }

  // closeModal() {
  //   $("#MyPopup1").modal("hide");
  //   let param = {
  //     org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
  //     new_eod_date: this.newEodStr, eod_date: this.currDate
  //   }
  //   this.eodService.createEod(param).subscribe(data => {
  //     console.log(data);
  //     this.dialog.open(InfoDialogComponent, {
  //       width: '400px',
  //       data: 'EOD Completed Successfully.  Your Next Business Date : '+ this.us.convertTodayTostrDDMMYYYY(this.newEod)
  //     })
  //     this.router.navigate(['/landing'])
  //   })
  // }
}

@Component({
  selector: 'dialog-model1-dialog',
  templateUrl: 'dialog-model1-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  [x: string]: any;
  currentDate: any
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private us: UtilityService, private dialog: MatDialog,
  ) { }
  ngOnInit() {
    this.currentDate = this.us.convertTodayTostrDDMMYYYY(this.data.currDate);
    this.newEodStr = this.data.newEodStr;
    this.newEod = this.data.newEod;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  closeModal() {
    this.onNoClick();
    const dialogRef = this.dialog.open(DialogOverviewModal1, {
      width: '400px',
      data: {currDate: this.data.currDate, newEodStr: this.newEodStr, newEod: this.newEod}
    });
  }


}

@Component({
  selector: 'dialog-model2-dialog',
  templateUrl: 'dialog-model2-dialog.html',
})
export class DialogOverviewModal1 implements OnInit {
  [x: string]: any;
  currentDate1: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewModal1>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private us: UtilityService, private dialog: MatDialog,
    private eodService: EodService, private router: Router
  ) { }
  ngOnInit() {
    this.currentDate1 = this.us.convertTodayTostrDDMMYYYY(this.data.currDate);
    this.newEodStr = this.data.newEodStr;
    this.newEod = this.data.newEod;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createEod() {
    this.onNoClick();
    let param = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      new_eod_date: this.newEodStr, eod_date: this.data.currDate
    }
    this.eodService.createEod(param).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'EOD Completed Successfully.  Your Next Business Date : '+ this.us.convertTodayTostrDDMMYYYY(this.newEod)
      })
      this.router.navigate(['/landing'])
    })
  }
}