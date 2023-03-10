import {Component} from '@angular/core';
import {TableElement} from "./models/table-element.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-table';
  items: TableElement[] = [];
}
