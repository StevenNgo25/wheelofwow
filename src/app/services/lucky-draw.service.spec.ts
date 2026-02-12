import { TestBed } from '@angular/core/testing';

import { LuckyDraw } from './lucky-draw';

describe('LuckyDraw', () => {
  let service: LuckyDraw;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuckyDraw);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
