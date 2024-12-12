import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ModelsEffects } from './models.effects';
import * as ModelsActions from '../actions/models.actions';
import { ApiService } from '../../core/services/api.service';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Model } from '../models/vehicle.model';

describe('ModelsEffects', () => {
  let actions$: Observable<any>;
  let effects: ModelsEffects;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getModelsForMake']);

    TestBed.configureTestingModule({
      providers: [
        ModelsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: ApiService, useValue: apiServiceSpy },
      ],
    });

    effects = TestBed.inject(ModelsEffects);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('debería despachar loadModelsSuccess cuando la API responde con éxito', () => {
    const mockModels: Model[] = [{ Model_ID: 1, Model_Name: 'Model A' }];
    const action = ModelsActions.loadModels({ make: 'Toyota' });
    const successAction = ModelsActions.loadModelsSuccess({ models: mockModels });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: mockModels });
    apiService.getModelsForMake.and.returnValue(response);

    const expected = cold('--c', { c: successAction });
    expect(effects.loadModels$).toBeObservable(expected);
  });

  it('debería despachar loadModelsFailure cuando la API responde con un error', () => {
    const error = { message: 'Error loading models' };
    const action = ModelsActions.loadModels({ make: 'Toyota' });
    const failureAction = ModelsActions.loadModelsFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    apiService.getModelsForMake.and.returnValue(response);

    const expected = cold('--c', { c: failureAction });
    expect(effects.loadModels$).toBeObservable(expected);
  });
});
