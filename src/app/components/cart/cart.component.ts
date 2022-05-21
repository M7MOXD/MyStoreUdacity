import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private productService: ProductService, private route: Router) {}
  cart: any[] = this.productService.cart;
  totalPrice: number = 0;
  name: string = '';
  address: string = '';
  credit: string = '';
  addToCart(prod: any, e: any) {
    this.productService.addToCart(prod, e.target.value);
    this.cart = this.productService.cart;
    this.totalPrice = 0;
    this.cart.forEach((x) => {
      this.totalPrice += x.price * x.quantity;
    });
  }
  submit() {
    this.route.navigateByUrl('/confirmation');
    this.productService.makeOrder({
      name: this.name,
      address: this.address,
      totalPrice: this.totalPrice,
    });
  }
  ngOnInit(): void {
    this.cart.forEach((x) => {
      this.totalPrice += x.price * x.quantity;
    });
  }
}
