import { createAction, props } from '@ngrx/store';
import { Brand } from '../models/brand.model';

export const loadBrands = createAction('[Brands] Load Brands');
export const loadBrandsSuccess = createAction(
  '[Brands] Load Brands Success',
  props<{ brands: Brand[] }>()
);
export const loadBrandsFailure = createAction(
  '[Brands] Load Brands Failure',
  props<{ error: any }>()
);
