import { AbstractControl, ValidatorFn } from "@angular/forms";

export const matchValidator = (
  password: string,
  confirmPassword: string,
): ValidatorFn => {
  return (abstractControl: AbstractControl) => {
    const control = abstractControl.get(password);
    const confirmPasswordControl = abstractControl.get(confirmPassword);

    if (
      confirmPasswordControl!.errors &&
      !confirmPasswordControl!.errors?.confirmedValidator
    ) {
      return null;
    }
    if (control!.value !== confirmPasswordControl!.value) {
      const error = { confirmedValidator: 'Passwords do not match' };
      confirmPasswordControl!.setErrors(error);
      return error;
    }
    confirmPasswordControl!.setErrors(null);
    return null;
  };
}
