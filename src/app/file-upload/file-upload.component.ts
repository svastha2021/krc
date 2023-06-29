import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReferenceService } from '../utilities/services/reference.service';
import { FileUpload } from './fileupload/fileupload.model';
import { FileUploadService } from './fileupload/fileupload.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  doc_type = '';
  doc_tag = '';
  docList: any[] = [];

  @ViewChild('fileUploader') fileUploader: ElementRef | undefined;
  //patientHeader: any;
  headerDetailData: any;
  constructor(
    private uploadService: FileUploadService,
    private ref: ReferenceService
  ) {}

  uploads: any;
  ngOnInit(): void {
    this.getDocTypes();
  }

  getDocTypes() {
    this.ref.getPaymentModes('DOCTYP').subscribe((data) => {
      this.docList = data.results;
      this.doc_type = this.docList[0].ref_code;
    });
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  reset() {
    this.fileUploader!.nativeElement.value = null;
    this.selectedFiles = undefined;

    this.doc_tag = '';
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);

        this.uploadService
          .pushFileToStorage(
            this.currentFileUpload,
            this.doc_type,
            this.headerDetailData.patient_id,
            this.doc_tag
          )
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage ? percentage : 0);
              if (this.percentage === 100) {
                this.reset();
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  fileSrc = '';
  fileName = '';
  getFIles() {
    this.uploads = [];
    this.uploads = this.uploadService.getFileList(
      this.headerDetailData.patient_id
    );
    setTimeout(() => {
     this.uploadService.fetchMetaData();
    }, 1000);

    console.log(this.uploads);
  }
  headerDetail = false;
  fileUploads: any;
  imageType = false;
  patientHeaderData(data: any) {
    this.headerDetail = true;
    this.headerDetailData = data;
  }

  view(file: any) {
    this.fileSrc = file.link;
    this.fileName = file.name;

    if (file.type.indexOf('pdf') >= 0) {
      window.open(this.fileSrc, '_blank');
    } else {
      this.imageType = true;
    }
  }
}
