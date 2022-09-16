import { TestBed } from '@angular/core/testing';

import { HomeschoolhoureventService } from './homeschoolhourevent.service';

describe('HomeschoolhoureventService', () => {
  let service: HomeschoolhoureventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeschoolhoureventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
