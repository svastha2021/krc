import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Config } from '../config/app.config';

@Injectable({
    providedIn: 'root'
  })

export class SupplierService {

    constructor(public http: HttpClient) {}

    //get supplier list
    public getSupplierList(org_id: any, branch_id: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "content-Type": "application/json",
            }),
        };
        const api_url = this.getSupplierListUrl(org_id, branch_id);
        return this.http.get(api_url, httpOptions);
    }

    private getSupplierListUrl(org_id: any, branch_id: any) {
        const baseUrl = environment.apiUrl;
        let returnUrl = baseUrl + 'suppliers/'+org_id+'/' + branch_id;
        return returnUrl;
    }

    //Create/Update supplier
    public createSupplier(param: any, branchId: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.apiUrl + 'suppliers', param,
          { headers: headers })
      }

    public fetchSupplier(org_id: any, branch_id: any, supplierId: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'suppliers/'+org_id+'/' + branch_id +"?supplier_id=" +supplierId,
          { headers: headers })
    }
}