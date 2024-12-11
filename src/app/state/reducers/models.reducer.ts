import { createReducer, on } from '@ngrx/store';
import * as ModelsActions from '../actions/models.actions';
import { Model } from '../models/vehicle.model';

export interface State {
  models: Model[];
  error: any;
}

export const initialState: State = {
  models: [],
  error: null,
};

export const modelsReducer = createReducer(
  initialState,
  on(ModelsActions.loadModelsSuccess, (state, { models }) => ({
    ...state,
    models,
  })),
  on(ModelsActions.loadModelsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ModelsActions.clearModels, () => ({
    ...initialState,
  }))
);
