import { TestBed, inject } from '@angular/core/testing';

import { ReservService } from './reserv.service';

describe('ReservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservService]
    });
  });

  it('should be created', inject([ReservService], (service: ReservService) => {
    expect(service).toBeTruthy();
  }));
});
