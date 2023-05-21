import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarcodeComponent } from './barcode/barcode.component';
import { Router } from '@angular/router';
import { createComponent } from '@angular/compiler/src/core';
@Component({
  selector: 'app-view-product-dialog',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss'],
})
export class CommonModalComponent implements OnInit {
  productList: any;
  private rootViewContainer!: ViewContainerRef;
  constructor(
    public dialogRef: MatDialogRef<CommonModalComponent>,
    private factoryResolver: ComponentFactoryResolver,
    private appref: ApplicationRef,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const factory = this.factoryResolver.resolveComponentFactory(
      this.data.component
    );
    this.rootViewContainer.createComponent(factory);
    // Locate a DOM node that would be used as a host.
    const host = document.getElementById('modalContainer');

    // Get an `EnvironmentInjector` instance from the `ApplicationRef`.
    //const environmentInjector = this.appref.injector;

    // We can now create a `ComponentRef` instance.
    const componentRef = createComponent(this.data.component, {
      host      
    });

    // Last step is to register the newly created ref using the `ApplicationRef` instance
    // to include the component view into change detection cycles.
    this.appref.attachView(componentRef.hostView);

    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  cancelItem(): void {
    this.dialogRef.close(true);
  }
}
