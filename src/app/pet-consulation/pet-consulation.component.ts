import { Component } from '@angular/core';
import { aptModel } from '../apt-booking/apt-booking.service';
import { DocConsultationService } from '../doc-consultation/doc-consultation.service';
import { ReferenceService } from '../utilities/services/reference.service';

@Component({
  selector: 'app-pet-consulation',
  templateUrl: './pet-consulation.component.html',
  styleUrls: ['./pet-consulation.component.scss'],
})
export class PetConsulationComponent {
  aptObj = {} as aptModel;
  headerDetail: any;
  visit_no: any;
  constructor(
    private docService: DocConsultationService,
    private ref: ReferenceService
  ) {}

  ngOnInit(): void {
    if (history.state && history.state.patient_id) {
      this.aptObj = history.state;
      this.ref.fetchHeader(history.state.patient_id).subscribe((data) => {
        this.patientHeader(data);
      });
    }
  }

  patientHeader(data: any) {
    this.headerDetail = { ...data };
    localStorage.setItem('header', JSON.stringify(this.headerDetail));
  }
}
