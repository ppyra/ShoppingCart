import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable()
export class ProductsService {
  public getProducts(): Observable<Product[]> {
    return this.products();
  }

  public getProduct(id: number): Observable<Product> {
    return this
      .products()
      .pipe(map(el => {
        return el.find((item: Product) => {
          return item.id === id;
        });
      }));
  }

  private products(): Observable<Product[]> {
    return of(<Product[]>[
      <Product>{id: 1, name: 'Buty', price: 123.09},
      <Product>{id: 2, name: 'Torebka', price: 99.09},
      <Product>{id: 3, name: 'Kurtka', price: 99.09},
      <Product>{id: 4, name: 'Czapka', price: 9.09},
      <Product>{id: 5, name: 'Szalik', price: 9.09},
      <Product>{id: 6, name: 'Rekawiczki', price: 19.09},
      <Product>{id: 7, name: 'Okulary', price: 99.09},
      <Product>{id: 8, name: 'Skarpetki', price: 9.09},
      <Product>{id: 9, name: 'Pasek', price: 99.09},
    ]);
  }
}