import { selectModelsState, selectAllModels, selectModelsError } from './models.selectors';
import { State } from '../reducers/models.reducer';
import { Model } from '../models/vehicle.model';

describe('Models Selectors', () => {
  const testModels: Model[] = [
    { Model_ID: 10, Model_Name: 'ModelA' },
    { Model_ID: 20, Model_Name: 'ModelB' },
  ];

  const errorObj = { message: 'Error loading models' };

  const state: State = {
    models: testModels,
    error: errorObj,
  };

  it('selectModelsState debería devolver el estado de models', () => {
    const result = selectModelsState.projector(state);
    expect(result).toEqual(state);
  });

  it('selectAllModels debería devolver todos los modelos', () => {
    const result = selectAllModels.projector(state);
    expect(result).toEqual(testModels);
  });

  it('selectModelsError debería devolver el error', () => {
    const result = selectModelsError.projector(state);
    expect(result).toEqual(errorObj);
  });
});
