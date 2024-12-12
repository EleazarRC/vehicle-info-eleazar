import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { brandsReducer } from './state/reducers/brands.reducer';
import { BrandsEffects } from './state/effects/brands.effects';
import { vehicleTypesReducer } from './state/reducers/vehicle-types.reducer';
import { modelsReducer } from './state/reducers/models.reducer';
import { VehicleTypesEffects } from './state/effects/vehicle-types.effects';
import { ModelsEffects } from './state/effects/models.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(BrowserAnimationsModule, MatSnackBarModule),
    provideHttpClient(),
    provideStore(),
    provideState('brands', brandsReducer),
    provideState('vehicleTypes', vehicleTypesReducer),
    provideState('models', modelsReducer),
    provideEffects(BrandsEffects, VehicleTypesEffects, ModelsEffects),
    provideStoreDevtools(),
  ],
};
