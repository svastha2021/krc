import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BillingService } from '../billing/billing.service';
import { PoService } from '../po/po.service';
import { suppProdService } from '../supp-prod-map/supp-prod-map.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { ReferenceService } from '../utilities/services/reference.service';
import { inventoryConfigService } from './inventory-config.service';

@Component({
  selector: 'app-inventory-config',
  templateUrl: './inventory-config.component.html',
  styleUrls: ['./inventory-config.component.scss']
})
export class InventoryConfigComponent implements OnInit {
  inventoryForm!: FormGroup;
  buList: any;
  branchList: any;
  prodList: any;
  isShowTable: boolean = false;
  dataSource: any;
  displayedColumns: string[] = ['bu_id', 'product_name', 'part_of_inventory', 'edit'];
  invTableData: any;
  updateData: any;
  isShowEdit: boolean = true;
  isDisable: boolean = false;

  constructor(private formBuilder: FormBuilder, private icService: inventoryConfigService, 
    private dialog: MatDialog, private bs: BillingService, private pos: PoService, private spService: suppProdService, private refService: ReferenceService) { }

  ngOnInit(): void {
    this.inventory();
    this.fetchBu();
    this.getBranch();
  }

  inventory() {
    this.inventoryForm = this.formBuilder.group(
      {
        inventory_branch: ['', []],
        bu_id: ['', ],
        product_id: ['', []],
        product_name: [''],
        part_of_inventory: ['', []]
      }
    );
  }

  getBranch(){
    this.pos.getBranchList().subscribe(data => {
      this.branchList = data.results;
    })
  }

  getProduct(event: any) {
    this.prodList = null;
    this.refService.fetchProducts(event).subscribe(data => {
      this.prodList = data.results;
    })
  }

  fetchBu() {
    this.bs.fetchBuList().subscribe(data => {
      this.buList = data.results;
    })
  }

  submit() {
    let params = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id":localStorage.getItem('branch_id'),
      "user_id": localStorage.getItem('user_id'),
      "part_of_inventory": this.inventoryForm.controls.part_of_inventory.value,
      "product_id": this.inventoryForm.controls.product_id.value
    }
    this.icService.createInv(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Inventory Config Saved Successfully!!!'
      })
      this.isShowTable = false;
      this.isDisable = false;
      this.clearFields();
    })
  }

  getInvConfig(event: any) {
    this.icService.getInvList(event).subscribe(data => {
      console.log(data);
      this.isShowTable = true;
      this.invTableData = data.results;
      this.dataSource = new MatTableDataSource(this.invTableData);
    })
  }

  edit(element: any) {
    this.getProduct(element.bu_id)
    this.isShowEdit = false;
    this.isDisable = true;
    console.log(element)
    this.updateData = element;
    this.inventoryForm.controls.product_id.setValue(element.product_id);
    this.inventoryForm.controls.bu_id.setValue(element.bu_id);
    this.inventoryForm.controls.part_of_inventory.setValue(element.part_of_inventory);
  }

  clearFields() {
    this.inventoryForm.controls.inventory_branch.setValue(null);
    this.inventoryForm.controls.product_id.setValue(null);
    this.inventoryForm.controls.bu_id.setValue(null);
    this.inventoryForm.controls.part_of_inventory.setValue(null);
  }
}