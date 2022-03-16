import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[];
  private cart$: Subject<any[]>;

  constructor() {
    this.cart = [];
    this.cart$ = new Subject();
  }

  additem(item: any) {
    if(!item) return
    this.cart.push(item);
    this.cart$.next(this.cart);
  }

  removeItem(item: any) {
    if(!item) return
    this.cart = this.cart.filter(i => i.id !== item.id);
    this.cart$.next(this.cart);
  }

  getItems$(): Observable<any> {

    return this.cart$.asObservable();
  }
}
