import { modelsReducer, initialState, State } from './models.reducer';
import * as ModelsActions from '../actions/models.actions';
import { Model } from '../models/vehicle.model';

describe('Models Reducer', () => {
  const testModels: Model[] = [
    { Model_ID: 100, Model_Name: 'ModelOne' },
    { Model_ID: 200, Model_Name: 'ModelTwo' },
  ];
  
  it('debería devolver el estado inicial por defecto', () => {
    const action = { type: 'Unknown' } as any;
    const result = modelsReducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('debería cargar los modelos con loadModelsSuccess', () => {
    const action = ModelsActions.loadModelsSuccess({ models: testModels });
    const result = modelsReducer(initialState, action);

    expect(result.models).toEqual(testModels);
    expect(result.error).toBeNull();
  });

  it('debería manejar errores con loadModelsFailure', () => {
    const testError = { message: 'Error al cargar modelos' };
    const action = ModelsActions.loadModelsFailure({ error: testError });
    const result = modelsReducer(initialState, action);

    expect(result.error).toEqual(testError);
    expect(result.models).toEqual([]);
  });

  it('debería limpiar los modelos con clearModels', () => {
    const stateWithModels: State = {
      models: testModels,
      error: null,
    };
    const action = ModelsActions.clearModels();
    const result = modelsReducer(stateWithModels, action);

    expect(result).toEqual(initialState);
    expect(result.models).toEqual([]);
    expect(result.error).toBeNull();
  });
});
