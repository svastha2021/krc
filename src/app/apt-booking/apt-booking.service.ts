import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AptBookingService {
  constructor(
    private authService: AuthService,
    private route: Router,
    private http: HttpClient
  ) {}

  //fetch patient details from mobile number
  fetchUserData(mobile_no: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
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

  bookApt(aptObj: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'bookappointments', aptObj, {
      headers: headers,
    });
  }

  updateApt(updateObj: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      environment.apiUrl + 'updateappointment/' + updateObj.appoint_no,
      updateObj,
      { headers: headers }
    );
  }

  getCurrentAppointments(appointDate: any): any {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl +
        'appointments/' +
        branch_id +
        '?appoint_date=' +
        appointDate,
      { headers: headers }
    );
  }
  // fetch doctot list from branch id
  fetchDoctors(): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'doctors/' + branch_id, {
      headers: headers,
    });
  }

  getAppointments(payload: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // if (payload.field === 'phone_no') {
    //   return this.http.get(environment.apiUrl + 'appointments/' +localStorage.getItem('branch_id') +'?'+ payload.field + '=' + payload[payload.field], { headers: headers })
    // } else
    return this.http.get(
      environment.apiUrl +
        'appointments/' +
        localStorage.getItem('branch_id') +
        '?' +
        payload.field +
        '=' +
        payload[payload.field],
      { headers: headers }
    );
  }
}
