import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/vehicle-types.reducer';

// Selecciona la parte del estado donde están los tipos de vehículos
export const selectVehicleTypesState = createFeatureSelector<State>('vehicleTypes');

// Selecciona todos los tipos de vehículos
export const selectAllVehicleTypes = createSelector(
  selectVehicleTypesState,
  (state) => state.vehicleTypes
);

// Selecciona cualquier error relacionado con los tipos de vehículos
export const selectVehicleTypesError = createSelector(
  selectVehicleTypesState,
  (state) => state.error
);
