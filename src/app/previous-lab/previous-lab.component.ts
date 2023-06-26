import { Component, Input, OnInit } from '@angular/core';
import { previousLabService } from './previous-lab.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { LabPreparationService } from '../lab-prescription/lab-preparation.service';

export interface LabItem {
  visit_no: any;
  id?: any;
  bu_id?: string;
  product_id?: string;
  test_date?: string;
  prescription_date?: string;
  test_notes?: string;
  remarks?: string;
}

@Component({
  selector: 'app-previous-lab',
  templateUrl: './previous-lab.component.html',
  styleUrls: ['./previous-lab.component.scss']
})
export class PreviousLabComponent implements OnInit {

  @Input()
  headerData: any;
  currentLabDetail: any = [];
  productList: any = [];
  previousData: LabItem[] = [];
  tableData: LabItem[] = [];
  labPayload = {};
  prevCounter: number | undefined;
  recordIndex: number | undefined;
  disableNext = false;
  eod: any;

  constructor(private plService:  previousLabService, private ref: ReferenceService, private lpService: LabPreparationService) { }

  ngOnInit(): void {
    this.fetchPreviousData();
  }

  fetchPreviousData() {
    //@ts-ignore
    this.plService.fetchLastLabDetails(this.headerData.patient_id).subscribe(data => {
      this.previousData = data.results;
      this.tableData = this.previousData
      this.prevCounter = this.tableData[0].visit_no;
      this.setCurrentPatientData();
    })
  }

  setCurrentPatientData() {
    this.currentLabDetail = this.getFilteredData();
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