import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/vehicle-types.reducer';

export const selectVehicleTypesState =
  createFeatureSelector<State>('vehicleTypes');

export const selectAllVehicleTypes = createSelector(
  selectVehicleTypesState,
  (state) => state.vehicleTypes
);

export const selectVehicleTypesError = createSelector(
  selectVehicleTypesState,
  (state) => state.error
);
