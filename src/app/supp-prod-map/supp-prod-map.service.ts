import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class suppProdService {

  constructor(private http: HttpClient) { }

  createSP(param:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'createinventoryproduct',param,
      { headers: headers })
  }

  // fetchProducts(bu:string,): Observable<any> {
  //   let branch_id = localStorage.getItem('branch_id');
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.get(environment.apiUrl + 'products/'+branch_id+'?bu_id='+bu,
  //     { headers: headers })
  // }

  getSP(branchId: any, prod_id: any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'inventoryproduct/' + branchId + '/' +prod_id,
      { headers: headers })
  }
}