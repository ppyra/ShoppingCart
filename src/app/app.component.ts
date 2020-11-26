import { Component } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Observable, from } from 'rxjs';
import { Product } from './models/product';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Shopping Cart';
  public shoppingCartItems$: Observable<Product[]>;

  constructor(private cartService: CartService, public location: Location) {

    this.shoppingCartItems$ = this
      .cartService
      .getItems();

    this.shoppingCartItems$.subscribe(items => items);
  }

}
