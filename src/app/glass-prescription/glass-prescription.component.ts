import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlassPrescriptionService } from './glass-prescription.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';

@Component({
  selector: 'app-glass-prescription',
  templateUrl: './glass-prescription.component.html',
  styleUrls: ['./glass-prescription.component.scss']
})
export class GlassPrescriptionComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  glassPrescriptionForm!: FormGroup;
  showPreviousTable:boolean = false;
  vaList = ['6/6', '6/9', '6/12', '6/18', '6/24', '6/36', '6/60', '5/60'];
  subjectDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder, 
              private gpService: GlassPrescriptionService) { }
  
    ngOnInit(): void {
      this.glassPrescription();
    }
  
    glassPrescription() {
      this.glassPrescriptionForm = this.formBuilder.group({
        units: [],
        sph_distance_re: [],
        cyl_distance_re: [],
        axis_distance_re: [],
        sph_distance_le: [],
        cyl_distance_le: [],
        axis_distance_le: [],
        sph_near_re: [],
        cyl_near_re: [],
        axis_near_re: [],
        sph_near_le: [],
        cyl_near_le: [],
        axis_near_le: [],
        va_distance_re: [],
        va_near_re: [],
        va_distance_le: [],
        va_near_le: [],
        sph_add_re: [],
        sph_add_le: [],
        typeof_lens: [],
        lens_material: [],
        contact_lens: [],
        remarks: [],
      })
    }
  
    saveGlassPrescription() {
      const glassForm = this.glassPrescriptionForm.controls;
      let params = {
        "org_id": localStorage.getItem('org_id'),
        "branch_id": localStorage.getItem('branch_id'),
        "user_id": localStorage.getItem('user_id'),
        "patient_id": this.headerDetail.patient_id,
        "visit_no": this.visit_no,
        "visit_date": this.visit_date,
        "units": glassForm.units.value,
        "sph_distance_re": glassForm.sph_distance_re.value,
        "cyl_distance_re": glassForm.cyl_distance_re.value,
        "axis_distance_re": glassForm.axis_distance_re.value,
        "va_distance_re": glassForm.va_distance_re.value,
        "sph_distance_le": glassForm.sph_distance_le.value,
        "cyl_distance_le": glassForm.cyl_distance_le.value,
        "axis_distance_le": glassForm.axis_distance_le.value,
        "va_distance_le": glassForm.va_distance_le.value,
        "sph_add_re": glassForm.sph_add_re.value,
        "sph_add_le": glassForm.sph_add_le.value,
        "sph_near_re": glassForm.sph_near_re.value,
        "cyl_near_re": glassForm.cyl_near_re.value,
        "axis_near_re": glassForm.axis_near_re.value,
        "va_near_re": glassForm.va_near_re.value,
        "sph_near_le": glassForm.sph_near_le.value,
        "cyl_near_le": glassForm.cyl_near_le.value,
        "axis_near_le": glassForm.axis_near_le.value,
        "va_near_le": glassForm.va_near_le.value,
        "typeof_lens": glassForm.typeof_lens.value,
        "lens_material": glassForm.lens_material.value,
        "contact_lens": glassForm.contact_lens.value,
        "remarks": glassForm.remarks.value
      }
      this.gpService.createGlass(params).subscribe(data => {
        console.log(data);
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: 'Glass Prescription Saved Successfully!!!'
        })
      })
    }
  
    getGlassDetail() {
      const patient_id = this.headerDetail.patient_id;
      this.gpService.getGlass(patient_id).subscribe(data => {
        console.log('getGp Data',data);
        this.subjectDetailData = data.results;
        this.subjectDetailData = this.subjectDetailData.reverse();
        this.setCurrentObjectData();
      })
    }
  
    setCurrentObjectData() {
      this.glassPrescriptionForm.patchValue(this.subjectDetailData[this.getLastRecordIndex()]);
      if (this.getLastRecordIndex() <= 0) {
        this.recordIndex = 0;
      }
    }
  
    getLastRecordIndex() {
      return this.subjectDetailData.length - 1;
    }
  
    prevItem() {
      this.prevCounter++;
      this.setCurrentNotesAfterChange();
    }
  
    nextItem() {
      this.prevCounter--;
      this.setCurrentNotesAfterChange();
    }
  
    setCurrentNotesAfterChange() {
      this.recordIndex = this.getLastRecordIndex() - this.prevCounter;
      this.glassPrescriptionForm.patchValue(this.subjectDetailData[this.recordIndex]);
    }
  
    displayPrevious() {
      this.showPreviousTable = true;
      this.getGlassDetail();
    }
  
    back() {
      this.showPreviousTable = false;
      this.addRecord();
    }
  
    addRecord() {
      this.glassPrescriptionForm.reset();
    }
}
