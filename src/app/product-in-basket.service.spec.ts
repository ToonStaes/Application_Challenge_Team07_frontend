import { TestBed } from '@angular/core/testing';

import { ProductInBasketService } from './product-in-basket.service';

describe('ProductInBasketService', () => {
  let service: ProductInBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
