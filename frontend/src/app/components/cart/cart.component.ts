import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BuyService } from '@app/services/buy.service';
import { CartService } from '@app/services/cart.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartFormAbstract } from './cartForm.abstract';

@Component({
  selector: 'os-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends CartFormAbstract implements OnInit {
  @ViewChild('modalCart', { read: TemplateRef })
  modalCart: TemplateRef<any>;

  @Output() changeShowCart: EventEmitter<any> = new EventEmitter<any>();

  @Input() items: any[] = [];

  @Input() totalPrice: number = 0;

  visibilityFormBuy: boolean = false;
  showDetail: boolean = false;

  constructor(
    private modalService: NgbModal,
    private cartSVC: CartService,
    config: NgbModalConfig,
    private buySvc: BuyService,
    private FB: FormBuilder
  ) {
    super();
    config.beforeDismiss = () => {
      this.changeShowCart.emit(false);
      return true;
    };
  }

  ngOnInit() {
    setTimeout(() => {
      this.openModalCart();
      console.log(this.items);
    }, 300);

    this.inicializarForm();
    this.totalPrice = this.getTotalAMount();
  }

  openModalCart() {
    this.modalService.open(this.modalCart);
  }

  setVisibility() {
    this.changeShowCart.emit(false);
  }

  changeShowForm() {
    this.visibilityFormBuy = !this.visibilityFormBuy;
  }

  changeShowDetail(){
    this.showDetail = !this.showDetail;
  }

  getTotalAMount() {
    let total = 0;
    this.items.forEach(item => {
      total += item.price * item.amount;
    }
    );
    return total;

  }

  sendOrder() {
    let link = this.buySvc.generatePayWhatsapp({
      name: this.formGroup.get('name').value,
      address: this.formGroup.get('address').value,
      phone: this.formGroup.get('phone').value,
      products: this.items,
      total: this.getTotalAMount()
    });

    window.open(link, '_blank');
    console.log(link);
  }

  removeItem(item: any) {
    this.cartSVC.removeItem(item);
  }

  inicializarForm() {
    this.formGroup = this.FB.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
  }

  definirMensajesError(): void {
    this.mensajesError = {
      name: {
        required: 'El nombre es requerido'
      },
      address: {
        required: 'La dirección es requerida'
      },
      phone: {
        required: 'El teléfono es requerido'
      }
    };
  }
}
