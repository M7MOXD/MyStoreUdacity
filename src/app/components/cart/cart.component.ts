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
  errorMsg: any = {};
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
  validate() {
    if (!this.name) {
      this.errorMsg.name = 'Please Enter Your Name';
    } else if (this.name.length < 3) {
      this.errorMsg.name = 'Minimum Length 3 Characters';
    }
    if (!this.address) {
      this.errorMsg.address = 'Please Enter Your Address';
    } else if (this.address.length < 3) {
      this.errorMsg.address = 'Minimum Length 6 Characters';
    }
    if (!this.credit) {
      this.errorMsg.credit = 'Please Enter Your Credit Card Number';
    } else if (this.credit.length != 16) {
      this.errorMsg.credit =
        'Minimum Length 16 Characters && Maximun Length 16 Characters';
    }
  }
  ngOnInit(): void {
    this.cart.forEach((x) => {
      this.totalPrice += x.price * x.quantity;
    });
  }
}
