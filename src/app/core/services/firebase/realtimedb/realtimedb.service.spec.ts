import { TestBed } from '@angular/core/testing';

import { RealtimedbService } from './realtimedb.service';

describe('RealtimedbService', () => {
  let service: RealtimedbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimedbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
