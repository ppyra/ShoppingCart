import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {
      path: 'products',
      component: ProductsComponent
    },
    {
      path: 'details/:id',
      component: ProductDetailsComponent
    },
  ];