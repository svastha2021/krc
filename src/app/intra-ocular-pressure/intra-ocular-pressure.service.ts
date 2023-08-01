import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntraOcularPressureService {

  constructor(private http: HttpClient) { }

  createIop(param:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'optholintraocularpressure',param,
      { headers: headers })
    }

  getIop(patientId: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'optholintraocularpressurelist/' + patientId,
      { headers: headers })
    }
}