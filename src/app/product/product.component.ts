import { Component, Input } from '@angular/core';
//import { ShoppingCartService, CartItem } from '../shopping-cart.service';
// import { MatDialog } from '@angular/material/dialog';
//import { CheckoutDialog } from '../checkout/checkout-dialog.component';
@Component({
  selector: 'product-item',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() public id: number;
  @Input() public name: string;
  @Input() public price: number;
  @Input() public currency: string;

  public getCurrency(): string {
    return 'USD';
  }
}