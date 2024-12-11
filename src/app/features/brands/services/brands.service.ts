import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Brand, ApiResponse } from '../../../state/models/brand.model';

@Injectable({
  providedIn: 'root', // Asegúrate de que esté registrado como proveedor global
})
export class BrandsService {
  private baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<ApiResponse<Brand>>(`${this.baseUrl}/getallmakes?format=json`).pipe(
      map((response) => response.Results)
    );
  }
}
