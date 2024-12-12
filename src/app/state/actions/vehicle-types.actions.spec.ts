import {
    loadVehicleTypes,
    loadVehicleTypesSuccess,
    loadVehicleTypesFailure,
    clearVehicleTypes,
  } from './vehicle-types.actions';
  import { VehicleType } from '../models/vehicle.model';
  
  describe('Vehicle Types Actions', () => {
    it('loadVehicleTypes debería crear la acción con la marca proporcionada', () => {
      const make = 'Toyota';
      const action = loadVehicleTypes({ make });
      expect(action.type).toEqual('[Vehicle Types] Load Vehicle Types');
      expect(action.make).toEqual(make);
    });
  
    it('loadVehicleTypesSuccess debería crear la acción con los tipos de vehículos proporcionados', () => {
      const testVehicleTypes: VehicleType[] = [
        { VehicleTypeId: 1, VehicleTypeName: 'Car' },
        { VehicleTypeId: 2, VehicleTypeName: 'Truck' },
      ];
  
      const action = loadVehicleTypesSuccess({ vehicleTypes: testVehicleTypes });
      expect(action.type).toEqual('[Vehicle Types] Load Vehicle Types Success');
      expect(action.vehicleTypes).toEqual(testVehicleTypes);
    });
  
    it('loadVehicleTypesFailure debería crear la acción con el error proporcionado', () => {
      const testError = { message: 'Error al cargar tipos de vehículos' };
      const action = loadVehicleTypesFailure({ error: testError });
      expect(action.type).toEqual('[Vehicle Types] Load Vehicle Types Failure');
      expect(action.error).toEqual(testError);
    });
  
    it('clearVehicleTypes debería crear la acción sin props', () => {
      const action = clearVehicleTypes();
      expect(action.type).toEqual('[Vehicle Types] Clear Vehicle Types');
    });
  });
  