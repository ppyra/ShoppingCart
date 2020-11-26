import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  
  })
  export class ProductListComponent implements OnInit {
    @Input() items: Product[];

    constructor() {
    }
  
    ngOnInit() {
    }
  
  }