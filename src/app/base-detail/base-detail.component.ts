import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReferenceService } from '../utilities/services/reference.service';
import { UtilityService } from '../utilities/services/utility.service';
@Component({
  selector: 'app-base-detail',
  templateUrl: './base-detail.component.html',
  styleUrls: ['./base-detail.component.scss'],
})
export class BaseDetailComponent implements OnInit, OnDestroy {
  today = new Date();
  intervalId: any;
  eod: any;
  userData = { user_name: '', branch_name: '', branch_id: '' };
  constructor(private ref: ReferenceService, private us: UtilityService) {}

  ngOnInit(): void {
    this.fetchUserData();
    this.fetchEOD();
    this.intervalId = setInterval(() => {
      this.today = new Date();
    }, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  fetchUserData() {
    this.userData.user_name = localStorage.getItem('user_name')!;
    this.userData.branch_name = localStorage.getItem('branch_name')!;
    this.userData.branch_id = localStorage.getItem('branch_id')!;
  }

  fetchEOD() {
    this.ref.getEodDetailData().subscribe((data) => {
      this.eod = this.us.convertTodayTostrDDMMYYYY(data.results[0].eod_date);
      this.ref.setEodDate(data.results[0].eod_date);
    });
  }
}
