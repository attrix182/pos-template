import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'os-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;

  @ViewChild('modalPost', { read: TemplateRef })
  modalPost: TemplateRef<any>;

  public showPost: any = '';
  public amount: number = 1;

  constructor(private modalService: NgbModal, private cartSVC: CartService) {}

  ngOnInit(): void {}

  openModalPost(post) {
    this.showPost = post;
    this.modalService.open(this.modalPost);
  }

  addToCart() {
    this.product.amount = this.amount;
    this.cartSVC.additem(this.product);
    this.amount = 1;
    this.modalService.dismissAll();
  }

  addAmount() {
    this.amount++;
  }

  removeAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  }
}
