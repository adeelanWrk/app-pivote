import { Routes } from '@angular/router';
import { AppPivotTableComponent } from './app-pivot-table/app-pivot-table.component';

export const routes: Routes = [
    { path: 'app-pivot', component: AppPivotTableComponent },
    { path: '**', redirectTo: '/app-pivot' }
];
