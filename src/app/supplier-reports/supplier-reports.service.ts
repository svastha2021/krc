import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class supplierReportsService {

    constructor(private http: HttpClient) { }

    retrieveData(org_id: any, branchId: any, fromDate: any, toDate: any):Observable<any>{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'supplierpaymentreport/'+org_id+'/'+branchId+'?from_date='+fromDate+'&to_date'+toDate,
      { headers: headers })
    }
}