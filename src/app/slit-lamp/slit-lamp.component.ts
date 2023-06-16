import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { ReferenceService } from '../utilities/services/reference.service';
import { SlitLampService } from './slit-lamp.service';

@Component({
  selector: 'app-slit-lamp',
  templateUrl: './slit-lamp.component.html',
  styleUrls: ['./slit-lamp.component.scss']
})
export class SlitLampComponent implements OnInit {

  @Input() headerDetail: any;
  @Input() visit_no: any;
  @Input() visit_date: any;
  slit1: any;
  slit2: any;
  slit3: any;
  slit4: any;
  slit5: any;
  slit6: any;
  slit7: any;
  slit8: any;
  slit9: any;
  slit10: any;
  slitLampForm!: FormGroup;
  showPreviousTable = false;
  slitLampDetailData: any;
  prevCounter = 0;
  recordIndex: number | undefined;
  
  constructor(
    private slService: SlitLampService,
    private ref: ReferenceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.slitLamp();

    this.ref.getPaymentModes('SLIT1').subscribe(data => {
      this.slit1 = data.results;
    })
    this.ref.getPaymentModes('SLIT2').subscribe(data => {
      this.slit2 = data.results;
    })
    this.ref.getPaymentModes('SLIT3').subscribe(data => {
      this.slit3 = data.results;
    })
    this.ref.getPaymentModes('SLIT4').subscribe(data => {
      this.slit4 = data.results;
    })
    this.ref.getPaymentModes('SLIT5').subscribe(data => {
      this.slit5 = data.results;
    })
    this.ref.getPaymentModes('SLIT6').subscribe(data => {
      this.slit6 = data.results;
    })
    this.ref.getPaymentModes('SLIT7').subscribe(data => {
      this.slit7 = data.results;
    })
    this.ref.getPaymentModes('SLIT8').subscribe(data => {
      this.slit8 = data.results;
    })
    this.ref.getPaymentModes('SLIT9').subscribe(data => {
      this.slit9 = data.results;
    })
    this.ref.getPaymentModes('SLIT10').subscribe(data => {
      this.slit10 = data.results;
    })
  }

  slitLamp() {
    this.slitLampForm = this.formBuilder.group({
      lids_lashes: [null, []],
      conjuctiva: [null, ],
      cornea: [null, []],
      anterior_chamber: [null, []],
      iris: [null, []],
      lens: [null, []],
      anterior_vitrious: [null, []],
      undilated_fundus: [null, []],
      dilated_fundus: [null, []],
      fundus_findings: [null, []],
      lids_lashes_remarks: [null, []],
      conjuctiva_remarks: [null, []],
      cornea_remarks: [null, []],
      anterior_chamber_remarks: [null, []],
      iris_remarks: [null, []],
      lens_remarks: [null, []],
      anterior_vitrious_remarks:  [null, []],
      undilated_fundus_remarks: [null, []],
      dilated_fundus_remarks: [null, []],
      fundus_findings_remarks: [null, []]
    })
  }

  getSlitLampDetail() {
    const org_id = localStorage.getItem('org_id');
    const branch_id = localStorage.getItem('branch_id');
    const patient_id = this.headerDetail.patient_id;
    this.slService.getSlitLamp(org_id, branch_id, patient_id).subscribe(data => {
      console.log('getRefraction Data',data);
      this.slitLampDetailData = data.results;
      this.slitLampDetailData = this.slitLampDetailData.reverse();
      this.setCurrentSlitLampData();
    })
  }

  setCurrentSlitLampData() {
    this.slitLampForm.patchValue(this.slitLampDetailData[this.getLastRecordIndex()]);
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.slitLampDetailData.length - 1;
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
    this.slitLampForm.patchValue(this.slitLampDetailData[this.recordIndex]); // give us back the item of where we are now
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getSlitLampDetail();
  }

  saveSlitLamp() {
    let params = {
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      patient_id: this.headerDetail.patient_id,
      visit_date: this.visit_date,
      lids_lashes: this.slitLampForm.controls.lids_lashes.value,
      conjuctiva: this.slitLampForm.controls.conjuctiva.value,
      cornea: this.slitLampForm.controls.cornea.value,
      anterior_chamber: this.slitLampForm.controls.anterior_chamber.value,
      iris: this.slitLampForm.controls.iris.value,
      lens: this.slitLampForm.controls.lens.value,
      anterior_vitrious: this.slitLampForm.controls.anterior_vitrious.value,
      undilated_fundus: this.slitLampForm.controls.undilated_fundus.value,
      dilated_fundus: this.slitLampForm.controls.dilated_fundus.value,
      fundus_findings: this.slitLampForm.controls.fundus_findings.value,
      lids_lashes_remarks: this.slitLampForm.controls.lids_lashes_remarks.value,
      conjuctiva_remarks: this.slitLampForm.controls.conjuctiva_remarks.value,
      cornea_remarks: this.slitLampForm.controls.cornea_remarks.value,
      anterior_chamber_remarks: this.slitLampForm.controls.anterior_chamber_remarks.value,
      iris_remarks: this.slitLampForm.controls.iris_remarks.value,
      lens_remarks: this.slitLampForm.controls.lens_remarks.value,
      anterior_vitrious_remarks: this.slitLampForm.controls.anterior_vitrious_remarks.value,
      undilated_fundus_remarks: this.slitLampForm.controls.undilated_fundus_remarks.value,
      dilated_fundus_remarks: this.slitLampForm.controls.dilated_fundus_remarks.value,
      fundus_findings_remarks: this.slitLampForm.controls.fundus_findings_remarks.value
    }
    this.slService.createSlitLamp(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Slit Lamp Examination Saved Successfully'
      })
    })
  }

  addRecord() {
    this.slitLampForm.reset();
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }
}
