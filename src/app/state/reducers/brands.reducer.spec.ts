import { brandsReducer, initialState, State } from './brands.reducer';
import * as BrandActions from '../actions/brands.actions';
import { Brand } from '../models/vehicle.model';

describe('Brands Reducer', () => {
  const testBrands: Brand[] = [
    { Make_ID: 1, Make_Name: 'BrandOne' },
    { Make_ID: 2, Make_Name: 'BrandTwo' },
  ];

  it('debería devolver el estado inicial por defecto', () => {
    const action = { type: 'Unknown' } as any;
    const result = brandsReducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('debería cargar las marcas con loadBrandsSuccess', () => {
    const action = BrandActions.loadBrandsSuccess({ brands: testBrands });
    const result = brandsReducer(initialState, action);

    expect(result.brands).toEqual(testBrands);
    expect(result.error).toBeNull();
  });

  it('debería manejar errores con loadBrandsFailure', () => {
    const testError = { message: 'Error cargando marcas' };
    const action = BrandActions.loadBrandsFailure({ error: testError });
    const result = brandsReducer(initialState, action);

    expect(result.error).toEqual(testError);
    expect(result.brands).toEqual([]);
  });
});
