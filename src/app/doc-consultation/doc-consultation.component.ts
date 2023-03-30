import { Component, OnInit } from '@angular/core';
import { DocConsultationService } from './doc-consultation.service';
import { PatientHeaderComponent } from '../patient-header/patient-header.component';
import { LabPrescriptionComponent } from '../lab-prescription/lab-prescription.component';
import { UtilityService } from '../utilities/services/utility.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-doc-consultation',
  templateUrl: './doc-consultation.component.html',
  styleUrls: ['./doc-consultation.component.scss']
})
export class DocConsultationComponent implements OnInit {
  mobile_no: string = '';
  headerDetailFound = false;
  docNotes: string = '';
  dialysisNotes: string = '';
  visit_no: any;
  headerDetail: any;
  consultObj = {};
  patientHistory: any;
  patientDialysisHistory: any;
  currentPatientDetail = { doctor_notes: '', visit_no: '', visit_date: '' };
  currentPatientDialysisDetail = { dialysis_notes: '', visit_no: '', prescription_date: '' }
  vitalParam = { khi_code: '', khi_value: '', khi_notes: '' }
  vitalParametersList: any;
  visit_date: any;
  // [{khi_code:'bp',khi_desc:'Bloop pressure'}, {khi_code:'height',khi_desc:'Height'}];
  constructor(private docService: DocConsultationService,
    private utility: UtilityService, private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.visit_no = 6;
    this.docService.fetchVitalParams().subscribe(data => {
      this.vitalParametersList = data;
    })
  }
  patientHeader(data: any) {
    this.headerDetail = data;
    this.docService.fetchPrevDeatils(this.headerDetail.patient_id).subscribe(data => {
      console.log(data.results);
      this.patientHistory = data.results;
      this.setCurrentPatientData();
    });
    this.docService.fetchPrevDialysisDetails(this.headerDetail.patient_id).subscribe(data => {
      console.log(data);
      this.patientDialysisHistory = data.results;
      this.setCurrentPatientDialysisData();
    })
  }
  saveNotes() {
    if (this.visit_no) {
      this.consultObj = {
        "org_id": localStorage.getItem('org_id'),
        "branch_id": localStorage.getItem('branch_id'),
        "patient_id": this.headerDetail.patient_id,
        "doctor_id": localStorage.getItem('user_id'),
        "user_id": localStorage.getItem('user_id'),
        "business_id": "",
        "visit_no": this.visit_no,
        "visit_date": this.utility.convertTodayTostr(),
        "prev_visit_date": "",
        "prev_history": "",
        "doctor_notes": this.docNotes
      }
    } else {
      this.consultObj = {
        "org_id": localStorage.getItem('org_id'),
        "branch_id": localStorage.getItem('branch_id'),
        "patient_id": this.headerDetail.patient_id,
        "doctor_id": localStorage.getItem('user_id'),
        "user_id": localStorage.getItem('user_id'),
        "business_id": "",
        "visit_date": this.utility.convertTodayTostr(),
        "prev_visit_date": "",
        "prev_history": "",
        "doctor_notes": this.docNotes
      }
    }
    this.docService.submitNotes(this.consultObj).subscribe(data => {
      console.log(data);

      this.visit_no = data.visit_no;
      this.visit_date = data.visit_date;

      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Notes Saved Successfully'
      })
    });
  }

  saveDialysisNotes() {
    if (this.visit_no) {
      this.consultObj = {
        "org_id": localStorage.getItem('org_id'),
        "branch_id": localStorage.getItem('branch_id'),
        "patient_id": this.headerDetail.patient_id,
        "doctor_id": localStorage.getItem('user_id'),
        "user_id": localStorage.getItem('user_id'),
        "business_id": "",
        "visit_no": this.visit_no,
        "prescription_date": this.utility.convertTodayTostr(),
        "dialysis_notes": this.dialysisNotes
      }
      this.docService.updatePatientConsult(this.consultObj).subscribe(data => {
        console.log(data);
        this.dialog.open(InfoDialogComponent, {
          width: '500px',
          data: 'Notes updated Successfully'
        })
      });
    } else {
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Please save doctor notes'
      })
    }


  }
  setCurrentPatientData() {
    this.currentPatientDetail = this.patientHistory[this.getLastRecordIndex()];
    this.currentPatientDetail.visit_date = this.utility.convertDate(this.currentPatientDetail.visit_date);
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }
  prevCounter = 0;
  recordIndex: number | undefined;
  getLastRecordIndex() {
    return this.patientHistory.length - 1;
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
    this.currentPatientDetail = this.patientHistory[this.recordIndex]; // give us back the item of where we are now
    this.currentPatientDetail.visit_date = this.utility.convertDate(this.currentPatientDetail.visit_date);
  }
  //dialysis notes pagination

  setCurrentPatientDialysisData() {
    this.currentPatientDialysisDetail = this.patientDialysisHistory[this.getLastDialysisRecordIndex()];
    this.currentPatientDialysisDetail.prescription_date = this.utility.convertDate(this.currentPatientDialysisDetail.prescription_date);
    if (this.getLastDialysisRecordIndex() === 0) {
      this.recordIndexDialysis = 0;
    }
  }
  prevDialysisCounter = 0;
  recordIndexDialysis: number | undefined;
  getLastDialysisRecordIndex() {
    return this.patientDialysisHistory.length - 1;
  }
  prevDialysisItem() {
    this.prevDialysisCounter++;
    this.setCurrentDialysisAfterChange();
  }

  nextDialysisItem() {
    this.prevDialysisCounter--;
    this.setCurrentDialysisAfterChange();
  }

  setCurrentDialysisAfterChange() {
    this.recordIndexDialysis = this.getLastDialysisRecordIndex() - this.prevDialysisCounter;
    this.currentPatientDialysisDetail = this.patientDialysisHistory[this.recordIndexDialysis]; // give us back the item of where we are now
    this.currentPatientDialysisDetail.prescription_date = this.utility.convertDate(this.currentPatientDialysisDetail.prescription_date);
  }

  // vital params
  vitalList: any = [];
  updateVitalArray() {
    let vitalParam = { khi_code: '', khi_value: '', khi_notes: '' };

    this.vitalParametersList.forEach((element: { khi_code: string; }) => {
      let bpParam = { khi_code: '', khi_value: '', khi_notes: '' };

      bpParam.khi_code = element.khi_code;
      const inputValue = document.getElementById(element.khi_code) as HTMLInputElement | null;

      if (inputValue != null) {
        bpParam.khi_value = inputValue.value;        
      }
      const inputNotes = document.getElementById(this.setNotesId(element.khi_code)) as HTMLInputElement | null;
      if (inputNotes != null) {
        bpParam.khi_notes = inputNotes.value;       
      }
    
      this.vitalList.push(bpParam);
    });


  }
  setNotesId(code: any) {
    return code + '_notes';
  }
  saveVitalParams() {
    this.updateVitalArray();
    let vitalPram = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "patient_id": this.headerDetail.patient_id,
      "doctor_id": localStorage.getItem('user_id'),
      "user_id": localStorage.getItem('user_id'),
      "business_id": "",
      "visit_no": this.visit_no,
      "health_lists": this.vitalList
    }
    this.docService.updateVital(vitalPram).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Vital Params updated Successfully'
      })
    });
  }

}
