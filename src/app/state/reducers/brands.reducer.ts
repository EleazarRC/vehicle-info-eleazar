import { createReducer, on } from '@ngrx/store';
import * as BrandActions from '../actions/brands.actions';
import { Brand } from './../models/brand.model';

export interface State {
  brands: Brand[];
  error: any;
}

export const initialState: State = {
  brands: [],
  error: null,
};

export const brandsReducer = createReducer(
  initialState,
  on(BrandActions.loadBrandsSuccess, (state, { brands }) => ({
    ...state,
    brands,
  })),
  on(BrandActions.loadBrandsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
