import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ScrollingModule,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TableColumn } from '../../../models/table-column.model';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-table-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CdkTableModule      
  ],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss',
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showActions: boolean = true;
  @Output() detailsClick = new EventEmitter<any>();

  get displayedColumns(): string[] {
    const colFields = this.columns.map((c) => c.field);
    return this.showActions ? [...colFields, 'actions'] : colFields;
  }

  onDetailsClick(row: any) {
    this.detailsClick.emit(row);
  }

  trackByFn(index: number, item: any) {
    // Usa un ID único si existe, de lo contrario index
    return item?.Make_ID ?? item?.VehicleTypeId ?? index;
  }
}
