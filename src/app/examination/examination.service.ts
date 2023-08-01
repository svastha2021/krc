import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

    constructor(private route: Router, private http: HttpClient) { }

    createExam(params: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.apiUrl + 'optholexamination',params,
          { headers: headers })
    }

    getExam(patientId: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'optholexaminationlist/' + patientId,
          { headers: headers })
    }
}