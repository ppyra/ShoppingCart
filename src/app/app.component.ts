import { Component } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { last, takeLast } from 'rxjs/operators';
import { CartItem, ShoppingCartService } from './services/shopping-cart.service';
// import { ShoppingCartService, CartItem, Totals } from './shopping-cart.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Shopping Cart';
  cartState$ = this.shoppingCartService.state$;
  constructor(private shoppingCartService: ShoppingCartService) { }

  addItemToCart(item: CartItem) {
    this.shoppingCartService.addCartItem(item);
  }

  remove(item: CartItem): void {
    this.shoppingCartService.removeCartItem(item);
  }

}
