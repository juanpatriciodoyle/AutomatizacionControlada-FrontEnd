import {Pipe, PipeTransform} from '@angular/core';
import {StatusEnum} from './status.enum';

@Pipe({name: 'TranslateStatusPipe'})
export class TranslateStatusPipe implements PipeTransform{
  transform(value: StatusEnum): string {
    return TranslateStatusPipe.enumToSpanish(value)
  }

  static enumToSpanish(status: StatusEnum): string {
    switch (status) {
      case 0:
        return "En servicio";
      case 1:
        return "Retrasada";
      case 2:
        return "Lista";
      case 3:
        return "Entregada";
    }
  }

}
