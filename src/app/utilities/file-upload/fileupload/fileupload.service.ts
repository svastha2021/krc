import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/storage';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from './fileupload.model';
import { UtilityService } from 'src/app/utilities/services/utility.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';
  private fileList: any = [];

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private util: UtilityService
  ) {}
  uploads: Observable<FileUpload[]> | undefined;
  pushFileToStorage(
    fileUpload: FileUpload,

    pid: any
  ): Observable<any> {
    const today = this.util.convertTodayTostrDDMMYYYY();
    //fileUpload.name = this.updateFileName(pid);
    const filePath = `${localStorage.getItem('org_id')}/${localStorage.getItem(
      'branch_id'
    )}/${pid}/${today}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    var metadata = {
      customMetadata: {
        // description: tag,
        file_type: fileUpload.file.type,
      },
    };

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.updateMetadata(metadata);
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  updateFileName(pid: string) {
    let filename = '';
    filename = pid + this.util.getTodayDDMMYYYYHHMM();
    return filename;
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }
  private files = new BehaviorSubject<any>(null);
  public files$ = this.files.asObservable();
public fielsarray = [];
  setFiles(filesArray: any) {
    this.fielsarray = filesArray;
    this.files.next(filesArray);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }

  fileObservables: AngularFireStorageReference[] = [];

  getFileList(folder: string) {
    this.fileList = [];
    const foldername =
      '/' +
      localStorage.getItem('org_id') +
      '/' +
      localStorage.getItem('branch_id') +
      '/' +
      folder;
    const ref = this.storage.ref(foldername);

    let myurlsubscription = ref.listAll().subscribe((folder) => {
      let visits = folder.prefixes.length;
      for (let i = 0; i < visits; i++) {
        let obj = folder.prefixes[i].name;
        const ref_child = this.storage.ref(foldername + '/' + obj);
        ref_child.listAll().subscribe((data) => {
          for (let i = 0; i < data.items.length; i++) {
            let name = data.items[i].name;
            let newref = this.storage.ref(
              foldername + '/' + obj + '/' + data.items[i].name
            );
           // this.fileObservables.push(newref);
            var that = this;
            newref.getDownloadURL().subscribe((data) => {
              that.fileList.push({
                name: name,
                link: data,
              });
              that.setFiles(this.fileList);
            });
          }
        });
      }
    });

    return this.fileList;
  }

  spliceIntoChunks(arr: any, chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }

  fetchMetaData() {
    let fileupload: never[] = [];
    this.fileObservables.forEach((item) => {
      item.getMetadata().subscribe((data) => {
        console.log(item);
        fileupload = this.fileList?.find(
          (item: { name: any; description: any; type: string }) => {
            if (item.name === data.name) {
              console.log('equal');
              item.description = data.customMetadata.description;
              item.type = data.customMetadata.file_type;
            }
          }
        );
        console.log(fileupload);
      });
      return fileupload;
    });
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
