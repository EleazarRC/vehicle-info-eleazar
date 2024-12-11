import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/models.reducer';

// Selecciona la parte del estado donde están los modelos
export const selectModelsState = createFeatureSelector<State>('models');

// Selecciona todos los modelos
export const selectAllModels = createSelector(
  selectModelsState,
  (state) => state.models
);

// Selecciona cualquier error relacionado con los modelos
export const selectModelsError = createSelector(
  selectModelsState,
  (state) => state.error
);
