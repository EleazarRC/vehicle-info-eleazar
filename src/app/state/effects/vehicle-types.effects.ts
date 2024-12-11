import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as VehicleTypeActions from '../actions/vehicle-types.actions';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class VehicleTypesEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadVehicleTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleTypeActions.loadVehicleTypes),
      mergeMap(({ make }) =>
        this.apiService.getVehicleTypesForMake(make).pipe(
          map((vehicleTypes) => VehicleTypeActions.loadVehicleTypesSuccess({ vehicleTypes })),
          catchError((error) => of(VehicleTypeActions.loadVehicleTypesFailure({ error })))
        )
      )
    )
  );
}
