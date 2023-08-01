import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisAndAdviceService {

  constructor(private http: HttpClient) { }

  createDiagnosis(param:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'optholdiagadvise',param,
      { headers: headers })
    }

  getDiagnosis(patientId: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'optholdiagadviselist/' + patientId,
      { headers: headers })
    }
}