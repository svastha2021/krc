import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubjectAcceptanceService } from './subject-acceptance.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { UtilityService } from '../utilities/services/utility.service';

@Component({
  selector: 'app-subject-acceptance',
  templateUrl: './subject-acceptance.component.html',
  styleUrls: ['./subject-acceptance.component.scss']
})
export class SubjectAcceptanceComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  @Output() isActiveSubjective = new EventEmitter();
  subjectAcceptanceForm!: FormGroup;
  showPreviousTable:boolean = false;
  vaList = ['6/6', '6/9', '6/12', '6/18', '6/24', '6/36', '6/60', '5/60'];
  subjectDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;
  distanceList: any;
  showVisitDate: any;
  showVisitNo: any;
  subjectiveBoolean:boolean = false;

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private ref: ReferenceService,
              private utility: UtilityService,
              private saService: SubjectAcceptanceService) { }

  ngOnInit(): void {
    this.subjectAcceptance();

    this.ref.getPaymentModes('SPH').subscribe(data => {
      this.distanceList = data.results;
    })
  }

  subjectAcceptance() {
    this.subjectAcceptanceForm = this.formBuilder.group({
      units: [],
      sph_distance_re: [],
      cyl_distance_re: [],
      axis_distance_re: [],
      sph_distance_le: [],
      cyl_distance_le: [],
      axis_distance_le: [],
      sph_near_re: [],
      cyl_near_re: [],
      axis_near_re: [],
      sph_near_le: [],
      cyl_near_le: [],
      axis_near_le: [],
      va_distance_re: [],
      va_near_re: [],
      va_distance_le: [],
      va_near_le: [],
      sph_add_re: [],
      sph_add_le: [],
      lens_type: []
    })
  }

  saveSubjectAcceptance() {
    const subForm = this.subjectAcceptanceForm.controls;
    let params = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "user_id": localStorage.getItem('user_id'),
      "patient_id": this.headerDetail.patient_id,
      "visit_no": this.visit_no,
      "visit_date": this.visit_date,
      "units": subForm.units.value,
      "sph_distance_re": subForm.sph_distance_re.value,
      "cyl_distance_re": subForm.cyl_distance_re.value,
      "axis_distance_re": subForm.axis_distance_re.value,
      "va_distance_re": subForm.va_distance_re.value,
      "sph_distance_le": subForm.sph_distance_le.value,
      "cyl_distance_le": subForm.cyl_distance_le.value,
      "axis_distance_le": subForm.axis_distance_le.value,
      "va_distance_le": subForm.va_distance_le.value,
      "sph_add_re": subForm.sph_add_re.value,
      "sph_add_le": subForm.sph_add_le.value,
      "sph_near_re": subForm.sph_near_re.value,
      "cyl_near_re": subForm.cyl_near_re.value,
      "axis_near_re": subForm.axis_near_re.value,
      "va_near_re": subForm.va_near_re.value,
      "sph_near_le": subForm.sph_near_le.value,
      "cyl_near_le": subForm.cyl_near_le.value,
      "axis_near_le": subForm.axis_near_le.value,
      "va_near_le": subForm.va_near_le.value
    }
    this.saService.createSubject(params).subscribe(data => {
      console.log(data);
      this.subjectiveBoolean = true;
      this.emitSubjective();
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Subjective acceptance Saved Successfully!!!'
      })
    })
  }

  getSubjectDetail() {
    const patient_id = this.headerDetail.patient_id;
    this.saService.getSubject(patient_id).subscribe(data => {
      console.log('getPgp Data',data);
      this.subjectDetailData = data.results;
      this.subjectDetailData = this.subjectDetailData.reverse();
      this.setCurrentObjectData();
    })
  }

  setCurrentObjectData() {
    this.subjectAcceptanceForm.patchValue(this.subjectDetailData[this.getLastRecordIndex()]);
    this.showVisitNo = this.subjectDetailData[this.getLastRecordIndex()].visit_no;
    this.showVisitDate = this.utility.convertDate(
      this.subjectDetailData[this.getLastRecordIndex()].visit_date
    );
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
    this.subjectAcceptanceForm.patchValue(this.subjectDetailData[this.recordIndex]);
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getSubjectDetail();
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }

  addRecord() {
    this.subjectAcceptanceForm.reset();
  }

  addRight() {
    //@ts-ignore
    let getDetials = this.distanceList.filter(val => val.ref_code == this.subjectAcceptanceForm.controls.sph_distance_re.value);

    const getValue = +getDetials[0].ref_desc + +this.subjectAcceptanceForm.controls.sph_add_re.value;
    this.subjectAcceptanceForm.controls.sph_near_re.setValue(getValue);
    this.subjectAcceptanceForm.controls.cyl_near_re.setValue(this.subjectAcceptanceForm.controls.cyl_distance_re.value);
    this.subjectAcceptanceForm.controls.axis_near_re.setValue(this.subjectAcceptanceForm.controls.axis_distance_re.value);
    this.subjectAcceptanceForm.controls.va_near_re.setValue(this.subjectAcceptanceForm.controls.va_distance_re.value);
  }

  addLeft() {
    //@ts-ignore
    let getDetials = this.distanceList.filter(val => val.ref_code == this.subjectAcceptanceForm.controls.sph_distance_le.value);

    const getValue = +getDetials[0].ref_desc + +this.subjectAcceptanceForm.controls.sph_add_le.value;
    this.subjectAcceptanceForm.controls.sph_near_le.setValue(getValue);
    this.subjectAcceptanceForm.controls.cyl_near_le.setValue(this.subjectAcceptanceForm.controls.cyl_distance_le.value);
    this.subjectAcceptanceForm.controls.axis_near_le.setValue(this.subjectAcceptanceForm.controls.axis_distance_le.value);
    this.subjectAcceptanceForm.controls.va_near_le.setValue(this.subjectAcceptanceForm.controls.va_distance_le.value);
  }

  rightToLeft() {
    this.subjectAcceptanceForm.controls.sph_distance_re.setValue(this.subjectAcceptanceForm.controls.sph_distance_le.value);
    this.subjectAcceptanceForm.controls.cyl_distance_re.setValue(this.subjectAcceptanceForm.controls.cyl_distance_le.value);
    this.subjectAcceptanceForm.controls.axis_distance_re.setValue(this.subjectAcceptanceForm.controls.axis_distance_le.value);
    this.subjectAcceptanceForm.controls.va_distance_re.setValue(this.subjectAcceptanceForm.controls.va_distance_le.value);
    this.subjectAcceptanceForm.controls.sph_near_re.setValue(this.subjectAcceptanceForm.controls.sph_near_le.value);
    this.subjectAcceptanceForm.controls.cyl_near_re.setValue(this.subjectAcceptanceForm.controls.cyl_near_le.value);
    this.subjectAcceptanceForm.controls.axis_near_re.setValue(this.subjectAcceptanceForm.controls.axis_near_le.value);
    this.subjectAcceptanceForm.controls.va_near_re.setValue(this.subjectAcceptanceForm.controls.va_near_le.value);
  }

  leftToRight() {
    this.subjectAcceptanceForm.controls.sph_distance_le.setValue(this.subjectAcceptanceForm.controls.sph_distance_re.value);
    this.subjectAcceptanceForm.controls.cyl_distance_le.setValue(this.subjectAcceptanceForm.controls.cyl_distance_re.value);
    this.subjectAcceptanceForm.controls.axis_distance_le.setValue(this.subjectAcceptanceForm.controls.axis_distance_re.value);
    this.subjectAcceptanceForm.controls.va_distance_le.setValue(this.subjectAcceptanceForm.controls.va_distance_re.value);
    this.subjectAcceptanceForm.controls.sph_near_le.setValue(this.subjectAcceptanceForm.controls.sph_near_re.value);
    this.subjectAcceptanceForm.controls.cyl_near_le.setValue(this.subjectAcceptanceForm.controls.cyl_near_re.value);
    this.subjectAcceptanceForm.controls.axis_near_le.setValue(this.subjectAcceptanceForm.controls.axis_near_re.value);
    this.subjectAcceptanceForm.controls.va_near_le.setValue(this.subjectAcceptanceForm.controls.va_near_re.value);
  }

  emitSubjective() {
    this.isActiveSubjective.emit(
      this.subjectiveBoolean
    );
  }
}
