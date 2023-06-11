import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ManagePatientService {
  constructor(
    private authService: AuthService,
    private route: Router,
    private http: HttpClient
  ) {}

  //fetch patient details from mobile number
  fetchUserData(mobile_no: string): Observable<any> {
    //let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl +
        'patients/' +
        localStorage.getItem('branch_id') +
        '?mobile_no=' +
        mobile_no,
      { headers: headers }
    );
  }

  fetchUserByName(patient_name: string): Observable<any> {
    //let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl +
        'patients/' +
        localStorage.getItem('branch_id') +
        '?patient_name=' +
        patient_name,
      { headers: headers }
    );
  }

  fetchPatientSchedule(from_date: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // return this.http.get(

    //   'https://node-dev.vibhavatech.com/v1/fetchpatientschedule/KRC/KRC0001?from_date=2023-06-01&to_date=2023-06-20',
    //   { headers: headers }
    // );
    return this.http.get(
      environment.apiUrl +
        'fetchpatientschedule/' +
        localStorage.getItem('org_id') +
        '/' +
        localStorage.getItem('branch_id') +
        '?from_date=' +
        from_date,
      { headers: headers }
    );
  }
}
