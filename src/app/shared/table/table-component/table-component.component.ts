import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableColumn } from '../../../models/table-column.model';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatButtonModule, MatIconModule],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss'
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showActions: boolean = true;
  @Output() detailsClick = new EventEmitter<any>();

  onDetailsClick(row: any) {
    this.detailsClick.emit(row);
  }
}
