import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importar CommonModule para JsonPipe
import { Brand } from './state/models/brand.model';
import { loadBrands } from './state/actions/brands.actions';
import { selectAllBrands } from './state/selectors/brands.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule para habilitar JsonPipe
  template: `
    <h1>Brands Test</h1>
    <button (click)="loadBrands()">Load Brands</button>
    <pre *ngIf="brands$ | async as brands">{{ brands | json }}</pre>
  `,
  styles: [],
})
export class AppComponent {
  brands$: Observable<Brand[]>;

  constructor(private store: Store) {
    this.brands$ = this.store.select(selectAllBrands);
  }

  loadBrands(): void {
    this.store.dispatch(loadBrands());
  }
}
