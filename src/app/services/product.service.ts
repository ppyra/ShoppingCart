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
      <Product>{id: 1, name: 'Audi Adama', price: 123.09},
      <Product>{id: 2, name: 'kurs xslt', price: 99.09},
      <Product>{id: 3, name: 'ksiazka agile MaRKA', price: 99.09},
      <Product>{id: 4, name: 'Usługi scrum', price: 99.09},
      <Product>{id: 5, name: 'ksiazki vue', price: 99.09},
      <Product>{id: 6, name: 'Srue', price: 99.09},
      <Product>{id: 7, name: 'Sasha Gray', price: 99.09},
      <Product>{id: 8, name: 'Elo Damian', price: 99.09},
      <Product>{id: 9, name: 'DMI', price: 99.09},
    ]);
  }
}