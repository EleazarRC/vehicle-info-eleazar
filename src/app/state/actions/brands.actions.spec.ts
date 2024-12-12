import { loadBrands, loadBrandsSuccess, loadBrandsFailure } from './brands.actions';
import { Brand } from '../models/vehicle.model';

describe('Brands Actions', () => {
  it('loadBrands debería crear la acción correcta sin props', () => {
    const action = loadBrands();
    expect(action.type).toEqual('[Brands] Load Brands');
  });

  it('loadBrandsSuccess debería crear la acción con las marcas proporcionadas', () => {
    const testBrands: Brand[] = [
      { Make_ID: 1, Make_Name: 'BrandOne' },
      { Make_ID: 2, Make_Name: 'BrandTwo' },
    ];

    const action = loadBrandsSuccess({ brands: testBrands });
    expect(action.type).toEqual('[Brands] Load Brands Success');
    expect(action.brands).toEqual(testBrands);
  });

  it('loadBrandsFailure debería crear la acción con el error proporcionado', () => {
    const testError = { message: 'Error al cargar marcas' };

    const action = loadBrandsFailure({ error: testError });
    expect(action.type).toEqual('[Brands] Load Brands Failure');
    expect(action.error).toEqual(testError);
  });
});
