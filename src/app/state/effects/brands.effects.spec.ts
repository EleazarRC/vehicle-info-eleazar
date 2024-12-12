import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { BrandsEffects } from './brands.effects';
import * as BrandActions from '../actions/brands.actions';
import { ApiService } from '../../core/services/api.service';
import { cold, hot } from 'jasmine-marbles';
import { Brand } from '../models/vehicle.model';

describe('BrandsEffects', () => {
  let actions$: Observable<any>;
  let effects: BrandsEffects;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockBrands: Brand[] = [
    { Make_ID: 1, Make_Name: 'Toyota' },
    { Make_ID: 2, Make_Name: 'Honda' },
  ];

  beforeEach(() => {
    const apiServiceMock = jasmine.createSpyObj('ApiService', ['getBrands']);

    TestBed.configureTestingModule({
      providers: [
        BrandsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: ApiService, useValue: apiServiceMock },
      ],
    });

    effects = TestBed.inject(BrandsEffects);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('debería despachar loadBrandsSuccess cuando la API responde con éxito', () => {
    const action = BrandActions.loadBrands();
    const successAction = BrandActions.loadBrandsSuccess({ brands: mockBrands });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: mockBrands });
    apiService.getBrands.and.returnValue(response);

    const expected = cold('--c', { c: successAction });
    expect(effects.loadBrands$).toBeObservable(expected);
  });

  it('debería despachar loadBrandsFailure cuando la API responde con un error', () => {
    const action = BrandActions.loadBrands();
    const error = { message: 'Error al cargar marcas' };
    const failureAction = BrandActions.loadBrandsFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    apiService.getBrands.and.returnValue(response);

    const expected = cold('--c', { c: failureAction });
    expect(effects.loadBrands$).toBeObservable(expected);
  });
});
