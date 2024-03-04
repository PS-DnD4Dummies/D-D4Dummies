import { TestBed } from '@angular/core/testing';

import { DndApiService } from './dnd-api.service';

describe('DndApiService', () => {
  let service: DndApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DndApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
