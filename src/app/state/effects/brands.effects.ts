import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as BrandActions from '../actions/brands.actions';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class BrandsEffects {
  constructor(private actions$: Actions, private brandsService: ApiService) {}

  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandActions.loadBrands),
      mergeMap(() =>
        this.brandsService.getBrands().pipe(
          map((brands) => BrandActions.loadBrandsSuccess({ brands })),
          catchError((error) => of(BrandActions.loadBrandsFailure({ error })))
        )
      )
    )
  );
}
