import { Injectable } from '@angular/core';
import { AggregationType } from '../models/field.model';

@Injectable({ providedIn: 'root' })
export class PivotEngineService {
  pivot(data: any[], groupBy: string[], pivotBy: string[], valueField: string, agg: AggregationType): any[] {
    const result: Record<string, any> = {};

    const counter: Record<string, Record<string, number>> = {};

    data.forEach(row => {
      const groupKey = groupBy.map(g => row[g]).join('|');
      const pivotKey = pivotBy.map(p => row[p]).join('|') || 'Total';

      if (!result[groupKey]) {
        result[groupKey] = {};
        groupBy.forEach(g => result[groupKey][g] = row[g]);
      }

      if (!result[groupKey][pivotKey]) result[groupKey][pivotKey] = 0;
      if (!counter[groupKey]) counter[groupKey] = {};
      if (!counter[groupKey][pivotKey]) counter[groupKey][pivotKey] = 0;

      result[groupKey][pivotKey] += (agg === 'count') ? 1 : row[valueField];
      counter[groupKey][pivotKey] += 1;
    });

    if (agg === 'avg') {
      for (const gk of Object.keys(result)) {
        for (const pk of Object.keys(result[gk])) {
          if (groupBy.includes(pk)) continue;
          result[gk][pk] = +(result[gk][pk] / counter[gk][pk]).toFixed(2);
        }
      }
    }

    return Object.values(result);
  }
}