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
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject;
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.pipe(map((items: Product[]) => {
      return items.reduce((prev, curr: Product) => {
        return prev + curr.price;
      }, 0);
    }));
  }

  public removeFromCart(item: Product) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(el => el.id !== item.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }
}