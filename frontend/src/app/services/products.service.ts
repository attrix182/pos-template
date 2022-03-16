import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlApi: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.urlApi}/products`);
  }
}