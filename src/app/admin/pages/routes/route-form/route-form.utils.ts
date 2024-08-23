import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function minArrayLength(min: number): ValidatorFn {
  // the last value is always empty, so check min + 1
  const minRequiredLength = min + 1;
  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormArray) {
      if (control.length >= minRequiredLength) {
        return null;
      }
      return {
        minArrayLength: {
          requiredLength: minRequiredLength,
          actualLength: control.length,
        },
      };
    }
    return null;
  };
}
