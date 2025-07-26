import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DropZoneComponent } from './components/drop-zone/drop-zone.component';
import { AggregationType } from './models/field.model';
import { PivotEngineService } from './services/pivot-engine.service';

@Component({
  selector: 'app-pivot-table',
  standalone: true,
  templateUrl: './app-pivot-table.component.html',
  imports: [CommonModule, FormsModule, DropZoneComponent, DataTableComponent],
  providers: [PivotEngineService]
})
export class AppPivotTableComponent {
  rawData = [
    { category: 'Fruit', item: 'Apple', qty: 10, region: 'North' },
    { category: 'Fruit', item: 'Apple', qty: 5, region: 'South' },
    { category: 'Fruit', item: 'Banana', qty: 12, region: 'North' },
    { category: 'Vegetable', item: 'Carrot', qty: 7, region: 'South' },
    { category: 'Vegetable', item: 'Carrot', qty: 3, region: 'North' },
  ];

  fields = ['category', 'item', 'region', 'qty'];
  groupBy: string[] = [];
  pivotBy: string[] = [];
  aggregation: AggregationType = 'sum';
  result: any[] = [];

  constructor(private pivotEngine: PivotEngineService) {}

  handleDrop(field: string, type: 'group' | 'pivot') {
    if (type === 'group' && !this.groupBy.includes(field)) this.groupBy.push(field);
    if (type === 'pivot' && !this.pivotBy.includes(field)) this.pivotBy.push(field);
    this.update();
  }

  removeField(field: string, type: 'group' | 'pivot') {
    if (type === 'group') this.groupBy = this.groupBy.filter(f => f !== field);
    if (type === 'pivot') this.pivotBy = this.pivotBy.filter(f => f !== field);
    this.update();
  }

  update() {
    this.result = this.pivotEngine.pivot(this.rawData, this.groupBy, this.pivotBy, 'qty', this.aggregation);
  }
}
