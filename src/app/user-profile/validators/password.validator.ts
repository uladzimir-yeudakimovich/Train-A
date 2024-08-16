import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// TODO: replace by auth validator
export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    const validPassword = value.trim().length > 7;

    return validPassword ? null : { invalidPassword: true };
  };
};
