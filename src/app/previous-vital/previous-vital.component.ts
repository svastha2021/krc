import { Component, Input, OnInit } from '@angular/core';
import { previousVitalService } from './previous-vital.service';

export interface LabItem {
  visit_no: any;
  id?: any;
  khi_code?: string;
  khi_value?: string;
  khi_notes?: string;
}

@Component({
  selector: 'app-previous-vital',
  templateUrl: './previous-vital.component.html',
  styleUrls: ['./previous-vital.component.scss']
})
export class PreviousVitalComponent implements OnInit {

  @Input()
  headerDetail: any;
  @Input()
  visit_no: string = '';
  currentVitalDetail: any = [];
  previousData: LabItem[] = [];
  tableData: LabItem[] = [];
  prevCounter: number | undefined;
  recordIndex: number | undefined;
  disableNext = false;

  constructor(private pvService: previousVitalService) { }

  ngOnInit(): void {
    this.fetchVitalPreviousData();
  }

  fetchVitalPreviousData() {
    //@ts-ignore
    this.pvService.fetchLastVitalDetails(this.headerDetail.patient_id).subscribe(data => {
      this.previousData = data.results;
      this.tableData = this.previousData
      this.prevCounter = this.tableData[0].visit_no;
      this.setCurrentPatientData();
    })
  }

  setCurrentPatientData() {
    this.currentVitalDetail = this.getFilteredData();
    if (this.prevCounter! >= this.tableData[0].visit_no) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }

  getFilteredData() {
    return this.tableData.filter((data => data.visit_no === this.prevCounter));
  }

  getLastRecordIndex() {
    return this.prevCounter;
  }
  prevItem() {
    this.prevCounter!--;
    this.setCurrentPatientData();
  }

  nextItem() {
    this.prevCounter!++;
    this.setCurrentPatientData();
  }
}
