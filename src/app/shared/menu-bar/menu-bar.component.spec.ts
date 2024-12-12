import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarComponent } from './menu-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuBarComponent,
        RouterTestingModule, // Para manejar rutas en pruebas
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar un mat-toolbar', () => {
    const toolbar = fixture.debugElement.query(
      (el) => el.name === 'mat-toolbar'
    );
    expect(toolbar).not.toBeNull();
  });

  it('debería tener un botón de navegación al inicio', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).not.toBeNull();
    const routerLink = button.getAttribute('ng-reflect-router-link'); // Leer el atributo reflejado
    expect(routerLink).toBe('/');
  });
  

  it('debería mostrar el título correctamente', () => {
    const title = fixture.nativeElement.querySelector('.menu-title');
    expect(title.textContent.trim()).toBe('Eleazar Ramos Cortés');
  });
});
