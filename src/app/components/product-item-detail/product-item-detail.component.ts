import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  product: Product = {};
  productID: number = this.route.snapshot.params['id'];
  quantity: number = 1;
  addToCart() {
    this.productService.addToCart(this.product, this.quantity);
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.product = res.find((prod) => prod.id == this.productID) as Product;
    });
    if (this.productService.cart.find((prod) => prod.id == this.productID)) {
      this.quantity = this.productService.cart.find(
        (prod) => prod.id == this.productID
      ).quantity;
    }
  }
}
