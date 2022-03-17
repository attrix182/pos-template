import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app/services/products.service';

@Component({
  selector: 'os-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  searchParam: string;
  public itemsAux: any = [];

  constructor(private productsSvc: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
    console.log(this.products);
  }

  getAllProducts() {
    return this.productsSvc.getAllProducts().subscribe((res: any) => {
      this.products.push(res);
      this.products = this.products[0];
      this.itemsAux = this.products;
    });
  }

  orderByPrice(order: string) {
    this.products.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  deleteItem(item: any) {}

  hacerBusqueda() {
    console.log(this.searchParam);
    if (this.searchParam === '') {
      this.products = this.itemsAux;
      return;
    }
    const serachParamLower = this.searchParam.toLowerCase();
    this.products = this.itemsAux.filter((item) => this.doSearch(item, serachParamLower));
  }

  doSearch(value, searcher) {
    if (typeof value === 'boolean') {
      return false;
    }

    if (typeof value === 'object') {
      for (let fieldKey in value) {
        if (this.doSearch(value[fieldKey], searcher)) {
          return true;
        }
      }
      return false;
    }

    return (typeof value == 'string' ? value.toLocaleLowerCase() : value.toString()).includes(searcher);
  }
}
