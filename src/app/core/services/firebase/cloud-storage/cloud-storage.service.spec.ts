import { TestBed } from '@angular/core/testing';

import { CloudStorageService } from './cloud-storage.service';

describe('CloudStorageService', () => {
  let service: CloudStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
