import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { HighlightSpanKind } from 'typescript';
import { UtilityService } from 'src/app/utilities/services/utility.service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'inv-product-list-table',
  styleUrls: ['invoice-product-table.component.scss'],
  templateUrl: 'invoice-product-table.component.html',
})
export class InvoiceProductTable implements OnInit {
  @Input()
  set patientList(value: any) {
    console.log(value);
    this.dataSource.data = value;   
  }
  
  dataSource = new MatTableDataSource(this.patientList);
  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  displayedColumns = [
    'inv_date',
    'invoice_no',
    'patient_name',
    'patient_id',
    'patient_type',
    'bu_id',    
    'product_name',
    'product_qty',
    'product_value',
    'tot_charges',
    'gross_discount',
    'net_amount',
    
   
  ];
  ngOnInit() {
    //this.
  }
  constructor(private util: UtilityService, private changeDetectorRefs: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    const sortState: Sort = { active: 'name', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  export() {
    this.util.exportArrayToExcel(this.dataSource.data, 'patientListing');
  }
}
