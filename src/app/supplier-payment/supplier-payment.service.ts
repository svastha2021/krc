import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })

export class SupplierPaymentService {

    constructor(public http: HttpClient) {}

    public getPoSuppPay(org_id: any, branch_id: any, supplierId: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'popayschedulelists/'+org_id+'/' + branch_id +"/" +supplierId +"?payment_status=U",
          { headers: headers })
    }

    createPayment(param:any):Observable<any>{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(environment.apiUrl + 'createposupplierpayment',param,
        { headers: headers })
    }

    public getSuppPayDetails(org_id: any, branch_id: any, supplierId: any, poNumber: any, suppInvNum: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'posupplierpayments/'+org_id+'/' + branch_id +"/" +supplierId +"?po_number=" + poNumber + '&supp_inv_number=' + suppInvNum,
        { headers: headers })
  }
    
}