import { TestBed } from '@angular/core/testing';

import { AddskilltechService } from './addskilltech.service';

describe('AddskilltechService', () => {
  let service: AddskilltechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddskilltechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
