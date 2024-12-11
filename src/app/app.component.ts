import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './shared/menu-bar/menu-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuBarComponent],
  template: `
    <app-menu-bar></app-menu-bar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {}
