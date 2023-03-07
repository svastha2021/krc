import { TestBed } from '@angular/core/testing';

import { PatientwiseReportService } from './doctor-report.service';

describe('PatientwiseReportService', () => {
  let service: PatientwiseReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientwiseReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
