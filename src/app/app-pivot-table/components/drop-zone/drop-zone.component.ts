import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  template: `
    <div class="min-h-[60px] p-2 border border-dashed" 
         (dragover)="onDragOver($event)" 
         (drop)="onDrop($event)">
      <span *ngFor="let f of zone" class="inline-block bg-blue-100 rounded px-2 py-1 m-1">
        {{ f }} <button (click)="remove(f)" class="text-red-600 font-bold">×</button>
      </span>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class DropZoneComponent {
  @Input() zone: string[] = [];
  @Output() dropField = new EventEmitter<string>();
  @Output() removeField = new EventEmitter<string>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    const field = event.dataTransfer?.getData('text/plain');
    if (field) this.dropField.emit(field);
  }

  remove(field: string) {
    this.removeField.emit(field);
  }
}
