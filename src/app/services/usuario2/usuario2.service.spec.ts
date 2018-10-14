import { TestBed, inject } from '@angular/core/testing';

import { Usuario2Service } from './usuario2.service';

describe('Usuario2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Usuario2Service]
    });
  });

  it('should be created', inject([Usuario2Service], (service: Usuario2Service) => {
    expect(service).toBeTruthy();
  }));
});
