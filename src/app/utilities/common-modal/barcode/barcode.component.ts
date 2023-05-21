import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnInit {
  message: any;

  constructor(
    private router: Router,
    
  ) {}

  ngOnInit(): void {
   
  }
  
}
