import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisualAcuityService {

  constructor(private http: HttpClient) { }

  createVisual(param:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'optholvisualacuity',param,
      { headers: headers })
    }

    getVisual(patientId: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'optholvisualacuitylist/' + patientId,
            { headers: headers })
        }
}