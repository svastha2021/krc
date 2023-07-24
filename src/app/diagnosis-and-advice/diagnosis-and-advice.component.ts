import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DiagnosisAndAdviceService } from './diagnosis-and-advice.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';

@Component({
  selector: 'app-diagnosis-and-advice',
  templateUrl: './diagnosis-and-advice.component.html',
  styleUrls: ['./diagnosis-and-advice.component.scss']
})
export class DiagnosisAndAdviceComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  diagnosisForm!: FormGroup;
  showPreviousTable:boolean = false;
  diagnosisList = [
    'Immature Cateract', 'Matue Cataract', 'Hypermature cataract', 'Morgagnian Cataract', 'Kerato Conjunctivities', 'Dry Eyes', 'Orbital cellulitis', 'Retinobiastoma', 'Glaucoma', 'Ocular Trauma', 'Scleritis'
  ];
  systemicDiagnosisList = ['Acid', 'Peptic', 'Arthretis', 'Asthma', 'Diabetics', 'HIV'];
  adviceList = ['Continue Same Glasses',  'Glasses Prescribed', 'Glasses Prescribed and dispensed', 'No treatment needed', 'Referred for further diagnosis'];
  reasonList = ['Cataract Surgery', 'Squint', 'Lasic', 'Retina','Cornea'];
  vaList = ['6/6', '6/9', '6/12', '6/18', '6/24', '6/36', '6/60', '5/60'];
  subjectDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, 
              private daService: DiagnosisAndAdviceService) { }
  
    ngOnInit(): void {
      this.diagnosis();
    }
  
    diagnosis() {
      this.diagnosisForm = this.formBuilder.group({
        diagnosis_re: [],
        diagnosis_le: [],
        others: [],
        syst_diag: [],
        advise: [],
        followup_date: [],
        followup_reason: []
      })
    }
  
    saveDiagnosisPrescription() {
      const diagForm = this.diagnosisForm.controls;
      let params = {
        "org_id": localStorage.getItem('org_id'),
        "branch_id": localStorage.getItem('branch_id'),
        "user_id": localStorage.getItem('user_id'),
        "patient_id": this.headerDetail.patient_id,
        "visit_no": this.visit_no,
        "visit_date": this.visit_date,
        "diagnosis_re": diagForm.diagnosis_re.value,
        "diagnosis_le": diagForm.diagnosis_le.value,
        "others": diagForm.others.value,
        "syst_diag": diagForm.syst_diag.value,
        "advise": diagForm.advise.value,
        "followup_date": diagForm.followup_date.value,
        "followup_reason": diagForm.followup_reason.value
      }
      this.daService.createDiagnosis(params).subscribe(data => {
        console.log(data);
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: 'Diagnosis and Advice Saved Successfully!!!'
        })
      })
    }
  
    getDiagnosisDetail() {
      const patient_id = this.headerDetail.patient_id;
      this.daService.getDiagnosis(patient_id).subscribe(data => {
        console.log('getDA Data',data);
        this.subjectDetailData = data.results;
        this.subjectDetailData = this.subjectDetailData.reverse();
        this.setCurrentObjectData();
      })
    }
  
    setCurrentObjectData() {
      this.diagnosisForm.patchValue(this.subjectDetailData[this.getLastRecordIndex()]);
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
      this.diagnosisForm.patchValue(this.subjectDetailData[this.recordIndex]);
    }
  
    displayPrevious() {
      this.showPreviousTable = true;
      this.getDiagnosisDetail();
    }
  
    back() {
      this.showPreviousTable = false;
      this.addRecord();
    }
  
    addRecord() {
      this.diagnosisForm.reset();
    }
}
