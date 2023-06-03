import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BillingService {

  invoice_no: string = '';
  patient_id: string = '';
  currentBillingArray = [];
  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }



  
  fetchProductMaster(type: string): Observable<any> {
    // return this.http.post('https://krcnephrology.herokuapp.com/fetchproducts.php', { product_type: type });
    return this.http.post('http://www.kkkrchennai.com/krc/fetchproducts.php', { product_type: type });
  }
  submitInvoice(billingArray: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'billing',billingArray,
      { headers: headers })
  }  

  
  fetchBuList(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'business/'+org_id,
      { headers: headers })
  }


  fetchProducts(bu:string, patientType: string, eod:string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'products/'+branch_id+'?bu_id='+bu + '&patient_type='+patientType+'&eod_date='+eod+'&screen_id=Invoice',
      { headers: headers })
  }

  fetchUserData(mobile_no: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patients/' + localStorage.getItem('branch_id') + '?mobile_no=' + mobile_no,
      { headers: headers })
  }
  fetchHeader(patient_id:string):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patientheader/'+patient_id,
      { headers: headers })
    
  }


  fetchInvoices(patient_id: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'billings/' + branch_id + '?patient_id=' + patient_id,
      { headers: headers })
  }

  //ClearValidation
  clearValidation(myForm: any, myControl: any) {
    myForm.controls.other_charge1.clearValidators();
    myForm.controls.other_charge_remark1.clearValidators();
    myForm.controls.other_charge2.clearValidators();
    myForm.controls.other_charge_remark2.clearValidators();
    myForm.controls.other_charge3.clearValidators();
    myForm.controls.other_charge_remark3.clearValidators();
    myForm.controls.discount1.clearValidators();
    myForm.controls.discount_remark1.clearValidators();
    myForm.controls.discount2.clearValidators();
    myForm.controls.discount_remark2.clearValidators();
    myForm.controls.discount3.clearValidators();
    myForm.controls.discount_remark3.clearValidators();
    myControl.product_name.clearValidators();
  }
}
