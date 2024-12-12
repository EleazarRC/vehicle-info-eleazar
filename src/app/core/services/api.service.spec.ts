import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Brand, VehicleType, Model } from '../../state/models/vehicle.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todas las marcas (getBrands)', () => {
    const mockResponse = {
      Results: [
        { Make_ID: 1, Make_Name: 'Toyota' },
        { Make_ID: 2, Make_Name: 'Ford' },
      ],
    };

    service.getBrands().subscribe((brands: Brand[]) => {
      expect(brands.length).toBe(2);
      expect(brands).toEqual(mockResponse.Results);
    });

    const req = httpMock.expectOne('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería obtener los tipos de vehículos por marca (getVehicleTypesForMake)', () => {
    const mockResponse = {
      Results: [
        { VehicleTypeId: 1, VehicleTypeName: 'Sedan' },
        { VehicleTypeId: 2, VehicleTypeName: 'SUV' },
      ],
    };

    service.getVehicleTypesForMake('Toyota').subscribe((types: VehicleType[]) => {
      expect(types.length).toBe(2);
      expect(types).toEqual(mockResponse.Results);
    });

    const req = httpMock.expectOne('https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/Toyota?format=json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería obtener los modelos por marca (getModelsForMake)', () => {
    const mockResponse = {
      Results: [
        { Model_ID: 1, Model_Name: 'Camry' },
        { Model_ID: 2, Model_Name: 'Corolla' },
      ],
    };

    service.getModelsForMake('Toyota').subscribe((models: Model[]) => {
      expect(models.length).toBe(2);
      expect(models).toEqual(mockResponse.Results);
    });

    const req = httpMock.expectOne('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/Toyota?format=json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
