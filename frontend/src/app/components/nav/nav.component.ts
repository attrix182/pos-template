import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'os-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
@HostListener('scroll', ['$event'])
export class NavComponent implements OnInit {
  public toggle: boolean = false;
  public amount: number = 0;
  public showCart: boolean = false;
  public itemsCart: any[] = [];
  public totalPrice: number = 0;
  public emptyCart: boolean = true;

  constructor(private cartSVC: CartService) {}

  ngOnInit(): void {
    this.cartSVC.getItems$().subscribe((res) => {
      this.amount = res.length;
      this.itemsCart = res;
      this.totalPrice = this.getTotalPrice();
    });
  }

  getTotalPrice() {
    let total = 0;
    this.itemsCart.forEach((item) => {
      total += item.price;
    });
    return total;
  }

  onWindowScroll(event: any) {
    let element = document.querySelector('.navbar') as HTMLElement;
    let scrollTop = event.srcElement.children[0].scrollTop;

    if (scrollTop > 0) {
      element.classList.add('nav-sticky');
    } else {
      element.classList.remove('nav-sticky');
    }
  }

  toggleNavbar() {
    let element = document.querySelector('.navbar-toggler') as HTMLElement;
    let element2 = document.querySelector('.navCol') as HTMLElement;

    if (!this.toggle) {
      element.classList.add('collapsed');
      element2.classList.add('show');
      this.toggle = true;
    } else {
      element.classList.remove('collapsed');
      element2.classList.remove('show');
      this.toggle = false;
    }
  }

  setShowCart() {
    if (this.amount > 0) {
      this.showCart = true;
    } else {
      this.showCart = false;
      console.log('no hay items en el carrito');
    }
    console.log(this.showCart);
  }

  closeCart() {
    this.showCart = false;
  }
}
