import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ReferenceService } from '../utilities/services/reference.service';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})
export class MultiselectComponent implements OnInit {
  @ViewChild(MatSelect) matSelect: MatSelect | undefined;
  @Input() rowData: any;
  @Input() left: string = '';
  constructor(private ref: ReferenceService) {}
  ngOnInit(): void {
    console.log(this.rowData);
    this.reList = [];
  }
  setIDs(code: any, id: string) {
    return code + id;
  }
  convertToStr(event: any, _formName: any) {
    console.log(event);
    if (this.left === '_RE') {
      let value = event.value.toString();
      const inputRE = document.getElementById(
        this.setIDs(_formName, this.left)
      ) as HTMLInputElement | null;
      console.log(inputRE);
      if (inputRE != undefined) {
        inputRE.value = value;
      }
    }

    // this.examForm.controls[formName].setValue(value);
  }

  open() {
    this.matSelect?.open();
  }
  loadData() {
    this.ref.getPaymentModes(this.rowData.lov_name).subscribe((data) => {
      this.reList = data.results;
      setTimeout(() => {
        this.matSelect?.open();
      }, 1000);
    });
  }
  reList: any[] = [];
}
