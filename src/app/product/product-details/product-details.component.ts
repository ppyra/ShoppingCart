import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
    selector: 'product-details',
    templateUrl: 'product-details.component.html',
    styleUrls: ['product-details.component.scss']
  })
  export class ProductDetailsComponent implements OnInit {
    public product: Product;
  
    constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService, private cartService: CartService) {
    }
  
    ngOnInit() {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.productsService
          .getProduct(id)
          .subscribe(p => this.product = p)
      });
    }

    public addToCart(product) {
      this.cartService.addToCart(product);
      this.router.navigateByUrl('/');
    }
  }