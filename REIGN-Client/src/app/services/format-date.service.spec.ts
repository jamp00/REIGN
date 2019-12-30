import { TestBed } from '@angular/core/testing';

import { niceDateFormatPipe } from './format-date.service';

describe('niceDateFormatPipe', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: niceDateFormatPipe = TestBed.get(niceDateFormatPipe);
    expect(service).toBeTruthy();
  });
});
