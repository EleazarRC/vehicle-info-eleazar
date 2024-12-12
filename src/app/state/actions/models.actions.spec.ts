import { loadModels, loadModelsSuccess, loadModelsFailure, clearModels } from './models.actions';
import { Model } from '../models/vehicle.model';

describe('Models Actions', () => {
  it('loadModels debería crear la acción con la marca proporcionada', () => {
    const make = 'Toyota';
    const action = loadModels({ make });
    expect(action.type).toEqual('[Models] Load Models');
    expect(action.make).toEqual(make);
  });

  it('loadModelsSuccess debería crear la acción con los modelos proporcionados', () => {
    const testModels: Model[] = [
      { Model_ID: 10, Model_Name: 'ModelA' },
      { Model_ID: 20, Model_Name: 'ModelB' },
    ];

    const action = loadModelsSuccess({ models: testModels });
    expect(action.type).toEqual('[Models] Load Models Success');
    expect(action.models).toEqual(testModels);
  });

  it('loadModelsFailure debería crear la acción con el error proporcionado', () => {
    const testError = { message: 'Error al cargar modelos' };
    const action = loadModelsFailure({ error: testError });
    expect(action.type).toEqual('[Models] Load Models Failure');
    expect(action.error).toEqual(testError);
  });

  it('clearModels debería crear la acción sin props', () => {
    const action = clearModels();
    expect(action.type).toEqual('[Models] Clear Models');
  });
});
