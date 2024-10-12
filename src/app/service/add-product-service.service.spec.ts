import { TestBed } from '@angular/core/testing';

import { AddProductServiceService } from './add-product-service.service';

describe('AddProductServiceService', () => {
  let service: AddProductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProductServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
