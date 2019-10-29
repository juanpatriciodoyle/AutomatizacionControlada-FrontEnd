import {Pipe, PipeTransform} from '@angular/core';
import {StatusEnum} from './status.enum';
import {PaymentMethodEnum} from "./paymentMethod.enum";

@Pipe({name: 'TranslatePaymentMethodPipe'})
export class TranslatePaymentMethodPipe implements PipeTransform{
  transform(value: PaymentMethodEnum): string {
    return TranslatePaymentMethodPipe.enumToSpanish(value)
  }

  static enumToSpanish(status: PaymentMethodEnum): string {
    switch (status) {
      case 0:
        return "Efectivo";
      case 1:
        return "Débito";
      case 2:
        return "Cheque";
      case 3:
        return "Crédito";
      case 4:
        return "Factura";
      case 5:
        return "Gratis";
      case 6:
        return "No especificado";
    }
  }
}
