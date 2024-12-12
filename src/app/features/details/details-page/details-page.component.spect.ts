import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPageComponent } from './details-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { loadVehicleTypes, clearVehicleTypes } from '../../../state/actions/vehicle-types.actions';
import { loadModels, clearModels } from '../../../state/actions/models.actions';
import { selectAllVehicleTypes } from '../../../state/selectors/vehicle-types.selectors';
import { selectAllModels } from '../../../state/selectors/models.selectors';

describe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;
  let store: MockStore;
  const initialState = {
    vehicleTypes: [],
    models: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPageComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(new Map([['brandName', 'Toyota']])) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar brandName desde ActivatedRoute', () => {
    expect(component.brandName).toBe('Toyota');
  });

  it('debería despachar las acciones de clear y load en ngOnInit', () => {
    expect(store.dispatch).toHaveBeenCalledWith(clearVehicleTypes());
    expect(store.dispatch).toHaveBeenCalledWith(clearModels());
    expect(store.dispatch).toHaveBeenCalledWith(loadVehicleTypes({ make: 'Toyota' }));
    expect(store.dispatch).toHaveBeenCalledWith(loadModels({ make: 'Toyota' }));
  });

  it('debería asignar vehicleTypes correctamente desde el selector', () => {
    const vehicleTypesMock = [{ VehicleTypeId: 1, VehicleTypeName: 'SUV' }];
    store.overrideSelector(selectAllVehicleTypes, vehicleTypesMock);
    store.refreshState();
    expect(component.vehicleTypes).toEqual(vehicleTypesMock);
    expect(component.filteredVehicleTypes).toEqual(vehicleTypesMock);
  });

  it('debería asignar models correctamente desde el selector', () => {
    const modelsMock = [{ Model_ID: 1, Model_Name: 'Corolla' }];
    store.overrideSelector(selectAllModels, modelsMock);
    store.refreshState();
    expect(component.models).toEqual(modelsMock);
    expect(component.filteredModels).toEqual(modelsMock);
  });

  it('debería filtrar correctamente vehicleTypes en onSearchVehicleTypes', () => {
    component.vehicleTypes = [
      { VehicleTypeId: 1, VehicleTypeName: 'SUV' },
      { VehicleTypeId: 2, VehicleTypeName: 'Sedan' },
    ];
    component.onSearchVehicleTypes('SUV');
    expect(component.filteredVehicleTypes).toEqual([{ VehicleTypeId: 1, VehicleTypeName: 'SUV' }]);
  });

  it('debería filtrar correctamente models en onSearchModels', () => {
    component.models = [
      { Model_ID: 1, Model_Name: 'Corolla' },
      { Model_ID: 2, Model_Name: 'Camry' },
    ];
    component.onSearchModels('Camry');
    expect(component.filteredModels).toEqual([{ Model_ID: 2, Model_Name: 'Camry' }]);
  });
});
