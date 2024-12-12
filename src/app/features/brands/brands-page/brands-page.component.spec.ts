import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandsPageComponent } from './brands-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadBrands } from '../../../state/actions/brands.actions';
import { selectAllBrands } from '../../../state/selectors/brands.selectors';

describe('BrandsPageComponent', () => {
  let component: BrandsPageComponent;
  let fixture: ComponentFixture<BrandsPageComponent>;
  let store: MockStore;
  let router: Router;

  const initialState = {
    brands: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrandsPageComponent,
        RouterTestingModule,
        BrowserAnimationsModule, // Añadido para resolver los errores
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener columnas configuradas correctamente', () => {
    expect(component.columns).toEqual([
      { field: 'Make_ID', header: 'Id' },
      { field: 'Make_Name', header: 'Marca' },
    ]);
  });

  it('debería despachar la acción loadBrands al inicializarse', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadBrands());
  });

  it('debería asignar los datos desde el selector', () => {
    const mockBrands = [
      { Make_ID: 1, Make_Name: 'Toyota' },
      { Make_ID: 2, Make_Name: 'Ford' },
    ];
    store.overrideSelector(selectAllBrands, mockBrands);
    store.refreshState();
    expect(component.data).toEqual(mockBrands);
    expect(component.filteredData).toEqual(mockBrands);
  });

  it('debería filtrar correctamente los datos en onSearch', () => {
    component.data = [
      { Make_ID: 1, Make_Name: 'Toyota' },
      { Make_ID: 2, Make_Name: 'Ford' },
    ];
    component.onSearch('Ford');
    expect(component.filteredData).toEqual([{ Make_ID: 2, Make_Name: 'Ford' }]);
  });

  it('debería navegar a la página de detalles al llamar a onViewDetails', () => {
    const brand = { Make_ID: 1, Make_Name: 'Toyota' };
    component.onViewDetails(brand);
    expect(router.navigate).toHaveBeenCalledWith(['/details', 'Toyota']);
  });
});
