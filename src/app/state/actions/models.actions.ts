import { createAction, props } from '@ngrx/store';
import { Model } from '../models/vehicle.model';

export const loadModels = createAction(
  '[Models] Load Models',
  props<{ make: string }>() // La marca que queremos cargar
);

export const loadModelsSuccess = createAction(
  '[Models] Load Models Success',
  props<{ models: Model[] }>()
);

export const loadModelsFailure = createAction(
  '[Models] Load Models Failure',
  props<{ error: any }>()
);
