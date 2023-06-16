import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { OpthalRefractionService } from './opthal-refraction.service';

@Component({
  selector: 'app-opthal-refraction',
  templateUrl: './opthal-refraction.component.html',
  styleUrls: ['./opthal-refraction.component.scss']
})
export class OpthalRefractionComponent implements OnInit {

  @Input() headerDetail: any;
  @Input() visit_no: any;
  @Input() visit_date: any;
  refractionDetail = {unaided_va_re: '', unaided_va_le: '', varx_re: '', varx_le: '', old_rx_re: '', old_rx_le: '', retina_re: '', retina_le: '', va_newrx_re: '', va_newrx_le: '', final_rx_re: '', final_rx_le: ''};
  refractionDetailData: any;
  prevCounter = 0;
  recordIndex: number | undefined;
  showPreviousTable = false;
  refractionForm!: FormGroup;

  constructor(
    private orService: OpthalRefractionService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.refraction();
  }

  refraction() {
    this.refractionForm = this.formBuilder.group({
      unaided_va_re: [null, []],
      unaided_va_le: [null, ],
      varx_re: [null, []],
      varx_le: [null, []],
      old_rx_re: [null, []],
      old_rx_le: [null, []],
      retina_re: [null, []],
      retina_le: [null, []],
      va_newrx_re: [null, []],
      va_newrx_le: [null, []],
      final_rx_re: [null, []],
      final_rx_le: [null, []],

    })
  }

  getRefractionDetail() {
    const org_id = localStorage.getItem('org_id');
    const branch_id = localStorage.getItem('branch_id');
    const patient_id = this.headerDetail.patient_id;
    const param_type = 'Refraction';
    this.orService.getRefraction(org_id, branch_id, patient_id, param_type).subscribe(data => {
      console.log('getRefraction Data',data);
      this.refractionDetailData = data.results;
      this.refractionDetailData = this.refractionDetailData.reverse();
      this.setCurrentRefractionData();
    })
  }

  saveRefractionParams() {
    console.log('refractionParams', this.refractionDetail);
    let params = {
      org_id: localStorage.getItem('org_id'),
      user_id: localStorage.getItem('user_id'),
      branch_id: localStorage.getItem('branch_id'),
      patient_id: this.headerDetail.patient_id,
      param_type: "Refraction",
      visit_date: this.visit_date,
      unaided_va_re: this.refractionForm.controls.unaided_va_re.value,
      unaided_va_le: this.refractionForm.controls.unaided_va_le.value,
      varx_re: this.refractionForm.controls.varx_re.value,
      varx_le: this.refractionForm.controls.varx_le.value,
      old_rx_re: this.refractionForm.controls.old_rx_re.value,
      old_rx_le: this.refractionForm.controls.old_rx_le.value,
      retina_re: this.refractionForm.controls.retina_re.value,
      retina_le: this.refractionForm.controls.retina_le.value,
      va_newrx_re: this.refractionForm.controls.va_newrx_re.value,
      va_newrx_le: this.refractionForm.controls.va_newrx_le.value,
      final_rx_re: this.refractionForm.controls.final_rx_re.value,
      final_rx_le: this.refractionForm.controls.final_rx_le.value,
      // unaided_va_re: this.refractionDetail.unaided_va_re,
      // unaided_va_le: this.refractionDetail.unaided_va_le,
      // varx_re: this.refractionDetail.varx_re,
      // varx_le: this.refractionDetail.varx_le,
      // old_rx_re: this.refractionDetail.old_rx_re,
      // old_rx_le: this.refractionDetail.old_rx_le,
      // retina_re: this.refractionDetail.retina_re,
      // retina_le: this.refractionDetail.retina_le,
      // va_newrx_re: this.refractionDetail.va_newrx_re,
      // va_newrx_le: this.refractionDetail.va_newrx_le,
      // final_rx_re: this.refractionDetail.final_rx_re,
      // final_rx_le: this.refractionDetail.final_rx_le
    }
    this.orService.createBasic(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Refraction Details Saved Successfully'
      })
    })
  }

  setCurrentRefractionData() {
    this.refractionForm.patchValue(this.refractionDetailData[this.getLastRecordIndex()]);
    // this.refractionDetail = this.refractionDetailData[this.getLastRecordIndex()];
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.refractionDetailData.length - 1;
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
    this.refractionForm.patchValue(this.refractionDetailData[this.recordIndex]);
    // this.refractionDetail = this.refractionDetailData[this.recordIndex]; // give us back the item of where we are now
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getRefractionDetail();
  }

  addRecord() {
    this.refractionForm.reset();
    // this.refractionForm.controls.unaided_va_re.setValue(null);
    // this.refractionForm.controls.unaided_va_le.setValue(null);
    // this.refractionForm.controls.varx_re.setValue(null);
    // this.refractionForm.controls.varx_le.setValue(null);
    // this.refractionForm.controls.old_rx_re.setValue(null);
    // this.refractionForm.controls.old_rx_le.setValue(null);
    // this.refractionForm.controls.retina_re.setValue(null);
    // this.refractionForm.controls.retina_le.setValue(null);
    // this.refractionForm.controls.va_newrx_re.setValue(null);
    // this.refractionForm.controls.va_newrx_le.setValue(null);
    // this.refractionForm.controls.final_rx_re.setValue(null);
    // this.refractionForm.controls.final_rx_le.setValue(null);
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }
}
