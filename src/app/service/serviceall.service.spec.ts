import { TestBed } from '@angular/core/testing';

import { ServiceallService } from './serviceall.service';

describe('ServiceallService', () => {
  let service: ServiceallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
