# Frontend Technical Test (Angular)

**Autor:** Eleazar Ramos Cortés  
**Fecha:** Diciembre 2024

Este proyecto es una SPA (Single Page Application) desarrollada en Angular que muestra información de vehículos proveniente de la API oficial [https://vpic.nhtsa.dot.gov/api](https://vpic.nhtsa.dot.gov/api). El objetivo principal es listar marcas, ofrecer un buscador filtrado y, al seleccionar una marca, mostrar sus tipos de vehículos y modelos.

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
La aplicación muestra un listado de marcas con scroll virtual (permitiendo una carga óptima de grandes volúmenes de datos), un campo de búsqueda para filtrar las marcas en tiempo real, y una sección de detalles para cada marca seleccionada, mostrando sus tipos de vehículos y modelos.

**Alcance:**
- Mostrar lista de marcas con scroll virtual.
- Buscador para filtrar por nombre.
- Pantalla de detalles con tipos de vehículos y modelos.
- Arquitectura basada en NgRx (actions, reducers, selectors, effects) para un manejo escalable del estado.
- Uso de Angular Material para una apariencia moderna y componentes accesibles.

## Tecnologías y Herramientas
- **Angular CLI:** 19.0.4  
- **Node:** 22.12.0  
- **NPM:** 10.9.2  
- **Angular Material:** 19.0.2  
- **NgRx:** 19.0.0  
- **RxJS:** 7.8  
- **Testing:** Jasmine, Karma (Opcionalmente Cypress para E2E)
- **Control de versiones:** GitHub (Repositorio: [EleazarRC/vehicle-info-eleazar](#))

## Estructura del Proyecto
La estructura busca claridad, modularidad y escalabilidad:

src/
├── app/
│   ├── core/               # Servicios globales, interceptores, guardias
│   │   ├── services/
│   │   ├── interceptors/
│   │   ├── guards/
│   ├── shared/             # Componentes, pipes, directivas reutilizables
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   ├── state/              # Configuración de NgRx
│   │   ├── actions/
│   │   ├── reducers/
│   │   ├── selectors/
│   │   ├── effects/
│   │   ├── models/
│   │   ├── state.module.ts/
│   ├── features/           # Módulos funcionales de la aplicación
│   │   ├── brands/         # Funcionalidad relacionada con marcas
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── state/
│   │   ├── details/        # Página de detalles de marca
│   │       ├── components/
│   │       ├── pages/
│   │       ├── services/
│   │       ├── state/
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   ├── app.module.ts
├── assets/                 # Imágenes, estilos globales, etc.
├── environments/           # Configuración para dev y producción

## Estado Global con NgRx
Se utiliza NgRx para:
- Acciones (`actions`) que disparan carga de datos o filtros.
- Reducers (`reducers`) que mantienen el estado inmutable de marcas, modelos, tipos.
- Selectors (`selectors`) para extraer datos ya procesados y listos para ser consumidos por los componentes.
- Effects (`effects`) que interactúan con la API usando servicios, despachando acciones según resultado.

**Ejemplo de Flujo:**
1. `loadBrands` action → `brands.effects.ts` → llama a la API → `brands.reducer.ts` actualiza el estado con las marcas.
2. Componente `brands-page` usa un selector `selectAllBrands` para obtener el listado y mostrarlas en la tabla con scroll virtual.

## Navegación y Rutas
```typescript
const routes: Routes = [
  { path: '', component: BrandsPageComponent },
  { path: 'details/:brandName', component: DetailsPageComponent },
  { path: '**', redirectTo: '' }
];

'': Página principal con listado de marcas.
'details/:brandName': Página de detalles de la marca seleccionada.
```

## UI y Diseño
- Se emplea **Angular Material** para formularios (`mat-form-field`, `mat-input`) y botones (`mat-button`).
- Scroll virtual con `cdk-virtual-scroll-viewport` para mostrar grandes listas sin afectar el rendimiento.
- Un **SearchBarComponent** con input filtrante.
- Un **TableComponent** personalizado, usando virtual scroll y estilos limpios, con altura fija para un rendimiento óptimo.
- Estilos **SCSS** organizados y coherentes para dar una apariencia profesional y responsiva.

## Buenas Prácticas
- **Modularidad:** Dividir la app en módulos lógicos (features).
- **OnPush Change Detection:** Mejorar rendimiento con vistas grandes.
- **TrackBy en *ngFor:** Reducir re-renders.
- **Paginación / Lazy Loading:** Considerado para manejar grandes datasets sin bloquear la UI.
- **Tipado estricto:** Configuración `strict` en `tsconfig.json`.
- **Tests:** Unit testing para componentes, servicios y reducers.

## Pruebas
**Unitarias (Jasmine/Karma):**
- Reducers: verificar actualización correcta del estado.
- Selectors: comprobar que filtran y devuelven datos esperados.
- Componentes: asegurar que renderizan datos y responden a eventos (ej. filtrado).

**E2E (Cypress) (Opcional, no implementado en esta versión, pero recomendado):**
- Flujo completo: Cargar página de marcas, filtrar una marca, seleccionar y navegar a detalles, comprobar datos.

## Ejecución
- Instalar dependencias: `npm install`
- Ejecutar servidor dev: `ng serve`
- Navegar a [http://localhost:4200](http://localhost:4200) en el navegador.

## Futuras Mejoras
- Añadir paginación desde el servidor para datasets aún más grandes.
- Internacionalización (i18n).
- Tests E2E con Cypress.
- Mejora de accesibilidad (ARIA labels, roles).
