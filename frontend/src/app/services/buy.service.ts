import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  public phoneOwner: string = '541144939808';

  constructor() {}

  generatePayWhatsapp(data: any) {
    let msj = `Hola, soy ${data.name}, vivo en ${data.address}, mi teléfono es ${data.phone}, quiero comprar:`;
    data.products.forEach((element) => {
      msj += `\r\n -${element.name} $${element.price}, cantidad: ${element.amount}`;
    });
    msj += `\r\n Total: $${data.total}`;

    msj = encodeURI(msj);
    const url = `https://wa.me/${this.phoneOwner}?text=${msj}`;

    return url;
  }
}
