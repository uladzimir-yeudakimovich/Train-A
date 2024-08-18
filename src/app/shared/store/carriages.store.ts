import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, setEntity, withEntities } from '@ngrx/signals/entities';
import { carriageConfig } from './carriages.config';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage, CarSeat } from '@shared/models/interfaces/carriage.model';
import { computed } from '@angular/core';

export const CarriagesStore = signalStore(
    { providedIn: 'root' },

    withEntities(carriageConfig),
    
    withMethods((store) => ({
        getCarriage: (carriageCode: string) => store.carriagesEntityMap()[carriageCode] ?? null,
    })),
    
    withMethods((store) => ({
        getCarriageSignal: (carriageCode: string) => computed(() => store.getCarriage(carriageCode)),
        
        getStatesWithSeats: (carriageCode: string) => {
            const carriage = store.getCarriage(carriageCode);
            const statesWithSeats = new Map<SeatState, number[]>();
            Object.values(SeatState).forEach((state) => statesWithSeats.set(state, []));

            carriage.seats.forEach((seat: CarSeat) => {
                statesWithSeats.get(seat.state)!.push(seat.number);
            });
            return statesWithSeats;
        },

        updateSeatState: (carriageCode: string, seatNumber: number, newState: SeatState) => {
            const carriage = store.getCarriage(carriageCode);
            const seat = carriage.seats.find((s) => s.number === seatNumber);
            if (seat) {
                seat.state = newState;
                patchState(store, setEntity(carriage, carriageConfig));
            }
        },

        initState() {
            const carriage: Carriage = {
                code: '1',
                name: 'Carriage 1',
                rows: 3,
                leftSeats: 2,
                rightSeats: 1,
                seats: [
                    { number: 1, state: SeatState.Available },
                    { number: 2, state: SeatState.Available },
                    { number: 3, state: SeatState.Reserved },
                    { number: 4, state: SeatState.Reserved },
                    { number: 5, state: SeatState.Available },
                    { number: 6, state: SeatState.Available },
                ],
            };
            patchState(store, addEntity(carriage, carriageConfig));
        }
    })),
);
