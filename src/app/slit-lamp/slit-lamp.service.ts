import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SlitLampService {

    constructor(private route: Router, private http: HttpClient) { }

    createSlitLamp(params: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.apiUrl + 'createoptholslitlamp',params,
          { headers: headers })
    }

    getSlitLamp(orgId: any, branchId: any, patientId: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'optholslitlamp/' + orgId + '/' + branchId + '?patient_id=' + patientId,
          { headers: headers })
    }
}