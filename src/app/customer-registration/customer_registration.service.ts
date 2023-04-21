import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PatientRegService {


  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }




  registerPatient(patientObj: any) {
    //return this.http.post('http://www.kkkrchennai.com/krc/patient-save.php', patientObj);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'createpatient', patientObj,
      { headers: headers })
  }
  updatePatient(updateObj: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + 'updatepatient/' + updateObj.patient_id, updateObj,
      { headers: headers })
  }

  
  getPatientTypes():Observable<any>{
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl+'references/PATTYP')
  }

}
