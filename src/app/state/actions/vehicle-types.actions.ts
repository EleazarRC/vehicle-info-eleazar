import { createAction, props } from '@ngrx/store';
import { VehicleType } from '../models/vehicle.model';

export const loadVehicleTypes = createAction(
  '[Vehicle Types] Load Vehicle Types',
  props<{ make: string }>()
);

export const loadVehicleTypesSuccess = createAction(
  '[Vehicle Types] Load Vehicle Types Success',
  props<{ vehicleTypes: VehicleType[] }>()
);

export const loadVehicleTypesFailure = createAction(
  '[Vehicle Types] Load Vehicle Types Failure',
  props<{ error: any }>()
);
