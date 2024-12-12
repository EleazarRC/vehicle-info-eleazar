import { selectAllBrands, selectBrandsError, selectBrandsState } from './brands.selectors';
import { State } from '../reducers/brands.reducer';
import { Brand } from '../models/vehicle.model';

describe('Brands Selectors', () => {
  const testBrands: Brand[] = [
    { Make_ID: 1, Make_Name: 'BrandOne' },
    { Make_ID: 2, Make_Name: 'BrandTwo' },
  ];

  const errorObj = { message: 'Error loading brands' };

  const state: State = {
    brands: testBrands,
    error: errorObj,
  };

  it('selectBrandsState debería devolver el estado de brands', () => {
    const result = selectBrandsState.projector(state);
    expect(result).toEqual(state);
  });

  it('selectAllBrands debería devolver todas las marcas', () => {
    const result = selectAllBrands.projector(state);
    expect(result).toEqual(testBrands);
  });

  it('selectBrandsError debería devolver el error', () => {
    const result = selectBrandsError.projector(state);
    expect(result).toEqual(errorObj);
  });
});
