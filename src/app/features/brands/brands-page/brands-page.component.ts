import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/table/table-component/table-component.component';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar/search-bar.component';
import { Brand } from '../../../state/models/vehicle.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { loadBrands } from '../../../state/actions/brands.actions';
import { selectAllBrands } from '../../../state/selectors/brands.selectors';
import { TableColumn } from '../../../models/table-column.model';

@Component({
  selector: 'app-brands-page',
  standalone: true,
  imports: [CommonModule, TableComponent, SearchBarComponent],
  templateUrl: './brands-page.component.html',
  styleUrls: ['./brands-page.component.scss']
})
export class BrandsPageComponent implements OnInit {
  columns: TableColumn[] = [
    { field: 'Make_ID', header: 'Id' },
    { field: 'Make_Name', header: 'Marca' }
  ];
  data: Brand[] = [];
  filteredData: Brand[] = this.data;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(loadBrands());
    this.store.select(selectAllBrands).subscribe((brands) => {
      this.data = brands;
      this.filteredData = brands;
    });
  }

  onSearch(value: string): void {
    this.filteredData = this.data.filter((item) =>
      item.Make_Name.toLowerCase().includes(value.toLowerCase())
    );
  }

  onViewDetails(brand: Brand): void {
    this.router.navigate(['/details', brand.Make_Name]);
  }
}
