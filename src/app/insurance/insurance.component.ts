import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice/invoice.service';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AptBookingService } from '../apt-booking/apt-booking.service';
import { InsuranceService } from './insurance.service';
import { UtilityService } from '../utilities/services/utility.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  @Input()
  billing = false;
  @Output()
  billingItem = new EventEmitter();
  mobile_no: string = '';
  year: any;
  month: any;
  invoiceDetails: any;
  patientInvoiceDetail = false;
  patientHeader: any;
  patientList = [];
  insuranceform!: FormGroup;
  dateForm!: FormGroup;
  doctorList: any;
  buList: any;
  isShowPatientInputForm: boolean = false;
  patientInputForm!: FormGroup;
  isShowPatientHeader: boolean = false;
  pat_ins_detail: any[] = [];
  fetchInsHeaderdata: any;
  currentPatientDetail: any;
  prevCounter = 0;
  recordIndex: number | undefined;
  insFetchData: any;
  patientDialysisHistory: any;
  patientDialysisList: any;
  invoiceNum: any;
  isrequiredBtn: boolean = true;
  isShowPrint: boolean = false;
  getInvoiceNum: any[] = [];
  printData: any[] =[];
  HeaderIns: any;
  // date = new FormControl(moment());
  ins_flag: boolean = true;
  getValue: any;

  constructor(private is: InvoiceService, private dialog: MatDialog, private router: Router,
    private formBuilder: FormBuilder, private aptService: AptBookingService, private insuranceService: InsuranceService,
    private utility: UtilityService) { }

  ngOnInit(): void {
    this.fetchDoctorsByBranchId();
    this.fetchBu();
    this.headerForm();
    this.patientForm();
    this.dateForm = this.formBuilder.group({
      date: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required]
    })
    this.dateForm.controls.year.setValue('2022');
    this.submitData();
    this.loadInsurance();
  }

  loadInsurance() {
    this.patientHeaderData(this.insuranceService.getInsurancedata());
  }
  
  headerForm() {
    this.insuranceform = this.formBuilder.group(
      {
        doctor_id: [this.fetchInsHeaderdata ? this.fetchInsHeaderdata[0].doctor_id: '', Validators.required],
        bu_id: [this.fetchInsHeaderdata ? this.fetchInsHeaderdata[0].bu_id: '', [Validators.required]],
        diagnosis: [this.fetchInsHeaderdata ? this.fetchInsHeaderdata[0].header_remarks1: '', [Validators.required]],
        history: [this.fetchInsHeaderdata ? this.fetchInsHeaderdata[0].header_remarks2: '', Validators.required],
        footer: [this.fetchInsHeaderdata ? this.fetchInsHeaderdata[0].footer_remarks: '', Validators.required]
      }
    );
  }

  patientForm() {
    
    this.patientInputForm = this.formBuilder.group(
      {
        invoice_date: [this.currentPatientDetail ? this.currentPatientDetail.invoice_date :'', ],
        // dialysis_date: [this.currentPatientDetail ? this.currentPatientDetail.dialysis_date :'', ],
        hd_start_time: [this.currentPatientDetail ? this.currentPatientDetail.hd_start_time :'', ],
        hd_end_time: [this.currentPatientDetail ? this.currentPatientDetail.hd_end_time :'', ],
        hd_duration: [this.currentPatientDetail ? this.currentPatientDetail.hd_duration :'' ],
        pre_wt: [this.currentPatientDetail ? this.currentPatientDetail.pre_wt :'', ],
        pre_bp: [this.currentPatientDetail ? this.currentPatientDetail.pre_bp :'', ],
        pre_pulse: [this.currentPatientDetail ? this.currentPatientDetail.pre_pulse :'', ],
        pre_temp: [this.currentPatientDetail ? this.currentPatientDetail.pre_temp :'', ],
        post_wt: [this.currentPatientDetail ? this.currentPatientDetail.post_wt :'', ],
        post_bp: [this.currentPatientDetail ? this.currentPatientDetail.post_bp :'', ],
        post_pulse: [this.currentPatientDetail ? this.currentPatientDetail.post_pulse :'', ],
        post_temp: [this.currentPatientDetail ? this.currentPatientDetail.post_temp :'', ],
        curr_flow: [this.currentPatientDetail ? this.currentPatientDetail.curr_flow :'', ],
        fluid_removal: [this.currentPatientDetail ? this.currentPatientDetail.fluid_removal :'', ],
        complication: [this.currentPatientDetail ? this.currentPatientDetail.complication :'', ],
        drugs: [this.currentPatientDetail ? this.currentPatientDetail.drugs :'', ]
      }
    );
  }

  fetchUserInvoices() {
    this.is.fetchUserData(this.mobile_no).subscribe(data => {
      if (data) {
        localStorage.setItem('insurance_month',this.dateForm.controls.month.value);
        localStorage.setItem('insurance_year',this.dateForm.controls.year.value);
        this.patientList = data.results;
        this.showPatientList(this.patientList);
      }
    }, error => {
      if (error.error.status === 404) {
        this.dialog.open(InfoDialogComponent, {
          width: '300px',
          data: 'patient details not found!!!'
        })
      }
    })
  }

  showPatientList(result: any) {
    this.is.fetchHeader(result.patient_id).subscribe(data => {
      if (data) {
        this.fetchInsHeader(data);
        if(data.patient_type == 'N'){
          this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: 'Insurance Entry Not applicable for Normal Patient!!!'
          })
          return;
        }
        this.patientHeader = data;
        this.isShowPatientHeader = true;
        this.isShowPatientInputForm = true;
        this.patientInvoiceDetail = true;
        this.fetchInsData();
      }
    })
    // const dialogRef = this.dialog.open(PatientListDialogComponent, {
    //   width: '500px',
    //   data: result,
    // });

    // dialogRef.afterClosed().subscribe(data => {
    //   this.patientList = data.results;
    //   this.is.fetchHeader(data.patient_id).subscribe(data => {
    //     if (data) {
    //       this.fetchInsHeader(data);
    //       if(data.patient_type == 'N'){
    //         this.dialog.open(InfoDialogComponent, {
    //           width: '500px',
    //           data: 'Insurance Entry Not applicable for Normal Patient!!!'
    //         })
    //         return;
    //       }
    //       this.patientHeader = data;
    //       this.isShowPatientHeader = true;
    //       this.isShowPatientInputForm = true;
    //       this.patientInvoiceDetail = true;
    //       this.fetchInsData();
    //     }
    //   })
    // });
  }

  //get Doctor list
  fetchDoctorsByBranchId() {
    this.aptService.fetchDoctors().subscribe(data => {
      this.doctorList = data.results;
    })
  }

  //get Bu Id
  fetchBu() {
    this.insuranceService.fetchBuList().subscribe(data => {
      this.buList = data.results;
    })
  }

  constructHeaderParam() {
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      patient_id: this.patientHeader && this.patientHeader.patient_id, doctor_id: this.insuranceform.controls.doctor_id.value,
      bu_id: this.insuranceform.controls.bu_id.value, header_remarks1: this.insuranceform.controls.diagnosis.value,
      header_remarks2: this.insuranceform.controls.history.value,
      footer_remarks: this.insuranceform.controls.footer.value
    }
    return params;
  }

  //submit Data
  submitData() {
    let getParams = this.constructHeaderParam();
    this.insuranceService.submitInsurance(getParams).subscribe(data => {
      this.HeaderIns = data;
      console.log("this.HeaderIns", data);
      this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Patient insurance header saved!!!'
      })
      this.isShowPatientInputForm = true;
      this.isShowPatientHeader = true;
    });
  }

  //fetch Ins data
  fetchInsData() {
    const month = this.dateForm.value.month;
    const year = this.dateForm.value.year;
    const patient_id = this.patientHeader.patient_id;
    this.insuranceService.fetchInsData(month, year, patient_id).subscribe(data => {
      this.patientDialysisHistory = (data.results).reverse();
      this.setCurrentPatientDialysisData();
      this.isrequiredPrintBtn();
    })
  }

  //getDuration
  getEndTime() {
    const date2 = this.currentPatientDetail.hd_end_time;
    const date1 = this.currentPatientDetail.hd_start_time;
    console.log(date1, date2);
    const diffInMs = Date.parse(date2) - Date.parse(date1);
    const diffInHours = diffInMs / 1000 / 60 / 60;
    this.currentPatientDetail.hd_duration = (diffInHours).toFixed(0);
    console.log(diffInHours);
  }

  //Fetch Insurance Header
  fetchInsHeader(data: any) {
    this.insuranceService.fetchInsHeader(data.patient_id).subscribe(data => {
      // console.log("fetchData",data);
      this.fetchInsHeaderdata = data.results;
      this.headerForm();
    })
  }


  //save
  save() {
    this.validateFlag();
    // console.log("this.pat_ins_detail=====",this.pat_ins_detail);
    let getInsParams = this.patientDialysisHistory;
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      patient_id: this.patientHeader.patient_id, pat_ins_detail: getInsParams
    }
    this.insuranceService.saveInsData(params).subscribe(data => {
      console.log("saveData",data);
    })
    // this.patientInputForm.reset();
  }

  print(invoiceNum: any) {
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), patient_id: this.patientHeader.patient_id,
      invoice_no: [invoiceNum]
    }
    this.insuranceService.printInsData(params).subscribe(data => {
      this.printData = data.results;
      this.isShowPrint = true;
      console.log("printResponse",this.printData);
    })
  }

   edit(date: any) {
    this.patientDialysisHistory.forEach((element: any) => {
      if(date == element.invoice_date) {
        this.currentPatientDetail = element;
        this.invoiceNum = element.invoice_num;
        this.patientForm();
      }
    })
   }

   setCurrentPatientDialysisData() {
    this.currentPatientDetail = this.patientDialysisHistory[this.getLastDialysisRecordIndex()];
    this.currentPatientDetail.invoice_date = this.utility.convertDate(this.currentPatientDetail.invoice_date);
    if(!this.currentPatientDetail.hd_start_time && !this.currentPatientDetail.hd_end_time){
      this.currentPatientDetail.hd_start_time = this.currentPatientDetail.invoice_date + ' 00:00:00';
      this.currentPatientDetail.hd_end_time = this.currentPatientDetail.invoice_date + ' 00:00:00';
    }
    this.invoiceNum = this.currentPatientDetail.invoice_num;
    // console.log("currentPatientDetail", this.currentPatientDetail)
    this.patientForm();
    if (this.getLastDialysisRecordIndex() === 0) {
      this.recordIndexDialysis = 0;
    }
  }
  prevDialysisCounter = 0;
  recordIndexDialysis: number | undefined;

  getLastDialysisRecordIndex() {
    return this.patientDialysisHistory.length - 1;
  }
  
   next() {
    this.setDialysisValue();
    this.validateFlag();
    this.prevDialysisCounter++;
    this.setCurrentDialysisAfterChange();
    this.isrequiredPrintBtn();
   }

   prev() {
    this.validateFlag();
    this.prevDialysisCounter--;
    this.setCurrentDialysisAfterChange();
    this.isrequiredPrintBtn();
   }
 
   setCurrentDialysisAfterChange() {
    this.recordIndexDialysis = this.getLastDialysisRecordIndex() - this.prevDialysisCounter;
    this.currentPatientDetail = this.patientDialysisHistory[this.recordIndexDialysis]; // give us back the item of where we are now
    this.currentPatientDetail.invoice_date = this.utility.convertDate(this.currentPatientDetail.invoice_date);
    if(!this.currentPatientDetail.hd_start_time && !this.currentPatientDetail.hd_end_time){
      this.currentPatientDetail.hd_start_time = this.currentPatientDetail.invoice_date + ' 00:00:00';
      this.currentPatientDetail.hd_end_time = this.currentPatientDetail.invoice_date + ' 00:00:00';
    }
    this.invoiceNum = this.currentPatientDetail.invoice_num;
    this.patientForm();
    console.log('recordIndexDialysis----patientInputForm', this.patientDialysisHistory);
  }

  setDialysisValue() {
    let i;
    this.patientDialysisHistory
    for(i=0;i<this.patientDialysisHistory.length;i++){
      if(!this.patientDialysisHistory[i].pre_pulse){
        this.patientDialysisHistory[i].pre_pulse = this.currentPatientDetail.pre_pulse;
      }
      if(!this.patientDialysisHistory[i].pre_temp){
        this.patientDialysisHistory[i].pre_temp = this.currentPatientDetail.pre_temp;
      }
      if(!this.patientDialysisHistory[i].post_pulse){
        this.patientDialysisHistory[i].post_pulse = this.currentPatientDetail.post_pulse;
      }
      if(!this.patientDialysisHistory[i].post_temp){
        this.patientDialysisHistory[i].post_temp = this.currentPatientDetail.post_temp;
      }
      if(!this.patientDialysisHistory[i].curr_flow){
        this.patientDialysisHistory[i].curr_flow = this.currentPatientDetail.curr_flow;
      }
      if(!this.patientDialysisHistory[i].fluid_removal){
        this.patientDialysisHistory[i].fluid_removal = this.currentPatientDetail.fluid_removal;
      }
      if(!this.patientDialysisHistory[i].complication){
        this.patientDialysisHistory[i].complication = this.currentPatientDetail.complication;
      }
      if(!this.patientDialysisHistory[i].drugs){
        this.patientDialysisHistory[i].drugs = this.currentPatientDetail.drugs;
      }
      }
    }

  validateFlag() {
    if(this.currentPatientDetail.hd_start_time && this.currentPatientDetail.hd_end_time && this.currentPatientDetail.hd_duration &&  this.currentPatientDetail.pre_wt &&
      this.currentPatientDetail.pre_bp && this.currentPatientDetail.pre_pulse && this.currentPatientDetail.pre_temp && this.currentPatientDetail.post_wt &&
      this.currentPatientDetail.post_bp && this.currentPatientDetail.post_pulse && this.currentPatientDetail.post_temp && this.currentPatientDetail.curr_flow && this.currentPatientDetail.fluid_removal &&
      this.currentPatientDetail.complication && this.currentPatientDetail.drugs){
        this.currentPatientDetail.active_flag = 'Y';
      }else {
        this.currentPatientDetail.active_flag = null;
      }
  }

  isrequiredSaveBtn() {
    this.validateFlag();
    this.patientDialysisHistory.forEach((element: any)=> {
      if(element.active_flag == 'Y') {
        this.save();
        this.isrequiredPrintBtn();
        this.dialog.open(InfoDialogComponent, {
          width: '300px',
          data: 'Insurance Saved Successfully!!!'
        })
      }
    });
  }

  isrequiredPrintBtn(){
    let count = 0;
    this.patientDialysisHistory.forEach((element: any)=> {
      if(element.active_flag !== 'Y' && count == 0) {
        this.isrequiredBtn = true;
        count++;
      }else if(element.active_flag == 'Y' && count == 0){
        this.isrequiredBtn = false;
      }
    });
  }

  //print all data
  printAllData(){
    this.patientDialysisHistory.forEach((element: any) => {
      this.getInvoiceNum.push(element.invoice_num);
    });
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), patient_id: this.patientHeader.patient_id,
      invoice_no: this.getInvoiceNum
    }
    this.insuranceService.printInsData(params).subscribe(data => {
      this.printData = data.results;
      this.isShowPrint = true;
      console.log("printResponse",data);
    })
  }

  //back
  back(){
    this.isShowPrint = false;
  }

  //patientHeaderData
  patientHeaderData(data: any) {
    if(!data){
      return;
    }
    this.dateForm.controls.month.setValue(data.month);
    this.dateForm.controls.year.setValue(data.year);
    this.showPatientList(data.data);
  }
}
