import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const trimmedLengthValidator = (
  minLength: number,
  maxLength: number,
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const trimmedValue = control.value.trim();
    if (trimmedValue.length < minLength || trimmedValue.length > maxLength) {
      return { minlength: true };
    }
    return null;
  };
};
