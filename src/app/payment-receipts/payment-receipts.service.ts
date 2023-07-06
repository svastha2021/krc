import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentReceiptsService {

  constructor(private http: HttpClient) { }

  getBranchList():Observable<any>{
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'branches/'+org_id,
    { headers: headers })
  }

  public getEodDetailData(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'eodinfo/' + org_id + '/' + branch_id,
      { headers: headers })
  }

  getPaymentModes(mode: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // return this.http.get(environment.apiUrl + 'billing/'+inv_no,
    //   { headers: headers })
    return this.http.get(environment.apiUrl + 'references/' + mode, { headers: headers })
  }


  // fetch doctot list from branch id
  fetchDoctors(): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'doctors/' + branch_id,
      { headers: headers })
  }

  // fetch Acc master
  fetchAcMaster(): Observable<any> {
    let org = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'accounts/'+org,
      { headers: headers })
  }
  //http://192.46.215.71:4003/v1/users/KRC/KRC0001
  // fetch emp list
  fetchUsers(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'users/'+org_id+'/'+branch_id,
      { headers: headers })
  }

 // accounts/KRC?account_type=P

  fetchAcMasterByType(type:string): Observable<any> {
    let org = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'accounts/'+org+'?account_type='+type,
      { headers: headers })
  }


  submitPayment(item: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'createreceiptspayments',item,
      { headers: headers })
  }


  public getSupplierList(branch_id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "content-Type": "application/json",
      }),
    };
    const api_url = this.getSupplierListUrl(branch_id);
    return this.http.get(api_url, httpOptions);
  }

  private getSupplierListUrl(branch_id: any) {
    const baseUrl = environment.apiUrl;
    let returnUrl = baseUrl + "suppliers/KRC/" + branch_id;
    return returnUrl;
  }

  
  
}
