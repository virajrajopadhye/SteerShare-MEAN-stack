import { TestBed } from '@angular/core/testing';

import { RideService } from './ride.service';

describe('RideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RideService = TestBed.get(RideService);
    expect(service).toBeTruthy();
  });
});
