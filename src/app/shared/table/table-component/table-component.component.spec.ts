import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table-component.component';
import { TableColumn } from '../../../models/table-column.model';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent], // Importa el componente standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    // Configuración inicial
    component.columns = [
      { field: 'Make_ID', header: 'Id' },
      { field: 'Make_Name', header: 'Marca' },
    ];
    component.data = [
      { Make_ID: 1, Make_Name: 'Toyota' },
      { Make_ID: 2, Make_Name: 'Honda' },
    ];
    component.showActions = true;

    fixture.detectChanges(); // Renderiza el componente
  });

  it('debería renderizar las columnas correctamente', () => {
    const headers = fixture.nativeElement.querySelectorAll('thead th');
    expect(headers.length).toBe(3); // Incluye las columnas + acciones
    expect(headers[0].textContent.trim()).toBe('Id');
    expect(headers[1].textContent.trim()).toBe('Marca');
    expect(headers[2].textContent.trim()).toBe('Acciones');
  });

  it('debería usar trackByFn correctamente', () => {
    const data = { Make_ID: 42, Make_Name: 'Toyota' };
    const index = 0;

    expect(component.trackByFn(index, data)).toBe(42); // Verifica la función trackBy
  });
});
