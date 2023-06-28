import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DocConsultationService {
  constructor(
    private authService: AuthService,
    private route: Router,
    private http: HttpClient
  ) {}

  submitNotes(docNotes: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'consulting', docNotes, {
      headers: headers,
    });
  }
  updatePatientConsult(docNotes: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'dialysisconsulting', docNotes, {
      headers: headers,
    });
  }

  fetchPrevDeatils(patient_id: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl +
        'consult/' +
        localStorage.getItem('branch_id') +
        '?patient_id=' +
        patient_id,
      { headers: headers }
    );
  }

  fetchPrevDialysisDetails(patient_id: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'dialysis/' + patient_id, {
      headers: headers,
    });
  }

  fetchVitalParams(): Observable<any> {
    // let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'vitalparams', {
      headers: headers,
    });
  }

  updateVital(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'healthconsulting', params, {
      headers: headers,
    });
  }

  getVitalData(patient_id: any) {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'allvisithealthparaminformation/' + org_id + '/' + branch_id + '/' +patient_id, {
      headers: headers,
    });
  }
}
