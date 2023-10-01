import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VetServiceService } from './vet-service.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { UtilityService } from '../utilities/services/utility.service';
@Component({
  selector: 'app-vet-consult-section',
  templateUrl: './vet-consult-section.component.html',
  styleUrls: ['./vet-consult-section.component.scss']
})
export class VetConsultSectionComponent {

  @Input() headerDetail: any;
  @Input() visit_no: any;
  @Input() visit_date: any;
  @Output() isActiveExamination = new EventEmitter();
  
  dynamicForm!: FormGroup;
  showPreviousTable = false;
  examDetailData: any;
  prevCounter = 0;
  recordIndex: number | undefined;
  eyeLidsList: any = [];
  
  showVisitDate: any;
  showVisitNo: any;
  examinationBoolean:boolean = false;
  
  constructor(
    private vetService: VetServiceService,
    private ref: ReferenceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private utility: UtilityService
  ) { }

  ngOnInit(): void {
    
this.renderDynamic();
    
  }
 
  dynamicExamData:any = [];
  renderDynamic() {
    this.dynamicExamData = [
      {
        sectionName: 'Lacrimal System',
        properties: [
          {
            name: 'STT',   
            fieldType: 'Text',         
            fieldValueRe:'STT_re',
            fieldValueLe:'STT_le',
            fieldRemarkRe:'STT_remark_re',
            fieldRemarkLe:'STT_remark_le'            
          },
          {
            name: 'Epiphoea',   
            fieldType: 'Text',         
            fieldValueRe:'Epiphoea_re',
            fieldValueLe:'Epiphoea_le',
            fieldRemarkRe:'Epiphoea_remark_le',
            fieldRemarkLe:'Epiphoea_remark_le'            
          },
          
        ],
      },
    ];
    type Org = { [key: string]: FormControl };
    const organization: Org = {};
    this.dynamicExamData.forEach((section:any) => {
      const formField: Org = {};
      section.properties.forEach((prop:any) => {
        formField[prop.fieldValueRe] = new FormControl('');
        formField[prop.fieldValueLe] = new FormControl('');
        formField[prop.fieldRemarkRe] = new FormControl('');
        formField[prop.fieldRemarkLe] = new FormControl('');
      });
      this.dynamicForm = this.formBuilder.group(formField);
    });
    Object.keys(this.dynamicForm.controls).forEach(key => {
      console.log(key + ': ' + this.dynamicForm.controls[key].value);
   });
  }

  

  get() {
    return this.dynamicForm.controls;
  }

  getExamDetail() {
    const org_id = localStorage.getItem('org_id');
    const branch_id = localStorage.getItem('branch_id');
    const patient_id = this.headerDetail.patient_id;
    // this.examService.getExam(patient_id).subscribe(data => {
    //   console.log('getRefraction Data',data);
    //   this.examDetailData = data.results;
    //   this.examDetailData = this.examDetailData.reverse();
    //   this.setCurrentExamData();
    // })
  }

  setCurrentExamData() {
    //this.examForm.patchValue(this.examDetailData[this.getLastRecordIndex()]);
    this.showVisitNo = this.examDetailData[this.getLastRecordIndex()].visit_no;
    this.showVisitDate = this.utility.convertDate(
      this.examDetailData[this.getLastRecordIndex()].visit_date
    );
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
    //this.examForm.patchValue(this.examDetailData[this.recordIndex]); // give us back the item of where we are now
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getExamDetail();
  }

  saveExam() {
    let x = this.dynamicForm.controls;
    let params:any = {
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      patient_id: this.headerDetail.patient_id,
      visit_no: this.visit_no,
      visit_date: this.visit_date,
      //ant_eyelids_re: this.examForm.controls.ant_eyelids_re.value,
      
    }
    let keys = Object.keys(x);
    keys.forEach(field=>{
      let val = this.dynamicForm.controls[field].value;
      params[field]=val;
    })
    console.log(params);
    //need to have api with section name for get detail

    // this.examService.createExam(params).subscribe(data => {
    //   this.examinationBoolean = true;
    //   this.emitExamination();
    //   this.dialog.open(InfoDialogComponent, {
    //     width: '500px',
    //     data: 'Examination Saved Successfully'
    //   })
    // })
  }

  addRecord() {
   // this.examForm.reset();
  }

  back() {
    this.showPreviousTable = false;
    this.addRecord();
  }

  convertToStr(event: any, formName: any) {
    console.log(event);
    let value = event.value.toString();
   // this.examForm.controls[formName].setValue(value);
  }

  emitExamination() {
    this.isActiveExamination.emit(
      this.examinationBoolean
    );
  }
}
