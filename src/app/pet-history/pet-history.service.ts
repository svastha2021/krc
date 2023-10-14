import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetHistoryService {

  constructor(private http: HttpClient) { }

  submitHistory(history: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'consulting', history, {
      headers: headers,
    });
  }

  fetchPrevDeatils(patient_id: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'consult/' + localStorage.getItem('branch_id') + '?patient_id=' + patient_id,
      { headers: headers }
    );
  }
}