import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { OpthalSpectacleService } from './opthal-spectacle.service';

@Component({
  selector: 'app-opthal-spectacle',
  templateUrl: './opthal-spectacle.component.html',
  styleUrls: ['./opthal-spectacle.component.scss']
})
export class OpthalSpectacleComponent implements OnInit {

  @Input() headerDetail: any;
  @Input() visit_no: any;
  @Input() visit_date: any;
  spectacleDetail = {sphere_re: '', sphere_le: '', cylinder_re: '', cylinder_le: '', axis_re: '', axis_le: '', add_re: '', add_le: ''};
  SpectacleData: any;
  spectacleDetailData: any;
  prevCounter = 0;
  recordIndex: number | undefined;
  showPreviousTable = false;
  specForm!: FormGroup;
  
  constructor(
    private osService: OpthalSpectacleService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.spec();
  }

  spec() {
    this.specForm = this.formBuilder.group(
      {
        sphere_re: [null, []],
        sphere_le: [null, ],
        cylinder_re: [null, []],
        cylinder_le: [null, []],
        axis_re: [null, []],
        axis_le: [null, []],
        add_re: [null, []],
        add_le: [null, []]
      }
    );
  }

  getSpectacleDetail() {
    const org_id = localStorage.getItem('org_id');
    const branch_id = localStorage.getItem('branch_id');
    const patient_id = this.headerDetail.patient_id;
    const param_type = 'spex';
    this.osService.getSpectacle(org_id, branch_id, patient_id, param_type).subscribe(data => {
      console.log('getspex Data',data);
      this.SpectacleData = data.results;
      this.spectacleDetailData = this.SpectacleData.reverse();
      this.setCurrentSpectacleData();
    })
  }

  saveSpectacleParams() {
    console.log('spectacleParams', this.specForm);
    let params = {
      org_id: localStorage.getItem('org_id'),
      user_id: localStorage.getItem('user_id'),
      branch_id: localStorage.getItem('branch_id'),
      patient_id: this.headerDetail.patient_id,
      param_type: "Spex",
      visit_date: this.visit_date,
      sphere_re: this.specForm.controls.sphere_re.value,
      sphere_le: this.specForm.controls.sphere_le.value,
      cylinder_re: this.specForm.controls.cylinder_re.value,
      cylinder_le: this.specForm.controls.cylinder_le.value,
      axis_re: this.specForm.controls.axis_re.value,
      axis_le: this.specForm.controls.axis_le.value,
      add_re: this.specForm.controls.add_re.value,
      add_le: this.specForm.controls.add_le.value
      // sphere_re: this.spectacleDetail.sphere_re,
      // sphere_le: this.spectacleDetail.sphere_le,
      // cylinder_re: this.spectacleDetail.cylinder_re,
      // cylinder_le: this.spectacleDetail.cylinder_le,
      // axis_re: this.spectacleDetail.axis_re,
      // axis_le: this.spectacleDetail.axis_le,
      // add_re: this.spectacleDetail.add_re,
      // add_le: this.spectacleDetail.add_le
    }
    this.osService.createSpectacle(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Spectacle Details Saved Successfully'
      })
    })
  }

  setCurrentSpectacleData() {
    this.specForm.patchValue(this.spectacleDetailData[this.getLastRecordIndex()]);
    // this.spectacleDetail = this.spectacleDetailData[this.getLastRecordIndex()];
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.spectacleDetailData.length - 1;
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
    this.specForm.patchValue(this.spectacleDetailData[this.recordIndex]);
    // this.spectacleDetail = this.spectacleDetailData[this.recordIndex]; // give us back the item of where we are now
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getSpectacleDetail();
  }

  addRecord() {
    this.specForm.reset();
    // this.specForm.controls.sphere_re.setValue(null);
    // this.specForm.controls.sphere_le.setValue(null);
    // this.specForm.controls.cylinder_re.setValue(null);
    // this.specForm.controls.cylinder_le.setValue(null);
    // this.specForm.controls.axis_re.setValue(null);
    // this.specForm.controls.axis_le.setValue(null);
    // this.specForm.controls.add_re.setValue(null);
    // this.specForm.controls.add_le.setValue(null);
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }
}
