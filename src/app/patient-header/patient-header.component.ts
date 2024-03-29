import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { PatientHeaderService } from './patient-header.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { Patient } from '../patient-registration/patient.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent implements OnInit {
  @Output()
  outputPatientHeader = new EventEmitter();
  @Output() outputPatientInsHeader = new EventEmitter();
  searchType: string = '';
  patient_name: string = '';
  headerDetail: any;
  patientDetail: boolean = false;
  patientHeader: any;
  patientList = [];
  patientNameList: Patient[] = []!;
  mobile_no: string = '';
  dataSource = new MatTableDataSource(this.patientNameList);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;
  displayedColumns: string[] = ['radio','patient_name', 'father_name','mobile_no','age', 'dob','sex','patient_type' ];
  selectedPerson:any;
  //insurance
  month: string = '';
  year: string = '';
  @Input() insurance: any;
  constructor(private patientHeaderService: PatientHeaderService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchType = 'phone_no'
  }


  fetchUser() {
    this.patientHeaderService.fetchUserData(this.mobile_no).subscribe(data => {
      this.patientDetail = true;
      //this.patientHeader = data.results;
      this.patientList = data.results;
      this.showPatientList(this.patientList);

    })
  }
  fetchUserByName() {
    this.patientHeaderService.fetchUserDataByName(this.patient_name).subscribe(data => {
      this.patientDetail = true;

      this.patientNameList = data.results;
      this.dataSource = data.results;      

    })
    
  }

  fetchUserDetail(rowData:any){
    this.patientHeaderService.fetchHeader(rowData.patient_id).subscribe(data => {
      this.headerDetail = true;
      this.patientHeader = data;
      localStorage.setItem('header', JSON.stringify(data));
      this.outputPatientHeader.emit(this.patientHeader);
    });
  }

  showPatientList(result: any) {
    const dialogRef = this.dialog.open(PatientListDialogComponent, {
      width: '500px',
      data: result,
    });

    dialogRef.afterClosed().subscribe(data => {
      //this.billingItem.patient_id = data.patient_id;
      this.patientHeaderService.fetchHeader(data.patient_id).subscribe(data => {
        this.headerDetail = true;
        this.patientHeader = data;
        if(this.insurance){
          console.log(this.month, this.year)
          let month = this.month;
          let year = this.year;
          this.outputPatientInsHeader.emit({data, month, year});
        }else{
          this.outputPatientHeader.emit(this.patientHeader);
        }
      });

    })
  }
}
