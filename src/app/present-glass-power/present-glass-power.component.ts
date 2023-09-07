import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PresentGlassPowerService } from './present-glass-power.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { UtilityService } from '../utilities/services/utility.service';

@Component({
  selector: 'app-present-glass-power',
  templateUrl: './present-glass-power.component.html',
  styleUrls: ['./present-glass-power.component.scss']
})
export class PresentGlassPowerComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  presentGlassPowerForm!: FormGroup;
  lensMaterialList: any = [];
  typeOfLensList: any = [];
  coatingList: any = [];
  showPreviousTable:boolean = false;
  pgpDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;
  distanceList: any = [];
  showVisitDate: any;
  showVisitNo: any;

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, 
              private utility: UtilityService,
              private pgpService: PresentGlassPowerService, 
              private ref: ReferenceService) { }

  ngOnInit(): void {
    this.presentGlassPower();
    this.ref.getPaymentModes('SPH').subscribe(data => {
      this.distanceList = data.results;
    })
    this.ref.getPaymentModes('PGP1').subscribe(data => {
      this.lensMaterialList = data.results;
    })
    this.ref.getPaymentModes('PGP2').subscribe(data => {
      this.typeOfLensList = data.results;
    })
    this.ref.getPaymentModes('PGP3').subscribe(data => {
      this.coatingList = data.results;
    })
  }

  presentGlassPower() {
    this.presentGlassPowerForm = this.formBuilder.group({
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
      sph_add_re: [],
      sph_add_le: [],
      lens_material: [],
      lens_type: [],
      lens_coating: []
    })
  }

  savePresentGlassPower() {
    const pgpForm = this.presentGlassPowerForm.controls;
    let params = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "user_id": localStorage.getItem('user_id'),
      "patient_id": this.headerDetail.patient_id,
      "visit_no": this.visit_no,
      "visit_date": this.visit_date,
      "sph_distance_re": pgpForm.sph_distance_re.value,
      "cyl_distance_re": pgpForm.cyl_distance_re.value,
      "axis_distance_re": pgpForm.axis_distance_re.value,
      "sph_distance_le": pgpForm.sph_distance_le.value,
      "cyl_distance_le": pgpForm.cyl_distance_le.value,
      "axis_distance_le": pgpForm.axis_distance_le.value,
      "sph_add_re": pgpForm.sph_add_re.value,
      "sph_add_le": pgpForm.sph_add_le.value,
      "sph_near_re": pgpForm.sph_near_re.value,
      "cyl_near_re": pgpForm.cyl_near_re.value,
      "axis_near_re": pgpForm.axis_near_re.value,
      "sph_near_le": pgpForm.sph_near_le.value,
      "cyl_near_le": pgpForm.cyl_near_le.value,
      "axis_near_le": pgpForm.axis_near_le.value,
      "lens_material": pgpForm.lens_material.value,
      "lens_type": pgpForm.lens_type.value,
      "lens_coating": pgpForm.lens_coating.value
    }
    this.pgpService.createPgp(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Present Glass Power Saved Successfully!!!'
      })
    })
  }

  getPgpDetail() {
    const patient_id = this.headerDetail.patient_id;
    this.pgpService.getPgp(patient_id).subscribe(data => {
      console.log('getPgp Data',data);
      this.pgpDetailData = data.results;
      this.pgpDetailData = this.pgpDetailData.reverse();
      this.setCurrentObjectData();
    })
  }

  setCurrentObjectData() {
    this.presentGlassPowerForm.patchValue(this.pgpDetailData[this.getLastRecordIndex()]);
    this.showVisitNo = this.pgpDetailData[this.getLastRecordIndex()].visit_no;
    this.showVisitDate = this.utility.convertDate(
      this.pgpDetailData[this.getLastRecordIndex()].visit_date
    );
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.pgpDetailData.length - 1;
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
    this.presentGlassPowerForm.patchValue(this.pgpDetailData[this.recordIndex]);
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getPgpDetail();
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }

  addRecord() {
    this.presentGlassPowerForm.reset();
  }

  addRight() {
    //@ts-ignore
    let getDetials = this.distanceList.filter(val => val.ref_code == this.presentGlassPowerForm.controls.sph_distance_re.value);

    const getValue = +getDetials[0].ref_desc + +this.presentGlassPowerForm.controls.sph_add_re.value;
    this.presentGlassPowerForm.controls.sph_near_re.setValue(getValue);
    this.presentGlassPowerForm.controls.cyl_near_re.setValue(this.presentGlassPowerForm.controls.cyl_distance_re.value);
    this.presentGlassPowerForm.controls.axis_near_re.setValue(this.presentGlassPowerForm.controls.axis_distance_re.value);
  }

  addLeft() {
    //@ts-ignore
    let getDetials = this.distanceList.filter(val => val.ref_code == this.presentGlassPowerForm.controls.sph_distance_le.value);

    const getValue = +getDetials[0].ref_desc + +this.presentGlassPowerForm.controls.sph_add_le.value;
    this.presentGlassPowerForm.controls.sph_near_le.setValue(getValue);
    this.presentGlassPowerForm.controls.cyl_near_le.setValue(this.presentGlassPowerForm.controls.cyl_distance_le.value);
    this.presentGlassPowerForm.controls.axis_near_le.setValue(this.presentGlassPowerForm.controls.axis_distance_le.value);
  }

  rightToLeft() {
    this.presentGlassPowerForm.controls.sph_distance_le.setValue(this.presentGlassPowerForm.controls.sph_distance_re.value);
    this.presentGlassPowerForm.controls.cyl_distance_le.setValue(this.presentGlassPowerForm.controls.cyl_distance_re.value);
    this.presentGlassPowerForm.controls.axis_distance_le.setValue(this.presentGlassPowerForm.controls.axis_distance_re.value);
    this.presentGlassPowerForm.controls.sph_near_le.setValue(this.presentGlassPowerForm.controls.sph_near_re.value);
    this.presentGlassPowerForm.controls.cyl_near_le.setValue(this.presentGlassPowerForm.controls.cyl_near_re.value);
    this.presentGlassPowerForm.controls.axis_near_le.setValue(this.presentGlassPowerForm.controls.axis_near_re.value);
  }

  leftToRight() {
    this.presentGlassPowerForm.controls.sph_distance_re.setValue(this.presentGlassPowerForm.controls.sph_distance_le.value);
    this.presentGlassPowerForm.controls.cyl_distance_re.setValue(this.presentGlassPowerForm.controls.cyl_distance_le.value);
    this.presentGlassPowerForm.controls.axis_distance_re.setValue(this.presentGlassPowerForm.controls.axis_distance_le.value);
    this.presentGlassPowerForm.controls.sph_near_re.setValue(this.presentGlassPowerForm.controls.sph_near_le.value);
    this.presentGlassPowerForm.controls.cyl_near_re.setValue(this.presentGlassPowerForm.controls.cyl_near_le.value);
    this.presentGlassPowerForm.controls.axis_near_re.setValue(this.presentGlassPowerForm.controls.axis_near_le.value);
  }
}
