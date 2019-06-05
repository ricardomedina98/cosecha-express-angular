import { TestBed } from '@angular/core/testing';

import { EquivalenciaService } from './equivalencia.service';

describe('EquivalenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquivalenciaService = TestBed.get(EquivalenciaService);
    expect(service).toBeTruthy();
  });
});
