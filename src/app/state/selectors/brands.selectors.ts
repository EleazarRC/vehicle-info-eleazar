import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/brands.reducer';

// Selecciona la parte del estado donde están las marcas
export const selectBrandsState = createFeatureSelector<State>('brands');

// Selecciona todas las marcas
export const selectAllBrands = createSelector(
  selectBrandsState,
  (state) => state.brands
);

// Selecciona cualquier error
export const selectBrandsError = createSelector(
  selectBrandsState,
  (state) => state.error
);
