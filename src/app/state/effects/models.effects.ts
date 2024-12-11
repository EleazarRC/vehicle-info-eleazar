import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as ModelsActions from '../actions/models.actions';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class ModelsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ModelsActions.loadModels),
      mergeMap(({ make }) =>
        this.apiService.getModelsForMake(make).pipe(
          map((models) => ModelsActions.loadModelsSuccess({ models })),
          catchError((error) => of(ModelsActions.loadModelsFailure({ error })))
        )
      )
    )
  );
}
