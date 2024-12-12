import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/table/table-component/table-component.component';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar/search-bar.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { VehicleType, Model } from '../../../state/models/vehicle.model';
import {
  clearVehicleTypes,
  loadVehicleTypes,
} from '../../../state/actions/vehicle-types.actions';
import { clearModels, loadModels } from '../../../state/actions/models.actions';
import { selectAllVehicleTypes } from '../../../state/selectors/vehicle-types.selectors';
import { selectAllModels } from '../../../state/selectors/models.selectors';
import { TableColumn } from '../../../models/table-column.model';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, TableComponent, SearchBarComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  brandName: string = '';
  vehicleTypeColumns: TableColumn[] = [
    { field: 'VehicleTypeId', header: 'Id' },
    { field: 'VehicleTypeName', header: 'Tipo' },
  ];
  modelColumns: TableColumn[] = [
    { field: 'Model_ID', header: 'Id' },
    { field: 'Model_Name', header: 'Modelo' },
  ];

  vehicleTypes: VehicleType[] = [];
  models: Model[] = [];
  filteredVehicleTypes: VehicleType[] = this.vehicleTypes;
  filteredModels: Model[] = this.models;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const brandName = params.get('brandName') || '';
      this.brandName = brandName;

      this.store.dispatch(clearVehicleTypes());
      this.store.dispatch(clearModels());

      this.store.dispatch(loadVehicleTypes({ make: brandName }));
      this.store.dispatch(loadModels({ make: brandName }));

      this.store.select(selectAllVehicleTypes).subscribe((types) => {
        this.vehicleTypes = types;
        this.filteredVehicleTypes = types;
      });

      this.store.select(selectAllModels).subscribe((models) => {
        this.models = models;
        this.filteredModels = models;
      });
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
