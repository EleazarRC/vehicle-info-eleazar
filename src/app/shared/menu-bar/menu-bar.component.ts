import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar color="primary" class="menu-bar">
      <button mat-icon-button [routerLink]="['/']">
        <mat-icon>home</mat-icon>
      </button>
      <span class="spacer"></span>
      <span class="menu-title">Eleazar Ramos Cortés</span> 
    </mat-toolbar>
  `,
  styles: [
    `
      .menu-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .menu-title {
        font-size: 18px;
        font-weight: bold;
      }
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class MenuBarComponent { }
