import { TestBed } from '@angular/core/testing';

import { ClothesDbService } from './clothes-db.service';

describe('ClothesDbService', () => {
  let service: ClothesDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothesDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
