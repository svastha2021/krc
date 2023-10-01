import { TestBed } from '@angular/core/testing';

import { VetServiceService } from './vet-service.service';

describe('VetServiceService', () => {
  let service: VetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
