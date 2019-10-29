/** Phone1 cant match Phone2*/
import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const phoneMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const phone1 = control.get('phone1');
  const phone2 = control.get('phone2');

  return phone1 && phone2 && phone1.value === phone2.value ? { 'phoneMatch': true } : null;
};
