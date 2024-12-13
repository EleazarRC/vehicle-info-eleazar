# Frontend Technical Test (Angular)

**Autor:** Eleazar Ramos Cortés  
**Fecha:** Diciembre 2024

Este proyecto es una Single Page Application (SPA) desarrollada con Angular. Su objetivo es mostrar de forma eficiente información sobre marcas de vehículos, obtenida de la API oficial de la NHTSA: [https://vpic.nhtsa.dot.gov/api](https://vpic.nhtsa.dot.gov/api).

La aplicación permite:  
- Listar marcas de vehículos con scroll virtual, evitando problemas de rendimiento ante grandes volúmenes de datos.  
- Filtrar las marcas en tiempo real mediante un campo de búsqueda.  
- Visualizar detalles de la marca seleccionada, mostrando sus tipos de vehículos y modelos disponibles.

## Índice
1. [Objetivo y Alcance](#objetivo-y-alcance)  
2. [Tecnologías y Herramientas](#tecnologías-y-herramientas)  
3. [Estructura del Proyecto](#estructura-del-proyecto)  
4. [Estado Global con NgRx](#estado-global-con-ngrx)  
5. [Navegación y Rutas](#navegación-y-rutas)  
6. [UI y Diseño](#ui-y-diseño)  
7. [Buenas Prácticas](#buenas-prácticas)  
8. [Pruebas](#pruebas)  
9. [Ejecución](#ejecución)  
10. [Futuras Mejoras](#futuras-mejoras)

## Objetivo y Alcance
**Objetivo:**  
Desarrollar una SPA que muestre marcas de vehículos, con filtrado en tiempo real y, al seleccionar una marca, visualizar tipos de vehículos y modelos. Todo ello gestionado con un estado global optimizado y una experiencia de usuario fluida.

**Alcance:**  
- Listar marcas con virtual scroll, mejorando el rendimiento ante grandes listados.  
- Buscador para filtrar dinámicamente las marcas.  
- Página de detalles con tipos de vehículos y modelos disponibles.  
- Manejo de estado mediante NgRx, asegurando escalabilidad y mantenibilidad.  
- Uso de Angular Material para una apariencia moderna, responsive y accesible.

## Tecnologías y Herramientas
- **Angular CLI:** 19.0.4  
- **Node.js:** 22.12.0  
- **NPM:** 10.9.2  
- **Angular Material:** 19.0.2  
- **NgRx:** 19.0.0 (Actions, Reducers, Effects, StoreDevtools)  
- **RxJS:** 7.8  
- **Testing:** Jasmine, Karma (opcional Cypress para E2E)  
- **Control de versiones:** GitHub (Repositorio: [EleazarRC/vehicle-info-eleazar](#))

## Estructura del Proyecto
La organización del código sigue un patrón escalable y modular:

- **core/**: Servicios globales, interceptores, guardias.  
- **shared/**: Componentes, directivas y pipes reutilizables (ej. SearchBar, TableComponent).  
- **features/**:  
  - **brands/**: Lógica relacionada con las marcas (página principal con listado y filtrado).  
  - **details/**: Lógica para mostrar detalles de una marca seleccionada (tipos de vehículos, modelos).
- **state/**:  
  - actions, reducers, selectors, effects: Todo lo relacionado con NgRx.
- **models/**: Interfaces y tipos (Brand, VehicleType, Model).

Esta estructura facilita la escalabilidad, la mantenibilidad y la colaboración entre equipos.

## Estado Global con NgRx
Se emplea NgRx para una gestión centralizada y reactiva del estado:
- **Actions:** Definen eventos del dominio (ej. `loadBrands`, `loadModels`, `loadVehicleTypes`).
- **Reducers:** Actualizan el estado inmutable según las acciones disparadas.
- **Selectors:** Extraen datos procesados del store para los componentes.
- **Effects:** Manejan lógica asíncrona (ej. llamadas HTTP a la API), despachando acciones success/failure.

Ejemplo de Flujo:
1. `loadBrands` → `BrandsEffects` llama a la API → `brandsReducer` almacena las marcas.
2. `BrandsPageComponent` usa `selectAllBrands` para obtener la lista y renderizarla con scroll virtual.

## Navegación y Rutas
La aplicación está configurada para Lazy Loading:
```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'brands', pathMatch: 'full' },
  { path: 'brands', loadComponent: () => import('./features/brands/brands-page/brands-page.component').then(m => m.BrandsPageComponent) },
  { path: 'details/:brandName', loadComponent: () => import('./features/details/details-page/details-page.component').then(m => m.DetailsPageComponent) },
  { path: '**', redirectTo: 'brands' }
];
'/brands': Página principal con listado de marcas.
'/details/:brandName': Página de detalles de la marca seleccionada.
```

## UI y Diseño
- **Angular Material** en formularios, botones, toolbar, para mejorar usabilidad y accesibilidad.
- **cdk-virtual-scroll-viewport** para manejar listados extensos sin penalizar el rendimiento.
- **SearchBarComponent:** Campo filtrante con `mat-form-field` y `matInput`.
- **TableComponent:** Tabla personalizada, sin `mat-table`, optimizada para scroll virtual, con estilos SCSS coherentes, tipografía Roboto y look profesional.
- Diseño responsive y escalable, con OnPush + trackBy para rendimiento óptimo.

## Buenas Prácticas
- **Modularidad:** Cada sección funcional en su propio espacio (features).
- **OnPush Change Detection:** Minimiza renders innecesarios.
- **TrackBy en *ngFor:** Evita redibujar elementos sin cambios.
- **Tipado estricto:** `strict` en `tsconfig.json` para mayor robustez.
- **Uso de NgRx:** Garantiza escalabilidad, separación de responsabilidades y mantenimiento sencillo.
- **Testing ready:** Configuración para tests unitarios en acciones, reducers, selectors y componentes.

## Pruebas
**Unitarias (Jasmine/Karma):**  
```
ng test --code-coverage
```
- Reducers: Validar que el estado se actualiza correctamente.  
- Selectors: Verificar que filtran y devuelven datos esperados.  
- Componentes: Asegurar renderizado correcto y respuesta a eventos (ej. filtrado).

**E2E (Cypress) :**  
```
npx cypress open
```

## Ejecución
Instalar dependencias:
```bash
npm install
ng serve
```
## Futuras Mejoras
- **Paginación desde el servidor:** Para manejar datasets gigantes sin cargar todo de golpe.
- **Internacionalización (i18n):** Adaptar la app a múltiples idiomas.
- **Accesibilidad (ARIA):** Mejorar soporte para lectores de pantalla, teclados, etc.