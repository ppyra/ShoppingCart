import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from '../shoppingCart/shopping-cart.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

import { ProductComponent } from './product.component';
import { routes } from './products.route';
import { ProductsComponent } from './products/products.component';

@NgModule({
    imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ],
    declarations: [
        ProductsComponent,
        ProductComponent,
        ProductDetailsComponent,
        ProductListComponent,
        ShoppingCartComponent
    ],
    // entryComponents: [ShoppingCartComponent],
    exports: [
        ProductsComponent
    ]
    })
    export class ProductModule { }