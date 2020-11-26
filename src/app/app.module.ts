import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';

import { CartService } from './services/cart.service';
import { routes } from './app.routes';
import { ProductModule } from './product/product.module';
import { ProductsService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ProductModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CartService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
