import { TestBed } from '@angular/core/testing';

import { EdEventService } from './ed-event.service';

describe('EdEventService', () => {
  let service: EdEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
