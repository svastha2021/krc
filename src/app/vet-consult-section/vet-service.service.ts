import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VetServiceService {
  constructor(private http: HttpClient) {}

  getPetMetaData(
    pid: string,
    visit_no: string,
    heading: string
  ): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let url =
      environment.apiUrl +
      'petconsultdetail/' +
      org_id +
      '/' +
      branch_id +
      '/' +
      pid +
      '?visit_no=' +
      visit_no +
      '&heading=' +
      heading;

    https: return this.http.get(url, {
      headers: headers,
    });
  }

  public saveVetData(vetPayload: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'petconsulting', vetPayload, {
      headers: headers,
    });
  }


  public uploadFile(formData: any, pid:string): Observable<any> {    
    console.log(formData);
    return this.http.post(environment.apiUrl+'upload', formData);
  }



  public uploadFileBase64(payload: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    console.log(payload)
    return this.http.post('http://localhost:3000/v1/uploadimage', payload);
  }

  public previousVetData(pid: string, heading: string): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let url =
      environment.apiUrl +
      'petlist/' +
      org_id +
      '/' +
      branch_id +
      '/' +
      pid +
      '?heading=' +
      heading;

    https: return this.http.get(url, {
      headers: headers,
    });
  }

  // https://node-dev.vibhavatech.com/v1/petlist/KRC/KRC0001/PATKRC000100023?heading=Cornea%20and%20Sclera
}
