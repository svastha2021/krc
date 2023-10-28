import { outputAst } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-pet-field-image-dialog',
  templateUrl: './pet-section-field-image-view.component.html',
  styleUrls: ['./pet-section-field-image-view.component.scss']
})
export class ViewPetFieldImage implements OnInit {
  imagePath:any;
  editfile:any;

  constructor(
    public dialogRef: MatDialogRef<ViewPetFieldImage> ,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.imagePath = this.data;
  }  
  onNoClick(): void {
    this.dialogRef.close({file:this.editfile, field:this.data});
  }
  cancelItem():void{  
     
    this.dialogRef.close({file:this.editfile, field:this.data});
  }

  save(blob:any){
    this.editfile = new File([blob], "image.png");
    
  }
  }
