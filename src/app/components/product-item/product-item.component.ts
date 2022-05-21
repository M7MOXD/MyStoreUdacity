import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  constructor(private productService: ProductService) {}
  @Input() product: Product = {};
  quantity: number = 1;
  addToCart() {
    this.productService.addToCart(this.product, this.quantity);
  }
  ngOnInit(): void {
    if (this.productService.cart.find((prod) => prod.id == this.product.id)) {
      this.quantity = this.productService.cart.find(
        (prod) => prod.id == this.product.id
      ).quantity;
    }
  }
}
