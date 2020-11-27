import { Component, OnInit } from '@angular/core';
import { Observable, of  } from 'rxjs';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingCartItems$: Observable<Product[]> = of([]);
  public shoppingCartItems: Product[] = [];

  constructor(private cartService: CartService) {
    this.shoppingCartItems$ = this
      .cartService
      .getItems();

    this.shoppingCartItems$.subscribe(item => this.shoppingCartItems = item);
  }

  ngOnInit() {
  }
  getCount() {
    let counter = 0;
    this.shoppingCartItems.forEach(el => counter =+ el.pieces);
    return counter;
  }

  getTotal(){
    let total = 0;
    this.cartService.getTotalAmount().subscribe((v: number) => {
        console.log(v.toString());
        total = v;
      }
    );
    return total;
  }

  public removeItem(item: Product) {
    this.cartService.removeFromCart(item)
  }
  increase(item) {
    this.cartService.increase(item);
  }
}