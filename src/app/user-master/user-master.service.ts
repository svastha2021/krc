import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class userMasterService {

    constructor(public http: HttpClient) {}

    createUser(params: any):Observable<any> {
        let headers= new HttpHeaders();
        headers.append('content-Type', 'application/json');
        return this.http.post(environment.apiUrl + 'createuser', params,
        { headers: headers })
    }

    getUserList(branch_id: any, orgId: any):Observable<any> {
        let headers= new HttpHeaders();
        headers.append('content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'users/'+ orgId + '/' + branch_id,
        { headers: headers })
    }

    getUserDetails(branch_id: any, orgId: any, userId: any):Observable<any> {
        let headers= new HttpHeaders();
        headers.append('content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'users/'+ orgId + '/' + branch_id + '?user_id='+ userId,
        { headers: headers })
    }

    getUserTypes():Observable<any>{
        let org_id = localStorage.getItem('org_id');
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl+'references/USRTYP')
    }
}