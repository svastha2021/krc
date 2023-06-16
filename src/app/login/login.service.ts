import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

export type loginUserData = {
  branch_id: string;
  branch_name: string;
  org_id: string;
  user_id: string;
  user_name: string;
  user_status: string;
  user_type: string;
};
export type loginPayload = { userId: ''; pwd: '' };

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isUserLoggedIn = false;
  userData: loginUserData | undefined;
  userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  login(loginData: loginPayload): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      environment.apiUrl + 'login',
      { user: { user_id: loginData.userId, pwd: loginData.pwd } },
      { headers: headers }
    );
  }

  getUserData() {
    return this.userData;
  }
}
