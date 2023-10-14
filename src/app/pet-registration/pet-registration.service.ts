import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetRegistrationService {

  constructor(private http: HttpClient) { }

  createPetReg(petObj: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'createpatient', petObj,
      { headers: headers })
  }

  updatePetReg(updateObj: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + 'updatepatient/' + updateObj.patient_id, updateObj,
      { headers: headers })
  }
}