import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DoctorReportService {

  constructor(private http:HttpClient) { }


  retrieveData(fromDate:any, toDate:any):Observable<any>{
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'doctorsummaryreport/'+org_id+'/'+branch_id+'?from_date='+fromDate+'&to_date='+toDate,
      { headers: headers })
    //return this.http.get(environment.apiUrl)

    //http://192.46.215.71:4003/v1/patienttypereport/KRC/KRC0001?from_date=2022-07-04&to_date=2022-07-08
  }
}
