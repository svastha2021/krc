import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocConsultationService } from '../doc-consultation/doc-consultation.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { UtilityService } from '../utilities/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';

@Component({
  selector: 'app-pet-vital-parameter',
  templateUrl: './pet-vital-parameter.component.html',
  styleUrls: ['./pet-vital-parameter.component.scss']
})
export class PetVitalParameterComponent {
  
  @Input()
  headerDetail: any;
  @Input()
  visit_no: string = '';
  @Input() aptObj: any;
  @Output() isActiveVitalParameter = new EventEmitter();
  showPreviousTable: boolean = false;
  vitalBoolean:boolean = false;
  vitalParam = { khi_code: '', khi_value: '', khi_notes: '' };
  vitalParametersList: any;
  vitalList: any = [];
  showVitalPrevious: boolean = false;

  constructor(
    private docService: DocConsultationService,
    private ref: ReferenceService,
    private utility: UtilityService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    // if (history.state && history.state.patient_id) {
    //   this.aptObj = history.state;
    //   this.ref.fetchHeader(history.state.patient_id).subscribe((data) => {
    //     this.patientHeader(data);
    //   });
    // }
    this.docService.fetchVitalParams().subscribe((data) => {
      this.vitalParametersList = data;
    });

    this.getVitalData();
  }

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
      this.vitalBoolean = true;
      this.emitVital();
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Vital Params updated Successfully',
      });
    });
  }

  getVitalData() {
    this.docService
      .getVitalData(this.headerDetail.patient_id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  displayPrevious() {
    this.showVitalPrevious = true;
  }

  emitVital() {
    this.isActiveVitalParameter.emit(
      [this.vitalBoolean, this.visit_no]
    );
  }
}
