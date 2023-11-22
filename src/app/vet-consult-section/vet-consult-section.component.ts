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
import { ViewPetFieldImage } from '../utilities/pet-section-field-image-view/pet-section-field-image-view.component';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-vet-dynamic-section',
  templateUrl: './vet-consult-section.component.html',
  styleUrls: ['./vet-consult-section.component.scss'],
})
export class VetConsultSectionComponent {
  @ViewChild(MatSelect) matSelect: MatSelect | undefined;
  @Input() headerDetail: any;
  @Input() visit_no: any;
  _heading: any;
  @Input() set heading(value: string) {
    console.log('input', value);
    this._heading = value;
  }
  @Input() visit_date: any;
  _metaData: any;
  @Input() set metaData(value: any) {
    console.log('input', value);
    if (value) {
      this.sectionParamData = value;
    }
  }
  @Output() isActive = new EventEmitter();
  @Output() backEmit= new EventEmitter();

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
  filesList: any = [];
  showFiles = false;
  imageSrc: any = '';
  videoSrc: any = '';
  constructor(
    private vetService: VetServiceService,
    private ref: ReferenceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private utility: UtilityService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(this.visit_no)
  }
  dynamicExamData: any = [];

  get() {
    return this.dynamicForm.controls;
  }
  entireData: any[] = [];
  getDetail() {
    const patient_id = this.headerDetail.patient_id;
    this.vetService
      .previousVetData(patient_id, this._heading)
      .subscribe((data) => {
        this.entireData = data.results;
        // this.examDetailData = data.results;
        this.entireData = this.entireData.reverse();
        this.setCurrentExamData();
      });
  }

  setCurrentExamData() {
    //this.examForm.patchValue(this.examDetailData[this.getLastRecordIndex()]);
    this.showVisitNo = this.entireData[this.getLastRecordIndex()].visit_no;
    // this.showVisitDate = this.utility.convertDate(
    //     this.examDetailData[this.getLastRecordIndex()].visit_date
    //   );
    this.sectionParamData =
      this.entireData[this.getLastRecordIndex()].sub_headings;
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
    this.sectionParamData = [];
    this.recordIndex = this.getLastRecordIndex() - this.prevCounter;
    this.sectionParamData = this.entireData[this.recordIndex].sub_headings;
    this.visit_no = this.entireData[this.recordIndex].visit_no;
    this.showVisitNo = this.visit_no;

    //this.examForm.patchValue(this.examDetailData[this.recordIndex]); // give us back the item of where we are now
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getDetail();
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
          image_re:'',
          image_le:'',
          heading_seq_no:0,
          sub_heading_seq_no:0        };
        petParam.column_name_prefix = prop.column_name_prefix;
        petParam.column_name_text = prop.column_name_text;
        petParam.sub_heading = prop.sub_heading;
        petParam.heading = prop.heading;
        petParam.column_name_seq_no = prop.column_name_seq_no;
        petParam.image_re = prop.image_re;
        petParam.image_le = prop.image_le;
        petParam.heading_seq_no = prop.heading_seq_no;
        petParam.sub_heading_seq_no = prop.sub_heading_seq_no;
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
      dept_id: 'D0004',
      patient_id: this.headerDetail.patient_id,
      visit_no: this.visit_no,
      payloadList: this.petPayloadList,
    };

    this.vetService.saveVetData(params).subscribe((data) => {
      this.isActive.emit(
        [true, this.visit_no, this.visit_date]
      );
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Data Saved Successfully',
      });
    });
  }

  back() {
    this.showPreviousTable = false;
    //this.showVisitNo = this.visit_no;
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

  back2Section(){
    this.backEmit.emit();
  }

  displayFieldImage(property: any, eye:string) {  
    property.showPrevious =this.showPreviousTable; 
    property.eye = eye;
    const viewImage = this.dialog.open(ViewPetFieldImage, {
      width: '800px',
      data: property,
    });

    viewImage.afterClosed().subscribe((data) => {
      let blobfile =  data.file;
      let field = data.field;
      console.log(data);
      if (blobfile) {
        let imageName = this.headerDetail.patient_id +'-'+field.heading_seq_no+'-'+field.sub_heading_seq_no+'-'+field.column_name_text.trim()+'-'+eye+'-'+this.visit_no;
        let blobtofile= new File([blobfile], imageName+".png");
        console.log('file edit', blobtofile);
        const formData = new FormData();
        
        
        //file.name = imageName;
        formData.append('image', blobtofile);
        formData.append('org_id',localStorage.getItem('org_id')!);
        formData.append('branch_id',localStorage.getItem('branch_id')!);
        formData.append('dept_id','D0004');

        formData.append('patient_id', this.headerDetail.patient_id);
        formData.append('heading_seq_no',field.heading_seq_no);
        formData.append('sub_heading_seq_no',field.sub_heading_seq_no);
        formData.append('column_name_seq_no',field.column_name_seq_no);

        formData.append('column_name', field.column_name_text.trim());
        formData.append('heading',field.heading);
        formData.append('sub_heading',field.sub_heading);
        formData.append('visit_no',this.visit_no);
        formData.append('eye',eye);
        
        this.vetService.uploadFile(formData,this.headerDetail.patient_id).subscribe((data) => {
          this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: 'Image Saved Successfully',
          });
        });
      }
    });
  }

  convertFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let payload = {
        org_id: localStorage.getItem('org_id'),
        branch_id: localStorage.getItem('branch_id'),
        user_id: localStorage.getItem('user_id'),
        dept_id: 'D0004',
        patient_id: this.headerDetail.patient_id,
        visit_no: this.visit_no,
        file_name: 'shan123.png',
        image: reader.result,
      };

      this.vetService.uploadFileBase64(payload).subscribe((data) => {
        this.dialog.open(InfoDialogComponent, {
          width: '500px',
          data: 'Image Saved Successfully',
        });
      });
      console.log(reader.result);
    };
  }

  view(path: any) {
    this.videoSrc = '';
    this.imageSrc = '';
    if (path.indexOf('pdf') >= 0) {
      window.open(path, '_blank');
    }
    if (path.indexOf('.mp4') >= 0) {
      this.videoSrc = path;
    } else {
      this.imageSrc = path;      
    }
  }
  retrieveFiles() {
    this.showFiles = true;
    this.filesList = [];
    this.vetService
      .getFiles(this.headerDetail.patient_id, this._heading)
      .subscribe((data:any) => {
        let temp = data;
        for (let i = 0; i < temp.length; i++) {
          let tempObj = { fileName: '', filePath: '' };
          tempObj.fileName = temp[i].split('/')[4];
          tempObj.filePath = temp[i];
          this.filesList.push(tempObj);
        }
      });
  }
}
