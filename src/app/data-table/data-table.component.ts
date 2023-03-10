import {
  Component, HostListener,
  Input, NgZone,
  OnInit,
} from '@angular/core';
import { TableElement } from '../models/table-element.interface';
import {AppService} from "../app-service.service";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() items: TableElement[] = [];
  columns: any[] = [
    { data: 'name', readOnly: true },
    { data: 'unit', readOnly: true },
    {
      data: 'price',
      type: 'numeric',
      format: '0,0.00',
    },
    {
      data: 'amount',
      type: 'numeric',
      format: '0,0.00',
    },
    {
      data: 'subtotal',
      type: 'numeric',
      format: '0,0.00',
    },
  ];
  headers = ['Name', 'Unit', 'Price', 'Amount', 'Subtotal'];
  totalSum: any;
  totalInformation:boolean = false;
  sumFiltered: any;
  largest: number = 0;
  largestName: any;
  cheapest: number = 0;
  cheapestName: any;

  constructor(
    private appService: AppService,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.getAllData();
    console.log(this.items)
  }

  getAllData() {
    this.appService.dataForTable$.subscribe((data) => {
      this.items = data;
      this.items.map((totalResult) => {
          totalResult.subtotal = totalResult.amount * totalResult.price;
      })

    })
  }

  isTotalInformation () {
    this.totalInformation = true;

    setTimeout(() => {
      this.totalInformation = false;
    }, 5000)
  }

  @HostListener('document:click', ['$event'])
  detectChanges() {
    this.items =  this.items.map((totalResult) => {
      totalResult.subtotal = totalResult.amount * totalResult.price;
      this.sumFiltered = this.items.map(res => res.subtotal);
      this.totalSum = this.sumFiltered.reduce((partialSum: any, a:any) => partialSum + a, 0);
      this.cheapest = Math.min(...this.sumFiltered)

      for (let i=0; i<this.sumFiltered.length; i++){
        if (this.sumFiltered[i] > this.largest) {
          this.largest = this.sumFiltered[i];
        }
      }
      this.largestName = this.items.find(item => item.subtotal === this.largest);
      this.cheapestName = this.items.find(item => item.subtotal === this.cheapest);

      return totalResult
      })
  }

}
