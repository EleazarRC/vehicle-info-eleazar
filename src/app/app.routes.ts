import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'brands',
    pathMatch: 'full',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands-page/brands-page.component').then(
        (c) => c.BrandsPageComponent
      ),
  },
  {
    path: 'details/:brandName',
    loadComponent: () =>
      import('./features/details/details-page/details-page.component').then(
        (c) => c.DetailsPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'brands',
  },
];
