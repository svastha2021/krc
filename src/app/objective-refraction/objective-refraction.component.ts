import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObjectiveRefractionService } from './objective-refraction.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { UtilityService } from '../utilities/services/utility.service';

@Component({
  selector: 'app-objective-refraction',
  templateUrl: './objective-refraction.component.html',
  styleUrls: ['./objective-refraction.component.scss']
})
export class ObjectiveRefractionComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  objectiveRefractionForm!: FormGroup;
  refractionTypes: any = [];
  showPreviousTable:boolean = false;
  objectDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;
  showVisitDate: any;
  showVisitNo: any;

  constructor(private dialog: MatDialog,
              private utility: UtilityService,
              private formBuilder: FormBuilder,
              private orService: ObjectiveRefractionService, 
              private ref: ReferenceService) { }

  ngOnInit(): void {
    this.objectiveRefraction();
    this.ref.getPaymentModes('OBJREF').subscribe(data => {
      this.refractionTypes = data.results;
    })
  }

  objectiveRefraction() {
    this.objectiveRefractionForm = this.formBuilder.group({
      obj_ref_type_re: [],
      sph_re: [],
      cyl_re: [],
      axis_re: [],
      obj_ref_type_le: [],
      sph_le: [],
      cyl_le: [],
      axis_le: [],
      refr_type: []
    })
  }

  saveObjectiveRefraction() {
    const objForm = this.objectiveRefractionForm.controls;
    let params = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "user_id": localStorage.getItem('user_id'),
      "patient_id": this.headerDetail.patient_id,
      "visit_no": this.visit_no,
      "visit_date": this.visit_date,
      "obj_ref_type_re": objForm.obj_ref_type_re.value,
      "sph_re": objForm.sph_re.value,
      "cyl_re": objForm.cyl_re.value,
      "axis_re": objForm.axis_re.value,
      "obj_ref_type_le": objForm.obj_ref_type_le.value,
      "sph_le": objForm.sph_le.value,
      "cyl_le": objForm.cyl_le.value,
      "axis_le": objForm.axis_le.value,
      "refr_type": objForm.refr_type.value
    }
    this.orService.createObject(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Objective Refraction Saved Successfully!!!'
      })
    })
  }

  getObjectDetail() {
    const patient_id = this.headerDetail.patient_id;
    this.orService.getObject(patient_id).subscribe(data => {
      console.log('getBasic Data',data);
      this.objectDetailData = data.results;
      this.objectDetailData = this.objectDetailData.reverse();
      this.setCurrentObjectData();
    })
  }

  setCurrentObjectData() {
    this.objectiveRefractionForm.patchValue(this.objectDetailData[this.getLastRecordIndex()]);
    this.showVisitNo = this.objectDetailData[this.getLastRecordIndex()].visit_no;
    this.showVisitDate = this.utility.convertDate(
      this.objectDetailData[this.getLastRecordIndex()].visit_date
    );
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.objectDetailData.length - 1;
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
    this.objectiveRefractionForm.patchValue(this.objectDetailData[this.recordIndex]);
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getObjectDetail();
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }

  addRecord() {
    this.objectiveRefractionForm.reset();
  }

  rightToLeft() {
    this.objectiveRefractionForm.controls.obj_ref_type_re.setValue(this.objectiveRefractionForm.controls.obj_ref_type_le.value);
    this.objectiveRefractionForm.controls.sph_re.setValue(this.objectiveRefractionForm.controls.sph_le.value);
    this.objectiveRefractionForm.controls.cyl_re.setValue(this.objectiveRefractionForm.controls.cyl_le.value);
    this.objectiveRefractionForm.controls.axis_re.setValue(this.objectiveRefractionForm.controls.axis_le.value);
  }

  leftToRight() {
    this.objectiveRefractionForm.controls.obj_ref_type_le.setValue(this.objectiveRefractionForm.controls.obj_ref_type_re.value);
    this.objectiveRefractionForm.controls.sph_le.setValue(this.objectiveRefractionForm.controls.sph_re.value);
    this.objectiveRefractionForm.controls.cyl_le.setValue(this.objectiveRefractionForm.controls.cyl_re.value);
    this.objectiveRefractionForm.controls.axis_le.setValue(this.objectiveRefractionForm.controls.axis_re.value);
  }
}
