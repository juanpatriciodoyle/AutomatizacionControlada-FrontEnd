import {Pipe, PipeTransform} from '@angular/core';
import {PositionEnum} from './position.enum';

@Pipe({name: 'TranslatePositionPipe'})
export class TranslatePositionPipe implements PipeTransform{
  transform(value: PositionEnum): string {
    return TranslatePositionPipe.enumToSpanish(value)
  }


  static enumToSpanish(position: PositionEnum): string {
    switch (position) {
      case 0:
        return "Jefe";
      case 1:
        return "Dueño";
      case 2:
        return "Técnico";
      case 3:
        return "Ventas";
    }
  }
}
