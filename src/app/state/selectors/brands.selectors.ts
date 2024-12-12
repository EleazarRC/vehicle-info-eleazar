import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/brands.reducer';

export const selectBrandsState = createFeatureSelector<State>('brands');

export const selectAllBrands = createSelector(
  selectBrandsState,
  (state) => state.brands
);

export const selectBrandsError = createSelector(
  selectBrandsState,
  (state) => state.error
);
