import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-info-obj-dialog',
  templateUrl: './info-obj-dialog.component.html',
  styleUrls: ['./info-obj-dialog.component.scss']
})
export class InfoObjDialogComponent implements OnInit {
  billing: any;

  constructor(
    public dialogRef: MatDialogRef<InfoObjDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.billing = this.data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
