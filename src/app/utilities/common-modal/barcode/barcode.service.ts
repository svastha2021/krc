import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ManageDialogService {


  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }


  //fetch patient details from mobile number
  fetchUserData(mobile_no: string): Observable<any> {
    //let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patients/' + localStorage.getItem('branch_id') + '?mobile_no=' + mobile_no,
      { headers: headers })
  }


  //http://172.105.36.229:4003/v1/patients/KRC001?mobile_no=7418530091
}
