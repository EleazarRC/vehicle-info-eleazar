import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Brand, ApiResponse, VehicleType, Model } from '../../state/models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<ApiResponse<Brand>>(`${this.baseUrl}/getallmakes?format=json`).pipe(
      map((response) => response.Results)
    );
  }

   getVehicleTypesForMake(make: string): Observable<VehicleType[]> {
    return this.http.get<ApiResponse<VehicleType>>(`${this.baseUrl}/GetVehicleTypesForMake/${make}?format=json`).pipe(
      map((response) => response.Results)
    );
  }

  getModelsForMake(make: string): Observable<Model[]> {
    return this.http.get<ApiResponse<Model>>(`${this.baseUrl}/GetModelsForMake/${make}?format=json`).pipe(
      map((response) => response.Results)
    );
  }
}
