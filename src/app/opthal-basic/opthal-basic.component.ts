import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { OpthalBasicService } from './opthal-basic.service';

@Component({
  selector: 'app-opthal-basic',
  templateUrl: './opthal-basic.component.html',
  styleUrls: ['./opthal-basic.component.scss']
})
export class OpthalBasicComponent implements OnInit {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  basicDetail = { vis_act_re: '', vis_act_le: '', pupils_re: '', pupils_le: '', ocular_re: '', ocular_le: '', ext_exam_re: '', ext_exam_le: '', slit_exam_re: '', slit_exam_le: '', fund_exam_re: '', fund_exam_le: ''};
  basicDetailData: any;
  prevCounter = 0;
  recordIndex: number | undefined;
  showPreviousTable = false;
  basicForm! : FormGroup;

  constructor(
    private obService: OpthalBasicService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.basic();
  }

  basic() {
    this.basicForm = this.formBuilder.group({
      vis_act_re: [null, []],
      vis_act_le: [null, []],
      pupils_re: [null, []],
      pupils_le: [null, []],
      ocular_re: [null, []],
      ocular_le: [null, []],
      ext_exam_re: [null, []],
      ext_exam_le: [null, []],
      slit_exam_re: [null, []],
      slit_exam_le: [null, []],
      fund_exam_re: [null, []],
      fund_exam_le: [null, []]
    })
  }

  getBasicDetail() {
    const org_id = localStorage.getItem('org_id');
    const branch_id = localStorage.getItem('branch_id');
    const patient_id = this.headerDetail.patient_id;
    const param_type = 'Basic';
    this.obService.getBasic(org_id, branch_id, patient_id, param_type).subscribe(data => {
      console.log('getBasic Data',data);
      this.basicDetailData = data.results;
      this.basicDetailData = this.basicDetailData.reverse();
      this.setCurrentBasicData();
    })
  }

  saveBasicParams() {
    let params = {
      org_id: localStorage.getItem('org_id'),
      user_id: localStorage.getItem('user_id'),
      branch_id: localStorage.getItem('branch_id'),
      patient_id: this.headerDetail.patient_id,
      param_type: "Basic",
      visit_date: this.visit_date,
      ext_exam_re: this.basicForm.controls.ext_exam_re.value,
      ext_exam_le: this.basicForm.controls.ext_exam_le.value,
      fund_exam_re: this.basicForm.controls.fund_exam_re.value,
      fund_exam_le: this.basicForm.controls.fund_exam_le.value,
      ocular_re: this.basicForm.controls.ocular_re.value,
      ocular_le: this.basicForm.controls.ocular_le.value,
      pupils_re: this.basicForm.controls.pupils_re.value,
      pupils_le: this.basicForm.controls.pupils_le.value,
      slit_exam_re: this.basicForm.controls.slit_exam_re.value,
      slit_exam_le: this.basicForm.controls.slit_exam_le.value,
      vis_act_re: this.basicForm.controls.vis_act_re.value,
      vis_act_le: this.basicForm.controls.vis_act_le.value
      // ext_exam_re: this.basicDetail.ext_exam_re,
      // ext_exam_le: this.basicDetail.ext_exam_le,
      // fund_exam_re: this.basicDetail.fund_exam_re,
      // fund_exam_le: this.basicDetail.fund_exam_le,
      // ocular_re: this.basicDetail.ocular_re,
      // ocular_le: this.basicDetail.ocular_le,
      // pupils_re: this.basicDetail.pupils_re,
      // pupils_le: this.basicDetail.pupils_le,
      // slit_exam_re: this.basicDetail.slit_exam_re,
      // slit_exam_le: this.basicDetail.slit_exam_le,
      // vis_act_re: this.basicDetail.vis_act_re,
      // vis_act_le: this.basicDetail.vis_act_le
    }
    this.obService.createBasic(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Basic Details Saved Successfully'
      })
    })
  }

  setCurrentBasicData() {
    this.basicForm.patchValue(this.basicDetailData[this.getLastRecordIndex()]);
    // this.basicDetail = this.basicDetailData[this.getLastRecordIndex()];
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.basicDetailData.length - 1;
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
    this.basicForm.patchValue(this.basicDetailData[this.recordIndex]);
    // this.basicDetail = this.basicDetailData[this.recordIndex]; // give us back the item of where we are now
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getBasicDetail();
  }

  addRecord() {
    this.basicForm.reset();
    // this.basicDetail.ext_exam_re = '';
    // this.basicDetail.ext_exam_le = '';
    // this.basicDetail.fund_exam_re = '';
    // this.basicDetail.fund_exam_le = '';
    // this.basicDetail.ocular_re = '';
    // this.basicDetail.ocular_le = '';
    // this.basicDetail.pupils_re = '';
    // this.basicDetail.pupils_le = '';
    // this.basicDetail.slit_exam_re = '';
    // this.basicDetail.slit_exam_le = '';
    // this.basicDetail.vis_act_re = '';
    // this.basicDetail.vis_act_le = '';
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }

}
