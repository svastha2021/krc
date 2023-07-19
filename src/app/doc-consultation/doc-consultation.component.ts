import { Component, OnInit } from '@angular/core';
import { DocConsultationService } from './doc-consultation.service';
import { PatientHeaderComponent } from '../patient-header/patient-header.component';
import { LabPrescriptionComponent } from '../lab-prescription/lab-prescription.component';
import { UtilityService } from '../utilities/services/utility.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReferenceService } from '../utilities/services/reference.service';
import { aptModel } from '../apt-booking/apt-booking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
export type NotesPayload = {
  org_id: string | null;
  branch_id: string | null;
  patient_id: string | null;
  doctor_id: string | null;
  user_id: string | null;
  appoint_no: string;
  business_id: string;
  visit_no?: string;
  visit_date: string;
  prev_visit_date: string;
  prev_history: string;
  doctor_notes: string;
  main_complaint: string;
  main_complaint_from: string;
  curr_complaint: string;
  curr_complaint_from: string;
  past_illness_systemic: string;
  fam_history: string;
  fam_history_dtl: string;
  surg_laser: string;
  allergies: string;
  curr_treatment: string;
  curr_treatment_dtl: string;
  medication: string;
  medication_dtl: string;
};

export type DialysisNotesPayload = {
  org_id: string | null;
  branch_id: string | null;
  patient_id: string | null;
  doctor_id: string | null;
  user_id: string | null; 
  business_id: string;
  visit_no?: string;
  prescription_date: string;
  dialysis_notes: string;
};
@Component({
  selector: 'app-doc-consultation',
  templateUrl: './doc-consultation.component.html',
  styleUrls: ['./doc-consultation.component.scss'],
})
export class DocConsultationComponent implements OnInit {
  mobile_no: string = '';
  headerDetailFound = false;
  docNotes: string = '';
  dialysisNotes: string = '';
  visit_no: any;
  headerDetail: any;
  consultObj = {} as NotesPayload;
  patientHistory: any;
  patientDialysisHistory: any;
  currentPatientDetail = { doctor_notes: '', visit_no: '', visit_date: '',  
    main_complaint: '',
    main_complaint_from: '',
    curr_complaint: '',
    curr_complaint_from: '',
    past_illness_systemic: '',
    fam_history: '',
    fam_history_dtl: '',
    surg_laser: '',
    allergies: '',
    curr_treatment: '',
    curr_treatment_dtl: '',
    medication: '',
    medication_dtl: '',
    docNotes: ''
  };
  currentPatientDialysisDetail = {
    dialysis_notes: '',
    visit_no: '',
    prescription_date: '',
  };
  vitalParam = { khi_code: '', khi_value: '', khi_notes: '' };
  vitalParametersList: any;
  aptObj = {} as aptModel;
  visit_date: any;
  showVitalPrevious: boolean = false;
  docNoteForm!: FormGroup;
  main_complaint: string = '';
  main_complaint_from: string = '';
  curr_complaint: string = '';
  curr_complaint_from: string = '';
  past_illness_systemic: string = '';
  fam_history: string = '';
  fam_history_dtl: string = '';
  surg_laser: string = '';
  allergies: string = '';
  curr_treatment: string = '';
  curr_treatment_dtl: string = '';
  medication: string = '';
  medication_dtl: string = '';

  // [{khi_code:'bp',khi_desc:'Bloop pressure'}, {khi_code:'height',khi_desc:'Height'}];
  constructor(
    private docService: DocConsultationService,
    private ref: ReferenceService,
    private utility: UtilityService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.fam_history = 'N';
    this.curr_treatment = 'N';
    this.medication = 'N';
  }

  ngOnInit(): void {
    if (history.state && history.state.patient_id) {
      this.aptObj = history.state;
      this.ref.fetchHeader(history.state.patient_id).subscribe((data) => {
        this.patientHeader(data);
      });
    }
    this.docService.fetchVitalParams().subscribe((data) => {
      this.vitalParametersList = data;
    });
    this.getVitalData();

    this.doctorNotes();

  }

  doctorNotes() {
    // this.docNoteForm = this.formBuilder.group({
    //   main_complaint: [null],
    //   main_complaint_from: [null],
    //   curr_complaint: [null],
    //   curr_complaint_from: [null],
    //   past_illness_systemic: [null],
    //   fam_history: [null],
    //   fam_history_dtl: [null],
    //   surg_laser: [null],
    //   allergies: [null],
    //   curr_treatment: [null],
    //   curr_treatment_dtl: [null],
    //   medication: [null],
    //   medication_dtl: [null],
    //   remarks: [null]
    // })
  }

  history() {

  }
  patientHeader(data: any) {
    this.headerDetail = { ...data };
    localStorage.setItem('header', JSON.stringify(this.headerDetail));
    this.docService
      .fetchPrevDeatils(this.headerDetail.patient_id)
      .subscribe((data) => {
        console.log(data.results);
        this.patientHistory = data.results;
        this.setCurrentPatientData();
      });
    this.docService
      .fetchPrevDialysisDetails(this.headerDetail.patient_id)
      .subscribe((data) => {
        console.log(data);
        this.patientDialysisHistory = data.results;
        this.setCurrentPatientDialysisData();
      });
  }
  saveNotes() {
    if (this.visit_no) {
      this.consultObj = {
        org_id: localStorage.getItem('org_id'),
        branch_id: localStorage.getItem('branch_id'),
        patient_id: this.headerDetail.patient_id,
        doctor_id: localStorage.getItem('user_id'),
        user_id: localStorage.getItem('user_id'),
        appoint_no: this.aptObj.appoint_no,
        business_id: this.aptObj.dept_id, //dept id appoint_no
        visit_no: this.visit_no,
        visit_date: this.utility.convertTodayTostr(),
        prev_visit_date: '',
        prev_history: '',
        main_complaint: this.main_complaint,
        main_complaint_from: this.main_complaint_from,
        curr_complaint: this.curr_complaint,
        curr_complaint_from: this.curr_complaint_from,
        past_illness_systemic: this.past_illness_systemic,
        fam_history: this.fam_history,
        fam_history_dtl: this.fam_history_dtl,
        surg_laser: this.surg_laser,
        allergies: this.allergies,
        curr_treatment: this.curr_treatment,
        curr_treatment_dtl: this.curr_treatment_dtl,
        medication: this.medication,
        medication_dtl: this.medication_dtl,
        doctor_notes: this.docNotes
      };
    } else {
      this.consultObj = {
        org_id: localStorage.getItem('org_id'),
        branch_id: localStorage.getItem('branch_id'),
        patient_id: this.headerDetail.patient_id,
        doctor_id: localStorage.getItem('user_id'),
        user_id: localStorage.getItem('user_id'),
        appoint_no: this.aptObj.appoint_no,
        business_id: this.aptObj.dept_id, //dept id appoint_no,
        visit_date: this.utility.convertTodayTostr(),
        prev_visit_date: '',
        prev_history: '',
        main_complaint: this.main_complaint,
        main_complaint_from: this.main_complaint_from,
        curr_complaint: this.curr_complaint,
        curr_complaint_from: this.curr_complaint_from,
        past_illness_systemic: this.past_illness_systemic,
        fam_history: this.fam_history,
        fam_history_dtl: this.fam_history_dtl,
        surg_laser: this.surg_laser,
        allergies: this.allergies,
        curr_treatment: this.curr_treatment,
        curr_treatment_dtl: this.curr_treatment_dtl,
        medication: this.medication,
        medication_dtl: this.medication_dtl,
        doctor_notes: this.docNotes
      };
    }
    this.docService.submitNotes(this.consultObj).subscribe((data) => {
      console.log(data);

      this.visit_no = data.visit_no;
      this.visit_date = data.visit_date;

      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Notes Saved Successfully',
      });
    });
  }
  dialysisNotesPayload = {} as DialysisNotesPayload;
  saveDialysisNotes() {
    if (this.visit_no) {
      this.dialysisNotesPayload = {
        org_id: localStorage.getItem('org_id'),
        branch_id: localStorage.getItem('branch_id'),
        patient_id: this.headerDetail.patient_id,
        doctor_id: localStorage.getItem('user_id'),
        user_id: localStorage.getItem('user_id'),    
        business_id: '', 
        visit_no: this.visit_no,
        prescription_date: this.utility.convertTodayTostr(),
        dialysis_notes: this.dialysisNotes,
      };
      this.docService
        .updatePatientConsult(this.dialysisNotesPayload)
        .subscribe((data) => {
          console.log(data);
          this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: 'Notes updated Successfully',
          });
        });
    } else {
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Please save doctor notes',
      });
    }
  }
  setCurrentPatientData() {
    this.currentPatientDetail = this.patientHistory[this.getLastRecordIndex()];
    this.currentPatientDetail.visit_date = this.utility.convertDate(
      this.currentPatientDetail.visit_date
    );
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
    this.currentPatientDetail.visit_date = this.utility.convertDate(
      this.currentPatientDetail.visit_date
    );
    this.main_complaint = this.currentPatientDetail.main_complaint,
    this.main_complaint_from = this.utility.convertDate(this.currentPatientDetail.main_complaint_from),
    this.curr_complaint = this.currentPatientDetail.curr_complaint,
    this.curr_complaint_from = this.utility.convertDate(this.currentPatientDetail.curr_complaint_from),
    this.past_illness_systemic = this.currentPatientDetail.past_illness_systemic,
    this.fam_history = this.currentPatientDetail.fam_history,
    this.fam_history_dtl = this.currentPatientDetail.fam_history_dtl,
    this.surg_laser = this.currentPatientDetail.surg_laser,
    this.allergies = this.currentPatientDetail.allergies,
    this.curr_treatment = this.currentPatientDetail.curr_treatment,
    this.curr_treatment_dtl = this.currentPatientDetail.curr_treatment_dtl,
    this.medication = this.currentPatientDetail.medication,
    this.medication_dtl = this.currentPatientDetail.medication_dtl,
    this.docNotes = this.currentPatientDetail.doctor_notes
  }
  //dialysis notes pagination

  setCurrentPatientDialysisData() {
    this.currentPatientDialysisDetail =
      this.patientDialysisHistory[this.getLastDialysisRecordIndex()];
    this.currentPatientDialysisDetail.prescription_date =
      this.utility.convertDate(
        this.currentPatientDialysisDetail.prescription_date
      );
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
    this.recordIndexDialysis =
      this.getLastDialysisRecordIndex() - this.prevDialysisCounter;
    this.currentPatientDialysisDetail =
      this.patientDialysisHistory[this.recordIndexDialysis]; // give us back the item of where we are now
    this.currentPatientDialysisDetail.prescription_date =
      this.utility.convertDate(
        this.currentPatientDialysisDetail.prescription_date
      );
  }

  // vital params
  vitalList: any = [];
  updateVitalArray() {
    let vitalParam = { khi_code: '', khi_value: '', khi_notes: '' };

    this.vitalParametersList.forEach((element: { khi_code: string }) => {
      let bpParam = { khi_code: '', khi_value: '', khi_notes: '' };

      bpParam.khi_code = element.khi_code;
      const inputValue = document.getElementById(
        element.khi_code
      ) as HTMLInputElement | null;

      if (inputValue != null) {
        bpParam.khi_value = inputValue.value;
      }
      const inputNotes = document.getElementById(
        this.setNotesId(element.khi_code)
      ) as HTMLInputElement | null;
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
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      patient_id: this.headerDetail.patient_id,
      doctor_id: localStorage.getItem('user_id'),
      user_id: localStorage.getItem('user_id'),
      business_id: '',
      visit_no: this.visit_no,
      health_lists: this.vitalList,
    };
    this.docService.updateVital(vitalPram).subscribe((data) => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Vital Params updated Successfully',
      });
    });
  }

  getVitalData() {
    this.docService.getVitalData(this.headerDetail.patient_id).subscribe((data) => {
      console.log(data);
    });
  }

  displayPrevious() {
    this.showVitalPrevious = true;
  }
}
