import { signal } from '@angular/core';
import { Carriage } from '@shared/models/interfaces/carriage.model';

export const mockCarriageStore = {
  getCarriages: jest.fn(),
  carriagesEntities: signal<Carriage[]>([]),
  getCarriageSignal: jest.fn().mockReturnValue(signal<Carriage | null>(null)),
};
