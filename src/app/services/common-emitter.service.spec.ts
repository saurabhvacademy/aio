import { TestBed } from '@angular/core/testing';

import { CommonEmitterService } from './common-emitter.service';

describe('CommonEmitterService', () => {
  let service: CommonEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
