import { Time } from '@angular/common';

export interface Appointment {
  appoint_no?: string;
  patient_name?: string;
  patient_id: string;
  appoint_date: any;
  doctor_id?: string;
  ailment?: string;
  phone_no: string;
  branch_id?: string;
  org_id?: string;
  appointment_time?: string;
  dept_id?: string;
  appoint_status?: string;
}
