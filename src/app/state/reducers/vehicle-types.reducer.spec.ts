import { vehicleTypesReducer, initialState, State } from './vehicle-types.reducer';
import * as VehicleTypeActions from '../actions/vehicle-types.actions';
import { VehicleType } from '../models/vehicle.model';

describe('VehicleTypes Reducer', () => {
  const testVehicleTypes: VehicleType[] = [
    { VehicleTypeId: 1, VehicleTypeName: 'Sedan' },
    { VehicleTypeId: 2, VehicleTypeName: 'SUV' },
  ];

  it('debería devolver el estado inicial por defecto', () => {
    const action = { type: 'Unknown' } as any;
    const result = vehicleTypesReducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('debería cargar los tipos de vehículos con loadVehicleTypesSuccess', () => {
    const action = VehicleTypeActions.loadVehicleTypesSuccess({ vehicleTypes: testVehicleTypes });
    const result = vehicleTypesReducer(initialState, action);

    expect(result.vehicleTypes).toEqual(testVehicleTypes);
    expect(result.error).toBeNull();
  });

  it('debería manejar errores con loadVehicleTypesFailure', () => {
    const testError = { message: 'Error al cargar tipos de vehículos' };
    const action = VehicleTypeActions.loadVehicleTypesFailure({ error: testError });
    const result = vehicleTypesReducer(initialState, action);

    expect(result.error).toEqual(testError);
    expect(result.vehicleTypes).toEqual([]);
  });

  it('debería limpiar los tipos de vehículos con clearVehicleTypes', () => {
    const stateWithVehicleTypes: State = {
      vehicleTypes: testVehicleTypes,
      error: null,
    };
    const action = VehicleTypeActions.clearVehicleTypes();
    const result = vehicleTypesReducer(stateWithVehicleTypes, action);

    expect(result).toEqual(initialState);
    expect(result.vehicleTypes).toEqual([]);
    expect(result.error).toBeNull();
  });
});
