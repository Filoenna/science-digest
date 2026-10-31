import { TestBed } from '@angular/core/testing';

import { PaperApi } from './paper-api';

describe('PaperApi', () => {
  let service: PaperApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaperApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
