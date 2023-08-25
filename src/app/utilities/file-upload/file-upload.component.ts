import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReferenceService } from '../../utilities/services/reference.service';
import { FileUpload } from './fileupload/fileupload.model';
import { FileUploadService } from './fileupload/fileupload.service';
@Component({
  selector: 'app-opthal-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class ImageFileUploadComponent implements OnInit {
  @Input() headerDetail: any;
  previousFiles: any = [];
  finalList: any[] = [];
  constructor(
    private uploadService: FileUploadService,
    private ref: ReferenceService
  ) {
    this.uploadService.files$.subscribe((data) => {
      console.log('data from service', this.uploadService.fielsarray);
      //this.uploadService.spliceIntoChunks(data, 2)
      if (data) {
        console.log(data);
        this.finalList.push(data);
        //  console.log(this.finalList);
        // this.left_url = data[0].link;
        // this.right_url = data[1]?.link;
        setTimeout(() => {
          if (data && data.length > 0) {
            this.previousFiles = this.uploadService.spliceIntoChunks(data, 2);
            console.log('prev files', this.previousFiles);
            this.prevFilesItem();
            //let lastItem = this.previousFiles[0];
           // this.left_url = lastItem[0].link;
           // this.right_url = lastItem[1].link;
          }
        }, 3000);
      }
    });
  }

  uploads: any;
  left_url: any;
  right_url: any;
  msg = '';

  files2Upload: FileList[] = [];

  selectedFiles?: FileList;
  ngOnInit(): void {}

  prevUploadsCounter = 0;
  recordIndexFiles: number | undefined;
  currentFilesDetail = undefined;
  getLastFilesRecordIndex() {
    return this.previousFiles.length - 1;
  }
  prevFilesItem() {
    this.prevUploadsCounter++;
    this.setCurrentDialysisAfterChange();
  }

  nextFilesItem() {
    this.prevUploadsCounter--;
    this.setCurrentDialysisAfterChange();
  }

  setCurrentDialysisAfterChange() {
    this.recordIndexFiles =
      this.getLastFilesRecordIndex() - this.prevUploadsCounter;
    this.currentFilesDetail =
      this.previousFiles[this.recordIndexFiles]; // give us back the item of where we are now
      this.left_url = this.previousFiles[this.recordIndexFiles][0].link;
      this.right_url = this.previousFiles[this.recordIndexFiles][1].link;
   
  }

  selectRightFile(event: any, left: boolean) {
    let leftEye = left;
    this.selectedFiles = event.target.files;
    this.files2Upload.push(event.target.files);
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      if (leftEye) {
        this.left_url = reader.result;
      } else {
        this.right_url = reader.result;
      }
    };
  }
  currentFileUpload?: FileUpload;
  percentage = 0;
  headerDetailData: any;
  upload(): void {
    if (this.files2Upload) {
      for (let i = 0; i < this.files2Upload.length; i++) {
        const file: File | null = this.files2Upload[i].item(0);

        if (file) {
          this.currentFileUpload = new FileUpload(file);

          this.uploadService
            .pushFileToStorage(
              this.currentFileUpload,
              this.headerDetail.patient_id
            )
            .subscribe(
              (percentage) => {
                this.percentage = Math.round(percentage ? percentage : 0);
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }
    }
  }
  hideUpload = false;

  getFIles() {
    this.hideUpload = true;
    this.uploads = [];
    let getList = this.uploadService.getFileList(this.headerDetail.patient_id);

    // setTimeout(() => {
    //  this.uploadService.fetchMetaData();
    // }, 1000);
  }

  goBack(){
    this.hideUpload = false;
  }
}
