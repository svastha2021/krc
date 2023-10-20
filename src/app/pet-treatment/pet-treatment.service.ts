import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetTreatmentService {

  constructor(private http: HttpClient) { }

  submitTreatment(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'pettreatment', params, {
      headers: headers,
    });
  }

  getTreatment(patientId: any): Observable<any> {
    const orgId = localStorage.getItem('org_id');
    const branchId = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'pettreatment/'+ orgId +'/'+branchId+'/'+patientId,
      { headers: headers })
    }
}