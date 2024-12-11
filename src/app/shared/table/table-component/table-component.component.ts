import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  template: `
    <!-- Tabla con scroll virtual -->
    <cdk-virtual-scroll-viewport
      *ngIf="data.length > 10"
      itemSize="50"
      style="height: 400px; width: 100%;"
    >
      <table>
        <thead>
          <tr>
            <th *ngFor="let column of columns">{{ column }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *cdkVirtualFor="let row of data">
            <td *ngFor="let column of columns">{{ row[column] }}</td>
            <td>
              <button (click)="onDetailsClick(row)">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </cdk-virtual-scroll-viewport>

    <!-- Tabla sin scroll virtual -->
    <table *ngIf="data.length <= 10">
      <thead>
        <tr>
          <th *ngFor="let column of columns">{{ column }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let column of columns">{{ row[column] }}</td>
          <td>
            <button (click)="onDetailsClick(row)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      cdk-virtual-scroll-viewport {
        border: 1px solid #ddd;
      }
    `,
  ],
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Output() detailsClick = new EventEmitter<any>();

  onDetailsClick(row: any) {
    this.detailsClick.emit(row);
  }
}
