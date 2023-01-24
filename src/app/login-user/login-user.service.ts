import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor( private http: HttpClient) { }

  changePassword(params: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'changepassword',params,
      { headers: headers })
  }
  
  getPassword(org_id: any, branch_id: any, user_id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'userpassword/' + org_id + '/' +branch_id+ '/' + user_id,
      { headers: headers })
  } 
}
