import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const loginEmailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    const validEmail = /^[\w\d_]+@[\w\d_]+\.\w{2,7}$/.test(value);

    return validEmail ? null : { invalidEmail: true };
  };
};
