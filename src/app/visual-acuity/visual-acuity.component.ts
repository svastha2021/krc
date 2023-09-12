import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VisualAcuityService } from './visual-acuity.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { UtilityService } from '../utilities/services/utility.service';

@Component({
  selector: 'app-visual-acuity',
  templateUrl: './visual-acuity.component.html',
  styleUrls: ['./visual-acuity.component.scss']
})
export class VisualAcuityComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  @Output() isActiveVisual = new EventEmitter();
  visualAcuityForm!: FormGroup;
  showPreviousTable:boolean = false;
  visualDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;
  showVisitDate: any;
  showVisitNo: any;
  visualAcuityBoolean: boolean = false;

  constructor(private dialog: MatDialog,
              private utility: UtilityService,
              private formBuilder: FormBuilder, 
              private vaService: VisualAcuityService) { }

  ngOnInit(): void {
    this.visualAcuity();
  }

  visualAcuity() {
    this.visualAcuityForm = this.formBuilder.group({
      units: [],
      unaided_distance_re: [],
      aided_distance_re: [],
      pinhole_distance_re: [],
      color_vision_distance_re: [],
      neartype_re: [],
      unaided_near_re: [],
      aided_near_re: [],
      unaided_distance_le: [],
      aided_distance_le: [],
      pinhole_distance_le: [],
      color_vision_distance_le: [],
      neartype_le: [],
      unaided_near_le: [],
      aided_near_le: []
    })
  }
  receiveText(value:string, field:string){
    console.log(value)
    this.visualAcuityForm.controls[field].setValue(value);
    // if(field === 'unaided_distance_re'){
    //   this.visualAcuityForm.controls['unaided_distance_re'].setValue(value);
    // }
  }
  saveVisualAcuity() {
    const visualForm = this.visualAcuityForm.controls;
    let params = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "user_id": localStorage.getItem('user_id'),
      "patient_id": this.headerDetail.patient_id,
      "visit_no": this.visit_no,
      "visit_date": this.visit_date,
      "units": visualForm.units.value,
      "unaided_distance_re": visualForm.unaided_distance_re.value,
      "aided_distance_re": visualForm.aided_distance_re.value,
      "pinhole_distance_re": visualForm.pinhole_distance_re.value,
      "color_vision_distance_re": visualForm.color_vision_distance_re.value,
      "neartype_re": visualForm.neartype_re.value,
      "unaided_near_re": visualForm.unaided_near_re.value,
      "aided_near_re": visualForm.aided_near_re.value,
      "unaided_distance_le": visualForm.unaided_distance_le.value,
      "aided_distance_le": visualForm.aided_distance_le.value,
      "pinhole_distance_le": visualForm.pinhole_distance_le.value,
      "color_vision_distance_le": visualForm.color_vision_distance_le.value,
      "neartype_le": visualForm.neartype_le.value,
      "unaided_near_le": visualForm.unaided_near_le.value,
      "aided_near_le": visualForm.aided_near_le.value
    }
    this.vaService.createVisual(params).subscribe(data => {
      console.log(data);
      this.visualAcuityBoolean = true;
      this.emitVisual();
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Visual Acuity Saved Successfully!!!'
      })
      this.addRecord();
    })
  }

  getVisualDetail() {
    const patient_id = this.headerDetail.patient_id;
    this.vaService.getVisual(patient_id).subscribe(data => {
      console.log('getVisual Data',data);
      this.visualDetailData = data.results;
      this.visualDetailData = this.visualDetailData.reverse();
      this.setCurrentObjectData();
    })
  }

  setCurrentObjectData() {
    this.visualAcuityForm.patchValue(this.visualDetailData[this.getLastRecordIndex()]);
    this.showVisitNo = this.visualDetailData[this.getLastRecordIndex()].visit_no;
    this.showVisitDate = this.utility.convertDate(
      this.visualDetailData[this.getLastRecordIndex()].visit_date
    );
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.visualDetailData.length - 1;
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
    this.visualAcuityForm.patchValue(this.visualDetailData[this.recordIndex]);
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getVisualDetail();
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }

  addRecord() {
    this.visualAcuityForm.reset();
  }

  rightToLeft() {
    this.visualAcuityForm.controls.neartype_re.setValue(this.visualAcuityForm.controls.neartype_le.value);
    this.visualAcuityForm.controls.unaided_distance_re.setValue(this.visualAcuityForm.controls.unaided_distance_le.value);
    this.visualAcuityForm.controls.unaided_near_re.setValue(this.visualAcuityForm.controls.unaided_near_le.value);
    this.visualAcuityForm.controls.aided_distance_re.setValue(this.visualAcuityForm.controls.aided_distance_le.value);
    this.visualAcuityForm.controls.aided_near_re.setValue(this.visualAcuityForm.controls.aided_near_le.value);
    this.visualAcuityForm.controls.pinhole_distance_re.setValue(this.visualAcuityForm.controls.pinhole_distance_le.value);
    this.visualAcuityForm.controls.color_vision_distance_re.setValue(this.visualAcuityForm.controls.color_vision_distance_le.value);
  }

  leftToRight() {
    this.visualAcuityForm.controls.neartype_le.setValue(this.visualAcuityForm.controls.neartype_re.value);
    this.visualAcuityForm.controls.unaided_distance_le.setValue(this.visualAcuityForm.controls.unaided_distance_re.value);
    this.visualAcuityForm.controls.unaided_near_le.setValue(this.visualAcuityForm.controls.unaided_near_re.value);
    this.visualAcuityForm.controls.aided_distance_le.setValue(this.visualAcuityForm.controls.aided_distance_re.value);
    this.visualAcuityForm.controls.aided_near_le.setValue(this.visualAcuityForm.controls.aided_near_re.value);
    this.visualAcuityForm.controls.pinhole_distance_le.setValue(this.visualAcuityForm.controls.pinhole_distance_re.value);
    this.visualAcuityForm.controls.color_vision_distance_le.setValue(this.visualAcuityForm.controls.color_vision_distance_re.value);
  }

  emitVisual() {
    this.isActiveVisual.emit(
      this.visualAcuityBoolean
    );
  }
}
