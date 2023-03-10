import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableElement } from './models/table-element.interface';

@Injectable({ providedIn: 'root' })
export class AppService {
  dataForTable$: Observable<TableElement[]> = of([
    { name: 'Concrete', unit: 'kg', price: 25.0, amount: 300, id: 121 },
    { name: 'Wooden panel', unit: 'm3', price: 3.89, amount: 110, id: 252 },
    { name: 'Copper wire', unit: 'cm', price: 0.11, amount: 900, id: 312 },
    { name: 'Documentation', unit: 'hours', price: 199, amount: 1, id: 1 },
  ]);
}
