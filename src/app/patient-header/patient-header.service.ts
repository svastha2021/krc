import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export type PatientHeader = {
  org_id: string;
  branch_id: string;
  patient_id: string;
  patient_name: string;
  age: string;
  sex: string;
  mobile_no: string;
  patient_type: string;
  patient_type_name: string;
  dob: string;
  advance_amount_paid: string;
  advance_amount_balance: string;
  net_inv_amount: string;
  net_inv_paid: string;
  net_inv_balance: string;
};
@Injectable({
  providedIn: 'root',
})
export class PatientHeaderService {
  constructor(private http: HttpClient) {}

  fetchHeader(patient_id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patientheader/' + patient_id, {
      headers: headers,
    });
  }

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

  fetchUserDataByName(patient_name: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
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
}
