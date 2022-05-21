import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cart: any[] = [];
  order: Order = {};
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json');
  }
  addToCart(product: Product, quantity: number) {
    if (!this.cart.find((prod) => prod.id === product.id)) {
      this.cart.push({ ...product, quantity });
      alert('Product Added To Cart');
    } else {
      if (quantity == 0) {
        this.cart = this.cart.filter((prod) => prod.id !== product.id);
        alert('Product Removed From Cart');
      } else {
        this.cart.find((prod) => prod.id === product.id).quantity = quantity;
        alert('Product Quantity Changed');
      }
    }
  }
  makeOrder(orderDetails: Order) {
    this.order = orderDetails;
    this.cart = [];
  }
}
