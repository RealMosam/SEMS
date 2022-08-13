import { TestBed } from '@angular/core/testing';

import { SporteventService } from './sportevent.service';

describe('SporteventService', () => {
  let service: SporteventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SporteventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
