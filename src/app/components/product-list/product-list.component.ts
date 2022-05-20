import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productHTTP: ProductService) {}
  products: Product[] = [];
  ngOnInit(): void {
    this.productHTTP.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
