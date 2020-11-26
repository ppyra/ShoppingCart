import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
    selector: 'spa-products',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.scss']
  })
  export class ProductsComponent implements OnInit {
  
    public items: Product[] = [];
  
    constructor(private productsServices: ProductsService
      , private cartService: CartService) {
      
  
      this.cartService
        .getItems()
        .subscribe((items: Product[]) => {
          const allItems = this.items;
          this.items = allItems.filter(el => {
            return !this.itemIsInCart(el, items);
          });
        });
    }
  
    ngOnInit() {
      this.productsServices.getProducts()
        .subscribe(el => this.items = el);
    }
  
    private itemIsInCart(item: Product, cart: Product[]): boolean {
      return cart.find(el => el.id === item.id) != null;
    }
  }