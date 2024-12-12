import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchBarComponent } from './search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, BrowserAnimationsModule], // Importamos BrowserAnimationsModule
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el evento searchChange al escribir en el input', () => {
    spyOn(component.searchChange, 'emit');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.value = 'Test';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.searchChange.emit).toHaveBeenCalledWith('Test');
  });

  it('debería tener un mat-form-field y un input dentro', () => {
    const matFormField = fixture.debugElement.query(By.css('mat-form-field'));
    expect(matFormField).not.toBeNull();

    const inputElement = matFormField.query(By.css('input'));
    expect(inputElement).not.toBeNull();
  });
});
