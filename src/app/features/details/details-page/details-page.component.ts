import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/table/table-component/table-component.component';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar/search-bar.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { VehicleType, Model } from '../../../state/models/vehicle.model';
import { loadVehicleTypes } from '../../../state/actions/vehicle-types.actions';
import { loadModels } from '../../../state/actions/models.actions';
import { selectAllVehicleTypes } from '../../../state/selectors/vehicle-types.selectors';
import { selectAllModels } from '../../../state/selectors/models.selectors';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, TableComponent, SearchBarComponent],
  template: `
    <h1>Details for {{ brandName }}</h1>
    <h2>Vehicle Types</h2>
    <app-search-bar (searchChange)="onSearchVehicleTypes($event)"></app-search-bar>
    <app-table-component
      [columns]="vehicleTypeColumns"
      [data]="filteredVehicleTypes"
    ></app-table-component>

    <h2>Models</h2>
    <app-search-bar (searchChange)="onSearchModels($event)"></app-search-bar>
    <app-table-component
      [columns]="modelColumns"
      [data]="filteredModels"
    ></app-table-component>
  `,
  styles: [],
})
export class DetailsPageComponent implements OnInit {
  brandName: string = '';
  vehicleTypeColumns: string[] = ['VehicleTypeId', 'VehicleTypeName'];
  modelColumns: string[] = ['Model_ID', 'Model_Name'];

  vehicleTypes: VehicleType[] = [];
  models: Model[] = [];
  filteredVehicleTypes: VehicleType[] = this.vehicleTypes;
  filteredModels: Model[] = this.models;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.brandName = this.route.snapshot.paramMap.get('brandName') || '';

    this.store.dispatch(loadVehicleTypes({ make: this.brandName }));
    this.store.dispatch(loadModels({ make: this.brandName }));

    this.store.select(selectAllVehicleTypes).subscribe((types) => {
      this.vehicleTypes = types;
      this.filteredVehicleTypes = types;
    });

    this.store.select(selectAllModels).subscribe((models) => {
      this.models = models;
      this.filteredModels = models;
    });
  }

  onSearchVehicleTypes(value: string): void {
    this.filteredVehicleTypes = this.vehicleTypes.filter((item) =>
      item.VehicleTypeName.toLowerCase().includes(value.toLowerCase())
    );
  }
  
  onSearchModels(value: string): void {
    this.filteredModels = this.models.filter((item) =>
      item.Model_Name.toLowerCase().includes(value.toLowerCase())
    );
  }
}
