import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { IntraOcularPressureService } from './intra-ocular-pressure.service';
import { UtilityService } from '../utilities/services/utility.service';

@Component({
  selector: 'app-intra-ocular-pressure',
  templateUrl: './intra-ocular-pressure.component.html',
  styleUrls: ['./intra-ocular-pressure.component.scss']
})
export class IntraOcularPressureComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  @Output() isActiveIOP = new EventEmitter();
  intraOcularPressureForm!: FormGroup;
  showPreviousTable:boolean = false;
  vaList = ['6/6', '6/9', '6/12', '6/18', '6/24', '6/36', '6/60', '5/60'];
  subjectDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;
  iopList: any = [];
  showVisitDate: any;
  showVisitNo: any;
  iopBoolean:boolean = false;

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, 
              private utility: UtilityService,
              private iopService: IntraOcularPressureService) { }
  
    ngOnInit(): void {
      this.intraOcularPressure();
    }
  
    intraOcularPressure() {
      this.intraOcularPressureForm = this.formBuilder.group({
        org_id: [],
        branch_id: [],
        user_id: [],
        patient_id: [],
        visit_no: [],
        visit_date: [],
        iop_type: [],
        pressure_re: [],
        pressure_le: [],
        timer: [],
        remarks: [],
        checkbox: []
      })
    }
  
    saveintraOcularPressure() {
      let params = {
        "iop_data": this.iopList
      }
      this.iopService.createIop(params).subscribe(data => {
        console.log(data);
        this.iopBoolean = true;
        this.emitIOP();
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: 'Intra Ocular Pressure Saved Successfully!!!'
        })
      })
      this.iopList.length = 0
    }
  
    getIopDetail() {
      const patient_id = this.headerDetail.patient_id;
      this.iopService.getIop(patient_id).subscribe(data => {
        this.iopList = data.results;
        this.iopList = this.iopList.reverse();
        this.subjectDetailData = data.results;
        this.subjectDetailData = this.subjectDetailData.reverse();
        this.setCurrentObjectData();
      })
    }
  
    setCurrentObjectData() {
      this.intraOcularPressureForm.patchValue(this.subjectDetailData[this.getLastRecordIndex()]);
      this.showVisitNo = this.subjectDetailData[this.getLastRecordIndex()].visit_no;
      this.showVisitDate = this.utility.convertDate(
        this.subjectDetailData[this.getLastRecordIndex()].visit_date
      );
      if (this.getLastRecordIndex() <= 0) {
        this.recordIndex = 0;
      }
    }
  
    getLastRecordIndex() {
      return this.iopList.length - 1;
    }
  
    prevItem() {
      this.prevCounter++;
      this.setCurrentNotesAfterChange();
    }
  
    nextItem() {
      this.prevCounter--;
      this.setCurrentNotesAfterChange();
    }
  
    setCurrentNotesAfterChange() {
      this.recordIndex = this.getLastRecordIndex() - this.prevCounter;
      this.intraOcularPressureForm.patchValue(this.subjectDetailData[this.recordIndex]);
    }
  
    displayPrevious() {
      this.showPreviousTable = true;
      this.getIopDetail();
    }
  
    back() {
      this.showPreviousTable = false;
      this.iopList.length = 0;
      this.addRecord();
    }
  
    addRecord() {
      this.intraOcularPressureForm.reset();
    }

    addIopDataToArr() {
      if(!this.intraOcularPressureForm.value.iop_type || !this.intraOcularPressureForm.value.pressure_re || !this.intraOcularPressureForm.value.pressure_le
        || !this.intraOcularPressureForm.value.timer){
          return;
      }
      this.intraOcularPressureForm.controls.org_id.setValue(localStorage.getItem('org_id'));
      this.intraOcularPressureForm.controls.branch_id.setValue(localStorage.getItem('branch_id'));
      this.intraOcularPressureForm.controls.user_id.setValue(localStorage.getItem('user_id'));
      this.intraOcularPressureForm.controls.patient_id.setValue(this.headerDetail.patient_id);
      this.intraOcularPressureForm.controls.visit_no.setValue(this.visit_no);
      this.intraOcularPressureForm.controls.visit_date.setValue(this.visit_date);

      this.iopList.push(this.intraOcularPressureForm.value);
      this.intraOcularPressureForm.reset();
      this.intraOcularPressureForm.controls.checkbox.setValue(false);
    }

    setCurrentTime(completed: boolean) {
      this.intraOcularPressureForm.controls.timer.setValue(null);
      if(completed) {
        const currentDate = new Date();
        const timestamp = currentDate.toLocaleTimeString();
        this.intraOcularPressureForm.controls.timer.setValue(timestamp);
      }
    }

    emitIOP() {
      this.isActiveIOP.emit(
        this.iopBoolean
      );
    }
}
