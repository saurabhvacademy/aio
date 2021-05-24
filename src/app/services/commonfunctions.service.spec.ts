import { TestBed } from '@angular/core/testing';

import { CommonfunctionsService } from './commonfunctions.service';

describe('CommonfunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonfunctionsService = TestBed.get(CommonfunctionsService);
    expect(service).toBeTruthy();
  });
});
