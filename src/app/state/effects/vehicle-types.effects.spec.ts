import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { VehicleTypesEffects } from './vehicle-types.effects';
import * as VehicleTypeActions from '../actions/vehicle-types.actions';
import { ApiService } from '../../core/services/api.service';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { VehicleType } from '../models/vehicle.model';

describe('VehicleTypesEffects', () => {
  let actions$: Observable<any>;
  let effects: VehicleTypesEffects;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getVehicleTypesForMake']);

    TestBed.configureTestingModule({
      providers: [
        VehicleTypesEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: ApiService, useValue: apiServiceSpy },
      ],
    });

    effects = TestBed.inject(VehicleTypesEffects);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('debería despachar loadVehicleTypesSuccess cuando la API responde con éxito', () => {
    const mockVehicleTypes: VehicleType[] = [
      { VehicleTypeId: 1, VehicleTypeName: 'Sedan' },
    ];
    const action = VehicleTypeActions.loadVehicleTypes({ make: 'Toyota' });
    const successAction = VehicleTypeActions.loadVehicleTypesSuccess({
      vehicleTypes: mockVehicleTypes,
    });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: mockVehicleTypes });
    apiService.getVehicleTypesForMake.and.returnValue(response);

    const expected = cold('--c', { c: successAction });
    expect(effects.loadVehicleTypes$).toBeObservable(expected);
  });

  it('debería despachar loadVehicleTypesFailure cuando la API responde con un error', () => {
    const error = { message: 'Error loading vehicle types' };
    const action = VehicleTypeActions.loadVehicleTypes({ make: 'Toyota' });
    const failureAction = VehicleTypeActions.loadVehicleTypesFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    apiService.getVehicleTypesForMake.and.returnValue(response);

    const expected = cold('--c', { c: failureAction });
    expect(effects.loadVehicleTypes$).toBeObservable(expected);
  });
});
