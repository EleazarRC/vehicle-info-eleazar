import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/models.reducer';

export const selectModelsState = createFeatureSelector<State>('models');

export const selectAllModels = createSelector(
  selectModelsState,
  (state) => state.models
);

export const selectModelsError = createSelector(
  selectModelsState,
  (state) => state.error
);
