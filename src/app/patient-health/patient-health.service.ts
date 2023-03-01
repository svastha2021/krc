import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PatientHealthService {

  invoice_no: string = '';
  currentBillingArray = [];
  constructor(private route: Router, private http: HttpClient) { }


  getPatientData(patient_id: string, org_id: any, branch_id: any):Observable<any>{
    
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patientreport/' + org_id + '/' + branch_id + '/' +patient_id,
      { headers: headers })
  }
 
  getPatientHeader(patient_id: string, branch_id: any):Observable<any>{
    
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patients/' + branch_id + '?patient_id=' + patient_id,
      { headers: headers })
  }

}