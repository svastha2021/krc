import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VetServiceService } from './vet-service.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { UtilityService } from '../utilities/services/utility.service';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-vet-dynamic-section',
  templateUrl: './vet-consult-section.component.html',
  styleUrls: ['./vet-consult-section.component.scss'],
})
export class VetConsultSectionComponent  {
  @ViewChild(MatSelect) matSelect: MatSelect | undefined;
  @Input() headerDetail: any;
  @Input() visit_no: any;
  @Input() visit_date: any;
  _metaData: any;
  @Input() set metaData(value: any) {
    console.log('input', value);
    if (value) {
     this.sectionParamData = value;
    }
  }
  @Output() isActive= new EventEmitter();

  dynamicForm!: FormGroup;
  showPreviousTable = false;
  examDetailData: any;
  prevCounter = 0;
  recordIndex: number | undefined;
  reList: any = [];

  showVisitDate: any;
  showVisitNo: any;
  examinationBoolean: boolean = false;
  sectionParamData: any[] = [];
  constructor(
    private vetService: VetServiceService,
    private ref: ReferenceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private utility: UtilityService
  ) {}
  
  ngOnInit(): void {
   
  }

  dynamicExamData: any = [];

  get() {
    return this.dynamicForm.controls;
  }
entireData:any[] = [];
  getExamDetail() {    
    const patient_id = this.headerDetail.patient_id;
    this.vetService.previousVetData(patient_id, 'Cornea and Sclera').subscribe(data => {
      this.entireData = data.results;
      // this.examDetailData = data.results;
       this.entireData = this.entireData.reverse();
       this.setCurrentExamData();
    })
  }

  setCurrentExamData() {
    //this.examForm.patchValue(this.examDetailData[this.getLastRecordIndex()]);
    this.showVisitNo = this.entireData[this.getLastRecordIndex()].visit_no;
  // this.showVisitDate = this.utility.convertDate(
  //     this.examDetailData[this.getLastRecordIndex()].visit_date
  //   );
  this.sectionParamData = this.entireData[this.getLastRecordIndex()].sub_headings;
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.entireData.length - 1;
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
    this.sectionParamData =
      this.entireData[this.recordIndex];
      this.visit_no = this.entireData[this.recordIndex].visit_no;
    //this.examForm.patchValue(this.examDetailData[this.recordIndex]); // give us back the item of where we are now
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getExamDetail();
  }

  setIDs(code: any, id: string) {
    return code + id;
  }
  petPayloadList: any = [];
  updatePayloadList() {
    // let petParam = { khi_code: '', khi_value: '', khi_notes: '' };

    this.sectionParamData.forEach((element: any) => {
      element.details.forEach((prop: any) => {
        let petParam = {
          heading: '',
          sub_heading: '',
          column_name_seq_no: 0,
          column_name_prefix: '',
          column_name_text: '',
          column_name_le: '',
          column_name_re: '',
          column_name_rem_re: '',
          column_name_rem_le: '',
        };
        petParam.column_name_prefix = prop.column_name_prefix;
        petParam.column_name_text = prop.column_name_text;
        petParam.sub_heading = prop.sub_heading;
        petParam.heading = prop.heading;
        petParam.column_name_seq_no = prop.column_name_seq_no;
        const inputLE = document.getElementById(
          this.setIDs(prop.column_name_prefix, '_LE')
        ) as HTMLInputElement | null;
        if (inputLE != null) {
          petParam.column_name_le = inputLE.value;
        }

        const inputRemLe = document.getElementById(
          this.setIDs(prop.column_name_prefix, '_Remark_LE')
        ) as HTMLInputElement | null;
        if (inputRemLe != null) {
          petParam.column_name_rem_le = inputRemLe.value;
        }

        const inputRE = document.getElementById(
          this.setIDs(prop.column_name_prefix, '_RE')
        ) as HTMLInputElement | null;
        if (inputRE != null) {
          petParam.column_name_re = inputRE.value;
        }

        const inputRemRe = document.getElementById(
          this.setIDs(prop.column_name_prefix, '_Remark_RE')
        ) as HTMLInputElement | null;
        if (inputRemRe != null) {
          petParam.column_name_rem_re = inputRemRe.value;
        }
        this.petPayloadList.push(petParam);
      });
    });
  }

  saveValues() {
    this.updatePayloadList();
    let params: any = {
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      dept_id: 'D004',
      patient_id: this.headerDetail.patient_id,
      visit_no: this.visit_no,
      payloadList: this.petPayloadList      
    };  
    

    this.vetService.saveVetData(params).subscribe(data => {
      this.isActive.emit(true);
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Data Saved Successfully'
      })
    })
  }

  addRecord() {
    // this.examForm.reset();
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }


  convertToStr(event: any, _formName: any) {
    console.log(event);
    let value = event.value.toString();
    const inputRE = document.getElementById(
      this.setIDs(_formName, '_RE')
    ) as HTMLInputElement | null;
    console.log(inputRE);
    // this.examForm.controls[formName].setValue(value);
  }

  emitExamination() {
    this.isActive.emit(this.examinationBoolean);
  }
}
