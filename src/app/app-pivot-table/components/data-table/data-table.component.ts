import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  template: `
  <table class="table-auto border-collapse border border-gray-400 w-full mt-4">
    <thead>
      <tr>
        <th *ngFor="let key of displayedKeys" class="border px-2 py-1">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let row of data">
        <td *ngFor="let key of displayedKeys" class="border px-2 py-1">{{ row[key] || 0 }}</td>
      </tr>
    </tbody>
  </table>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class DataTableComponent {
  @Input() data: any[] = [];

  get displayedKeys(): string[] {
    return this.data.length ? Object.keys(this.data[0]) : [];
  }
}