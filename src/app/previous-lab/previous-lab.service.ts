import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class previousLabService {

  constructor(private http:HttpClient) { }

  fetchProducts(bu:string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'products/'+branch_id+'?bu_id='+bu,
      { headers: headers })
  }

  fetchLastLabDetails(patient_id:any):Observable<any>{
    let branch_id = localStorage.getItem('branch_id');
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'allvisitlabinformation/'+org_id+'/'+branch_id+'/'+patient_id,
      { headers: headers })
  }
  
}