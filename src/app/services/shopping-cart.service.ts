import { Injectable, Inject } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Observable, of, merge, Subject, BehaviorSubject } from 'rxjs';
import { scan, startWith, map, tap, combineLatest, switchMap, skipWhile, shareReplay, debounceTime, publish, refCount, share } from 'rxjs/operators';
import { DATA_ITEMS } from '../data';

export interface Totals {
  subTot: number;
  tax: number;
  grandTot: number;
}

export interface CartItem {
  price: number;
  image: string;
  name: string;
  details: string;
  heart: boolean;
  uuid?: any;
  remove?: boolean;
}

export interface StateTree {
  store: CartItem[];
  cart: CartItem[];
  tot: Totals,
  checkout: boolean;
};

@Injectable()
export class ShoppingCartService {

  private stateTree$ = new BehaviorSubject<StateTree>(null);
  private checkoutTrigger$ = new BehaviorSubject<boolean>(false);
  private cartAdd$ = new Subject<CartItem>();
  private cartRemove$ = new Subject<CartItem>();

  private get cart$(): Observable<CartItem[]> {
    return merge(this.cartAdd$, this.cartRemove$).pipe(
      startWith([]),
      scan((acc: CartItem[], item: CartItem, any) => {
        if (item) {
          if (item.remove) {
            return [...acc.filter(i => i.uuid !== item.uuid)];
          }
          return [...acc, item];
        }
      })
    );
  }

  private get total$(): Observable<Totals> {
    return this.cart$.pipe(
      map(items => {
        let total = 0;
        for (const i of items) {
          total += i.price;
        }
        return total;
      }),
      map(cost => ({
        subTot: cost,
        tax: .034 * cost,
        grandTot: .034 * cost + cost
      })
      )
    );
  }

  state$: Observable<StateTree> = this.stateTree$.pipe(
    switchMap(() => this.getItems().pipe(
      combineLatest([this.cart$, this.total$, this.checkoutTrigger$]),
      debounceTime(0),
    )),
    map(([store, cart, tot, checkout]: any) => ({ store, cart, tot, checkout })),
    tap(state => {
      if (state.checkout) {
        console.log('checkout', state);
      }
    }),
    shareReplay(1)
  );

  constructor() { }

  private getItems() {
    return of(DATA_ITEMS);
  }

  addCartItem(item: CartItem) {
    this.cartAdd$.next({ ...item, uuid: uuid() });
  }

  removeCartItem(item: CartItem) {
    this.cartRemove$.next({ ...item, remove: true });
  }

  checkout() {
    this.checkoutTrigger$.next(true);
  }
}