import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importar CommonModule para JsonPipe
import { Brand, VehicleType, Model } from './state/models/vehicle.model';
import { loadBrands } from './state/actions/brands.actions';
import { loadVehicleTypes } from './state/actions/vehicle-types.actions';
import { loadModels } from './state/actions/models.actions';
import { selectAllBrands } from './state/selectors/brands.selectors';
import { selectAllVehicleTypes } from './state/selectors/vehicle-types.selectors';
import { selectAllModels } from './state/selectors/models.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule para habilitar JsonPipe
  template: `
    <h1>API Test</h1>
    <button (click)="loadBrands()">Load Brands</button>
    <button (click)="loadVehicleTypes('toyota')">Load Vehicle Types (Toyota)</button>
    <button (click)="loadModels('toyota')">Load Models (Toyota)</button>

    <h2>Brands</h2>
    <pre *ngIf="brands$ | async as brands">{{ brands | json }}</pre>

    <h2>Vehicle Types</h2>
    <pre *ngIf="vehicleTypes$ | async as vehicleTypes">{{ vehicleTypes | json }}</pre>

    <h2>Models</h2>
    <pre *ngIf="models$ | async as models">{{ models | json }}</pre>
  `,
  styles: [],
})
export class AppComponent {
  brands$: Observable<Brand[]>;
  vehicleTypes$: Observable<VehicleType[]>;
  models$: Observable<Model[]>;

  constructor(private store: Store) {
    this.brands$ = this.store.select(selectAllBrands);
    this.vehicleTypes$ = this.store.select(selectAllVehicleTypes);
    this.models$ = this.store.select(selectAllModels);
  }

  loadBrands(): void {
    this.store.dispatch(loadBrands());
  }

  loadVehicleTypes(make: string): void {
    this.store.dispatch(loadVehicleTypes({ make }));
  }

  loadModels(make: string): void {
    this.store.dispatch(loadModels({ make }));
  }
}
