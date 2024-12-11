import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      type="text"
      placeholder="Search..."
      (input)="onSearch($event)"
    />
  `,
  styles: [
    `
      input {
        width: 100%;
        padding: 8px;
        margin: 8px 0;
        border: 1px solid #ddd;
      }
    `,
  ],
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value);
  }
}
