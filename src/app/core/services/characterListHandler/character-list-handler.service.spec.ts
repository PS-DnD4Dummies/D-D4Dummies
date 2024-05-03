import { TestBed } from '@angular/core/testing';

import { CharacterListHandlerService } from './character-list-handler.service';

describe('CharacterListHandlerService', () => {
  let service: CharacterListHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterListHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
