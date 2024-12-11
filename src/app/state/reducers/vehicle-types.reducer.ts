import { createReducer, on } from '@ngrx/store';
import * as VehicleTypeActions from '../actions/vehicle-types.actions';
import { VehicleType } from '../models/vehicle.model';

export interface State {
  vehicleTypes: VehicleType[];
  error: any;
}

export const initialState: State = {
  vehicleTypes: [],
  error: null,
};

export const vehicleTypesReducer = createReducer(
  initialState,
  on(VehicleTypeActions.loadVehicleTypesSuccess, (state, { vehicleTypes }) => ({
    ...state,
    vehicleTypes,
  })),
  on(VehicleTypeActions.loadVehicleTypesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
