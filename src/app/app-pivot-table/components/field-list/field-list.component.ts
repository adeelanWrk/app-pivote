import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-list',
  template: `
  <div class="flex flex-wrap gap-2">
    <div *ngFor="let f of fields" class="p-1 bg-gray-200 rounded cursor-move"
         draggable="true"
         (dragstart)="onDragStart($event, f)">
      {{ f }}
    </div>
  </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class FieldListComponent {
  @Input() fields: string[] = [];

  onDragStart(event: DragEvent, field: string) {
    event.dataTransfer?.setData('text/plain', field);
  }
}
