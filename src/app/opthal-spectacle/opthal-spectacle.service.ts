import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OpthalSpectacleService {

    constructor(private route: Router, private http: HttpClient) { }

    createSpectacle(params: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.apiUrl + 'createoptholparam',params,
          { headers: headers })
    }

    getSpectacle(orgId: any, branchId: any, patientId: any, paramType: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'optholparamdetail/' + orgId + '/' + branchId + '?patient_id=' + patientId + '&param_type=' + paramType,
          { headers: headers })
    }
}