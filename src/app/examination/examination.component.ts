import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExaminationService } from './examination.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss']
})
export class ExaminationComponent {

  @Input() headerDetail: any;
  @Input() visit_no: any;
  @Input() visit_date: any;
  examForm!: FormGroup;
  showPreviousTable = false;
  examDetailData: any;
  prevCounter = 0;
  recordIndex: number | undefined;
  eyeLidsList: any = [];
  conjuctivaList = ['Normal Movement', 'Ptosis'];
  corneaList = ['Normal Shape and Size'];
  irisList = ['Normal', 'Deep',  'Shallow/ Normal'];
  pupilList = ['Normal in Color', 'Anterior', 'Synechlon'];
  lensList: any = [];
  mediaList: any = [];
  opticDiscList = ['NS4', 'HM'];
  vitreousList: any = [];
  bloodVesselsList: any = [];
  maculaList: any = [];
  fundusList: any = [];
  depthList: any = [];
  syringingList: any = [];
  
  constructor(
    private examService: ExaminationService,
    private ref: ReferenceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.exam();

    this.ref.getPaymentModes('EYELID').subscribe(data => {
      this.eyeLidsList = data.results;
    })
    this.ref.getPaymentModes('ACD').subscribe(data => {
      this.depthList = data.results;
    })
    this.ref.getPaymentModes('LENS').subscribe(data => {
      this.lensList = data.results;
    })
    this.ref.getPaymentModes('Vitreous').subscribe(data => {
      this.vitreousList = data.results;
    })
    this.ref.getPaymentModes('Media').subscribe(data => {
      this.mediaList = data.results;
    })
    this.ref.getPaymentModes('BV').subscribe(data => {
      this.bloodVesselsList = data.results;
    })
    this.ref.getPaymentModes('Macula').subscribe(data => {
      this.maculaList = data.results;
    })
    this.ref.getPaymentModes('Fundus').subscribe(data => {
      this.fundusList = data.results;
    })
    this.ref.getPaymentModes('Syringing').subscribe(data => {
      this.syringingList = data.results;
    })
  }

  exam() {
    this.examForm = this.formBuilder.group({
      ant_eyelids_re: [null],
      ant_eyelashes_re: [null],
      ant_conjuctiva_re: [null],
      ant_cornea_re: [null],
      ant_champer_depth_re: [null],
      ant_iris_re: [null],
      ant_pupil_re: [null],
      ant_lens_re: [null],
      ant_sclera_re: [null],
      ant_eyelids_le: [null],
      ant_eyelashes_le: [null],
      ant_conjuctiva_le: [null],
      ant_cornea_le: [null],
      ant_champer_depth_le: [null],
      ant_iris_le: [null],
      ant_pupil_le: [null],
      ant_lens_le: [null],
      ant_sclera_le: [null],
      ant_eyelids_remarks_re: [null],
      ant_eyelashes_remarks_re: [null],
      ant_conjuctiva_remarks_re: [null],
      ant_cornea_remarks_re: [null],
      ant_champer_depth_remarks_re: [null],
      ant_iris_remarks_re: [null],
      ant_pupil_remarks_re: [null],
      ant_lens_remarks_re: [null],
      ant_sclera_remarks_re: [null],
      ant_eyelids_remarks_le: [null],
      ant_eyelashes_remarks_le: [null],
      ant_conjuctiva_remarks_le: [null],
      ant_cornea_remarks_le: [null],
      ant_champer_depth_remarks_le: [null],
      ant_iris_remarks_le: [null],
      ant_pupil_remarks_le: [null],
      ant_lens_remarks_le: [null],
      ant_sclera_remarks_le: [null],
      post_vitreous_re: [null],
      post_media_re: [null],
      post_opticdisc_re: [null],
      post_bloodvessels_re: [null],
      post_macula_re: [null],
      post_fundus_re: [null],
      post_cdr_re: [null],
      post_others_re: [null],
      post_vitreous_le: [null],
      post_media_le: [null],
      post_opticdisc_le: [null],
      post_bloodvessels_le: [null],
      post_macula_le: [null],
      post_fundus_le: [null],
      post_cdr_le: [null],
      post_others_le: [null],
      post_vitreous_remarks_re: [null],
      post_media_remarks_re: [null],
      post_opticdisc_remarks_re: [null],
      post_bloodvessels_remarks_re: [null],
      post_macula_remarks_re: [null],
      post_fundus_remarks_re: [null],
      post_cdr_remarks_re: [null],
      post_others_remarks_re: [null],
      post_vitreous_remarks_le: [null],
      post_media_remarks_le: [null],
      post_opticdisc_remarks_le: [null],
      post_bloodvessels_remarks_le: [null],
      post_macula_remarks_le: [null],
      post_fundus_remarks_le: [null],
      post_cdr_remarks_le: [null],
      post_others_remarks_le: [null],
      external_face: [null],
      ocular_alignment: [null],
      ocular_mobility: [null],
      addl_remarks: [null],
      schirmerf_test: [null],
      contract_sensitivity: [null],
      field_of_vision: [null],
      syringing: [null],
      cover_test: [null]
    })
  }

  get() {
    return this.examForm.controls;
  }

  getExamDetail() {
    const org_id = localStorage.getItem('org_id');
    const branch_id = localStorage.getItem('branch_id');
    const patient_id = this.headerDetail.patient_id;
    this.examService.getExam(patient_id).subscribe(data => {
      console.log('getRefraction Data',data);
      this.examDetailData = data.results;
      this.examDetailData = this.examDetailData.reverse();
      this.setCurrentExamData();
    })
  }

  setCurrentExamData() {
    this.examForm.patchValue(this.examDetailData[this.getLastRecordIndex()]);
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.examDetailData.length - 1;
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
    this.examForm.patchValue(this.examDetailData[this.recordIndex]); // give us back the item of where we are now
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getExamDetail();
  }

  saveExam() {
    let params = {
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      patient_id: this.headerDetail.patient_id,
      visit_no: this.visit_no,
      visit_date: this.visit_date,
      ant_eyelids_re: this.examForm.controls.ant_eyelids_re.value,
      ant_eyelashes_re: this.examForm.controls.ant_eyelashes_re.value,
      ant_conjuctiva_re: this.examForm.controls.ant_conjuctiva_re.value,
      ant_cornea_re: this.examForm.controls.ant_cornea_re.value,
      ant_champer_depth_re: this.examForm.controls.ant_champer_depth_re.value,
      ant_iris_re: this.examForm.controls.ant_iris_re.value,
      ant_pupil_re: this.examForm.controls.ant_pupil_re.value,
      ant_lens_re: this.examForm.controls.ant_lens_re.value,
      ant_sclera_re: this.examForm.controls.ant_sclera_re.value,
      ant_eyelids_le: this.examForm.controls.ant_eyelids_le.value,
      ant_eyelashes_le: this.examForm.controls.ant_eyelashes_le.value,
      ant_conjuctiva_le: this.examForm.controls.ant_conjuctiva_le.value,
      ant_cornea_le: this.examForm.controls.ant_cornea_le.value,
      ant_champer_depth_le: this.examForm.controls.ant_champer_depth_le.value,
      ant_iris_le: this.examForm.controls.ant_iris_le.value,
      ant_pupil_le: this.examForm.controls.ant_pupil_le.value,
      ant_lens_le: this.examForm.controls.ant_lens_le.value,
      ant_sclera_le: this.examForm.controls.ant_sclera_le.value,
      ant_eyelids_remarks_re: this.examForm.controls.ant_eyelids_remarks_re.value,
      ant_eyelashes_remarks_re: this.examForm.controls.ant_eyelashes_remarks_re.value,
      ant_conjuctiva_remarks_re: this.examForm.controls.ant_conjuctiva_remarks_re.value,
      ant_cornea_remarks_re: this.examForm.controls.ant_cornea_remarks_re.value,
      ant_champer_depth_remarks_re: this.examForm.controls.ant_champer_depth_remarks_re.value,
      ant_iris_remarks_re: this.examForm.controls.ant_iris_remarks_re.value,
      ant_pupil_remarks_re: this.examForm.controls.ant_pupil_remarks_re.value,
      ant_lens_remarks_re: this.examForm.controls.ant_lens_remarks_re.value,
      ant_sclera_remarks_re: this.examForm.controls.ant_sclera_remarks_re.value,
      ant_eyelids_remarks_le: this.examForm.controls.ant_eyelids_remarks_le.value,
      ant_eyelashes_remarks_le: this.examForm.controls.ant_eyelashes_remarks_le.value,
      ant_conjuctiva_remarks_le: this.examForm.controls.ant_conjuctiva_remarks_le.value,
      ant_cornea_remarks_le: this.examForm.controls.ant_cornea_remarks_le.value,
      ant_champer_depth_remarks_le: this.examForm.controls.ant_champer_depth_remarks_le.value,
      ant_iris_remarks_le: this.examForm.controls.ant_iris_remarks_le.value,
      ant_pupil_remarks_le: this.examForm.controls.ant_pupil_remarks_le.value,
      ant_lens_remarks_le: this.examForm.controls.ant_lens_remarks_le.value,
      ant_sclera_remarks_le: this.examForm.controls.ant_sclera_remarks_le.value,
      post_vitreous_re: this.examForm.controls.post_vitreous_re.value,
      post_media_re: this.examForm.controls.post_media_re.value,
      post_opticdisc_re: this.examForm.controls.post_opticdisc_re.value,
      post_bloodvessels_re: this.examForm.controls.post_bloodvessels_re.value,
      post_macula_re: this.examForm.controls.post_macula_re.value,
      post_fundus_re: this.examForm.controls.post_fundus_re.value,
      post_cdr_re: this.examForm.controls.post_cdr_re.value,
      post_others_re: this.examForm.controls.post_others_re.value,
      post_vitreous_le: this.examForm.controls.post_vitreous_le.value,
      post_media_le: this.examForm.controls.post_media_le.value,
      post_opticdisc_le: this.examForm.controls.post_opticdisc_le.value,
      post_bloodvessels_le: this.examForm.controls.post_bloodvessels_le.value,
      post_macula_le: this.examForm.controls.post_macula_le.value,
      post_fundus_le: this.examForm.controls.post_fundus_le.value,
      post_cdr_le: this.examForm.controls.post_cdr_le.value,
      post_others_le: this.examForm.controls.post_others_le.value,
      post_vitreous_remarks_re: this.examForm.controls.post_vitreous_remarks_re.value,
      post_media_remarks_re: this.examForm.controls.post_media_remarks_re.value,
      post_opticdisc_remarks_re: this.examForm.controls.post_opticdisc_remarks_re.value,
      post_bloodvessels_remarks_re: this.examForm.controls.post_bloodvessels_remarks_re.value,
      post_macula_remarks_re: this.examForm.controls.post_macula_remarks_re.value,
      post_fundus_remarks_re: this.examForm.controls.post_fundus_remarks_re.value,
      post_cdr_remarks_re: this.examForm.controls.post_cdr_remarks_re.value,
      post_others_remarks_re: this.examForm.controls.post_others_remarks_re.value,
      post_vitreous_remarks_le: this.examForm.controls.post_vitreous_remarks_le.value,
      post_media_remarks_le: this.examForm.controls.post_media_remarks_le.value,
      post_opticdisc_remarks_le: this.examForm.controls.post_opticdisc_remarks_le.value,
      post_bloodvessels_remarks_le: this.examForm.controls.post_bloodvessels_remarks_le.value,
      post_macula_remarks_le: this.examForm.controls.post_macula_remarks_le.value,
      post_fundus_remarks_le: this.examForm.controls.post_fundus_remarks_le.value,
      post_cdr_remarks_le: this.examForm.controls.post_cdr_remarks_le.value,
      post_others_remarks_le: this.examForm.controls.post_others_remarks_le.value,
      external_face: this.examForm.controls.external_face.value,
      ocular_alignment: this.examForm.controls.ocular_alignment.value,
      ocular_mobility: this.examForm.controls.ocular_mobility.value,
      addl_remarks: this.examForm.controls.addl_remarks.value
    }
    this.examService.createExam(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Examination Saved Successfully'
      })
    })
  }

  addRecord() {
    this.examForm.reset();
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }

  convertToStr(event: any, formName: any) {
    console.log(event);
    let value = event.value.toString();
    this.examForm.controls[formName].setValue(value);
  }
}
