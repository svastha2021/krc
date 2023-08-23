import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { IntraOcularPressureService } from './intra-ocular-pressure.service';

@Component({
  selector: 'app-intra-ocular-pressure',
  templateUrl: './intra-ocular-pressure.component.html',
  styleUrls: ['./intra-ocular-pressure.component.scss']
})
export class IntraOcularPressureComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  intraOcularPressureForm!: FormGroup;
  showPreviousTable:boolean = false;
  vaList = ['6/6', '6/9', '6/12', '6/18', '6/24', '6/36', '6/60', '5/60'];
  subjectDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;
  iopList: any = [];

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, 
              private iopService: IntraOcularPressureService) { }
  
    ngOnInit(): void {
      this.intraOcularPressure();
    }
  
    intraOcularPressure() {
      this.intraOcularPressureForm = this.formBuilder.group({
        iop_type: [],
        pressure_re: [],
        pressure_le: [],
        timer: [],
        remarks: [],
        checkbox: []
      })
    }
  
    saveintraOcularPressure() {
      // const intraForm = this.intraOcularPressureForm.controls;
      // let params = {
      //   "org_id": localStorage.getItem('org_id'),
      //   "branch_id": localStorage.getItem('branch_id'),
      //   "user_id": localStorage.getItem('user_id'),
      //   "patient_id": this.headerDetail.patient_id,
      //   "visit_no": this.visit_no,
      //   "visit_date": this.visit_date,
      //   "seq_no": null,
      //   "iop_type": intraForm.iop_type.value,
      //   "pressure_re": intraForm.pressure_re.value,
      //   "pressure_le": intraForm.pressure_le.value,
      //   "timer": intraForm.timer.value,
      //   "remarks": intraForm.remarks.value,
      // }
      let params = this.iopList;
      this.iopService.createIop(params).subscribe(data => {
        console.log(data);
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: 'Intra Ocular Pressure Saved Successfully!!!'
        })
      })
    }
  
    getIopDetail() {
      const patient_id = this.headerDetail.patient_id;
      this.iopService.getIop(patient_id).subscribe(data => {
        console.log('getPgp Data',data);
        this.subjectDetailData = data.results;
        this.subjectDetailData = this.subjectDetailData.reverse();
        this.setCurrentObjectData();
      })
    }
  
    setCurrentObjectData() {
      this.intraOcularPressureForm.patchValue(this.subjectDetailData[this.getLastRecordIndex()]);
      if (this.getLastRecordIndex() <= 0) {
        this.recordIndex = 0;
      }
    }
  
    getLastRecordIndex() {
      return this.subjectDetailData.length - 1;
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
      this.addRecord();
    }
  
    addRecord() {
      this.intraOcularPressureForm.reset();
    }

    addIopDataToArr() {
      if(!this.intraOcularPressureForm.value.iop_type && !this.intraOcularPressureForm.value.pressure_re && !this.intraOcularPressureForm.value.pressure_le
        && !this.intraOcularPressureForm.value.timer){
          return;
      }
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
}
