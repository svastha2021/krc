import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from './supplier.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../utilities/info-dialog/info-dialog.component';

@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.scss']
})
export class SupplierMasterComponent implements OnInit {
  supplierInputForm!: FormGroup;
  fetchSupplierdata: any;
  supplierList: any;
  folderObjs: any;
  search: any;

  constructor(private supplierService: SupplierService,
    private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.supplierForm();
    this.getSupplierList();
  }

  supplierForm() {
    this.supplierInputForm = this.formBuilder.group(
      {
        supplier_id: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_id: ''],
        supplier_name: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_name: '', [Validators.required]],
        supplier_opendate: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_opendate: '', []],
        supplier_address: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_address: '', ],
        comm_address: [this.fetchSupplierdata ? this.fetchSupplierdata.comm_address: '', ],
        pin_code: [this.fetchSupplierdata ? this.fetchSupplierdata.pin_code: '', ],
        supplier_contact_num: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_contact_num: '', ],
        supplier_email_id: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_email_id: '', ],
        supplier_cont_pers: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_cont_pers: '', []],
        supplier_cont_pers_phone: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_cont_pers_phone: '', []],
        supplier_cont_pers_email: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_cont_pers_email: '', ],
        supplier_website: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_website: '', ],
        supplier_gst_num: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_gst_num: '', ],
        supplier_localgst_num: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_localgst_num: '', ],
        supplier_cst_num: [this.fetchSupplierdata ? this.fetchSupplierdata.supplier_cst_num: '', ],
        credit_days: [this.fetchSupplierdata ? this.fetchSupplierdata.credit_days: '', []],
        pan_no: [this.fetchSupplierdata ? this.fetchSupplierdata.pan_no: '', []],
        dl_no: [this.fetchSupplierdata ? this.fetchSupplierdata.dl_no: '', ],
        bank_name: [this.fetchSupplierdata ? this.fetchSupplierdata.bank_name: '', ],
        bank_branch: [this.fetchSupplierdata ? this.fetchSupplierdata.bank_branch: '', ],
        account_no: [this.fetchSupplierdata ? this.fetchSupplierdata.account_no: '', []],
        ifsc_no: [this.fetchSupplierdata ? this.fetchSupplierdata.ifsc_no: '', ],
        chq_name: [this.fetchSupplierdata ? this.fetchSupplierdata.chq_name: '', ]
      }
    );
    if(this.supplierInputForm.controls.supplier_opendate.value !== null) {
      let split = (this.supplierInputForm.controls.supplier_opendate.value).split("T");
      this.supplierInputForm.controls.supplier_opendate.setValue(split[0]);
    }
  }

  getSupplierList(){
    let branchId = localStorage.getItem('branch_id');
    let org_id = localStorage.getItem('org_id');
    this.supplierService.getSupplierList(org_id, branchId).subscribe(data => {
      console.log("supplier",data.results);
      this.folderObjs = data.results;
    })
  }

  setProductCost(data: any) {
    let branchId = localStorage.getItem('branch_id');
    let org_id = localStorage.getItem('org_id');

    this.folderObjs.forEach((element: any) => {
      if(data === element.supplier_name){
        this.supplierInputForm.controls.supplier_id.setValue(element.supplier_id);
      }
    });
    if(this.supplierInputForm.controls.supplier_id.value  !== null){
      let supplierId = this.supplierInputForm.controls.supplier_id.value;
      this.supplierService.fetchSupplier(org_id, branchId, supplierId).subscribe(data => {
        this.fetchSupplierdata = data.results;
        let get_date1 = (this.fetchSupplierdata.supplier_opendate);
        let get_date = (get_date1).split("-");
        let new_get = get_date[2] + '-' + get_date[1] + '-' + get_date[0];
        this.supplierInputForm.controls.supplier_opendate.setValue(new_get);
        this.supplierForm();
      })
    }
  }

  // fetchData(){
  //   let supplierId = this.supplierInputForm.controls.supplier_id.value;
  //   this.supplierService.fetchSupplier(supplierId).subscribe(data => {
  //     console.log(data);
  //     this.dialog.open(InfoDialogComponent, {
  //       width: '400px',
  //       data: 'Supplier Master Saved Successfully!!!'
  //     })
  //   })
  // }

  submit(){
    let supplierForm = this.supplierInputForm.controls;
    let supplierId = supplierForm.supplier_id.value;
    let branchId = localStorage.getItem('branch_id');
    if(supplierId == ""){
      let params = {
        "org_id": localStorage.getItem('org_id'),
        "branch_id": localStorage.getItem('branch_id'),
        "user_id": localStorage.getItem('user_id'),
        
        "supplier_name": supplierForm.supplier_name.value,
        "supplier_opendate": supplierForm.supplier_opendate.value,
        "supplier_address": supplierForm.supplier_address.value,
        "supplier_contact_num": supplierForm.supplier_contact_num.value,
        "supplier_email_id": supplierForm.supplier_email_id.value,
        "supplier_cont_pers": supplierForm.supplier_cont_pers.value,
        "supplier_cont_pers_phone": supplierForm.supplier_cont_pers_phone.value,
        "supplier_cont_pers_email": supplierForm.supplier_cont_pers_email.value,
        "supplier_website": supplierForm.supplier_website.value,
        "supplier_gst_num": supplierForm.supplier_gst_num.value,
        "supplier_localgst_num": supplierForm.supplier_localgst_num.value,
        "supplier_cst_num": supplierForm.supplier_cst_num.value,
        "comm_address": supplierForm.comm_address.value,
        "pin_code": supplierForm.pin_code.value,
        "bank_branch": supplierForm.bank_branch.value,
        "credit_days": supplierForm.credit_days.value,
        "pan_no": supplierForm.pan_no.value,
        "dl_no": supplierForm.dl_no.value,
        "bank_name": supplierForm.bank_name.value,
        "account_no": supplierForm.account_no.value,
        "ifsc_no": supplierForm.ifsc_no.value,
        "chq_name": supplierForm.chq_name.value
        }
        this.supplierService.createSupplier(params, branchId).subscribe(data => {
          console.log(data);
          this.getSupplierList();
          this.dialog.open(InfoDialogComponent, {
            width: '400px',
            data: 'Supplier Master Saved Successfully!!!'
          })
          this.supplierInputForm.reset();
        })
    }else{
      let params = {
        "org_id": localStorage.getItem('org_id'),
        "branch_id": localStorage.getItem('branch_id'),
        "user_id": localStorage.getItem('user_id'),
        
        "supplier_name": supplierForm.supplier_name.value,
        "supplier_id": supplierForm.supplier_id.value,
        "supplier_opendate": supplierForm.supplier_opendate.value,
        "supplier_address": supplierForm.supplier_address.value,
        "supplier_contact_num": supplierForm.supplier_contact_num.value,
        "supplier_email_id": supplierForm.supplier_email_id.value,
        "supplier_cont_pers": supplierForm.supplier_cont_pers.value,
        "supplier_cont_pers_phone": supplierForm.supplier_cont_pers_phone.value,
        "supplier_cont_pers_email": supplierForm.supplier_cont_pers_email.value,
        "supplier_website": supplierForm.supplier_website.value,
        "supplier_gst_num": supplierForm.supplier_gst_num.value,
        "supplier_localgst_num": supplierForm.supplier_localgst_num.value,
        "supplier_cst_num": supplierForm.supplier_cst_num.value,
        "comm_address": supplierForm.comm_address.value,
        "pin_code": supplierForm.pin_code.value,
        "bank_branch": supplierForm.bank_branch.value,
        "credit_days": supplierForm.credit_days.value,
        "pan_no": supplierForm.pan_no.value,
        "dl_no": supplierForm.dl_no.value,
        "bank_name": supplierForm.bank_name.value,
        "account_no": supplierForm.account_no.value,
        "ifsc_no": supplierForm.ifsc_no.value,
        "chq_name": supplierForm.chq_name.value
        }
        this.supplierService.createSupplier(params, branchId).subscribe(data => {
          console.log(data);
          this.getSupplierList();
          this.dialog.open(InfoDialogComponent, {
            width: '400px',
            data: 'Supplier Master Saved Successfully!!!'
          })
          this.supplierInputForm.reset();
          // this.getSupplierList();
        })
    }
  }

  cancel(){
    this.supplierInputForm.reset();
  }
}
