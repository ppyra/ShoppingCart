import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable()
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(items => this.itemsInCart = items);
  }

  public addToCart(item: Product) {
    const exist = this.itemsInCart.some(el => el.id === item.id);
    if(exist) {
      // this.itemsInCart.map(el => {
      //   if(el.id === item.id) {
      //     el.pieces >=0 ? el.pieces++ : el.pieces = 0;
      //   }
      // });
      this.increase(item);
      // this.itemsInCartSubject.next(this.itemsInCart);
    } else {
      item.pieces = 1;
      this.itemsInCartSubject.next([...this.itemsInCart, item]);
    }
  }
  increase(item: Product) {
    this.itemsInCart.map(el => {
      if(el.id === item.id) {
        el.pieces >=0 ? el.pieces++ : el.pieces = 0;
      }
    });
    this.itemsInCartSubject.next(this.itemsInCart);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject;
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.pipe(map((items: Product[]) => {
      return items.reduce((prev, curr: Product) => {
        return prev + (curr.price * curr.pieces);
      }, 0);
    }));
  }

  public removeFromCart(item: Product) {
    let currentItems = [...this.itemsInCart];
    let doFilter = false;
    currentItems.map(el => {
      if(el.id === item.id) {
        if(el.pieces &&  el.pieces > 0) {
          el.pieces--;
          el.pieces === 0 ? doFilter = true : doFilter = false;
        } else {
          doFilter = true;
        }
      }
    });
    if (doFilter) {
      currentItems = currentItems.filter(el => el.id !== item.id);
    }
    this.itemsInCartSubject.next(currentItems);
  }
}