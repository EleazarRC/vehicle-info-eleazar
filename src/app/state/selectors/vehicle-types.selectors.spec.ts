import { selectVehicleTypesState, selectAllVehicleTypes, selectVehicleTypesError } from './vehicle-types.selectors';
import { State } from '../reducers/vehicle-types.reducer';
import { VehicleType } from '../models/vehicle.model';

describe('VehicleTypes Selectors', () => {
  const testVehicleTypes: VehicleType[] = [
    { VehicleTypeId: 1, VehicleTypeName: 'Sedan' },
    { VehicleTypeId: 2, VehicleTypeName: 'Coupe' },
  ];

  const errorObj = { message: 'Error loading vehicle types' };

  const state: State = {
    vehicleTypes: testVehicleTypes,
    error: errorObj,
  };

  it('selectVehicleTypesState debería devolver el estado de vehicleTypes', () => {
    const result = selectVehicleTypesState.projector(state);
    expect(result).toEqual(state);
  });

  it('selectAllVehicleTypes debería devolver todos los tipos de vehículos', () => {
    const result = selectAllVehicleTypes.projector(state);
    expect(result).toEqual(testVehicleTypes);
  });

  it('selectVehicleTypesError debería devolver el error', () => {
    const result = selectVehicleTypesError.projector(state);
    expect(result).toEqual(errorObj);
  });
});
