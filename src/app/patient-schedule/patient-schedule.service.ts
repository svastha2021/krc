import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PatientScheduleService {

  constructor(private http: HttpClient) { }

  fetchBuList(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'business/'+org_id,
      { headers: headers })
  }

  fetchPrevDeatils(patient_id: string, bu:string, month:string,year:string): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.get(environment.apiUrl + 'schedules/'+ org_id +'/' + localStorage.getItem('branch_id') + '/' + 
    patient_id+'?bu_id='+bu+'&sch_month='+month+'&sch_year='+year,
      { headers: headers })
  }


  updateDetails(payload:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //http://192.46.215.71:4003/v1/schedule
    return this.http.post(environment.apiUrl + 'schedule', payload,
      { headers: headers })
  }

  getSchTypes(mode:string):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // return this.http.get(environment.apiUrl + 'billing/'+inv_no,
    //   { headers: headers })
    return this.http.get(environment.apiUrl +'references/'+mode,  { headers: headers })
  }
}
