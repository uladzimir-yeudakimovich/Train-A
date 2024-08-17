import { AbstractControl } from '@angular/forms';
import { emailValidator } from './email.validator';

describe('emailValidator', () => {
  let validatorFn: ReturnType<typeof emailValidator>;

  beforeEach(() => {
    validatorFn = emailValidator();
  });

  it('should return null if the control value is empty', () => {
    const control: AbstractControl = { value: '' } as AbstractControl;
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return null if the control value is a valid email', () => {
    const control: AbstractControl = { value: 'test@example.com' } as AbstractControl;
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return an error object if the control value is an invalid email', () => {
    const control: AbstractControl = { value: 'invalid-email' } as AbstractControl;
    const result = validatorFn(control);
    expect(result).toEqual({ invalidEmail: true });
  });

  it('should return null if the control value is null', () => {
    const control: AbstractControl = { value: null } as AbstractControl;
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return null if the control value is undefined', () => {
    const control: AbstractControl = { value: undefined } as AbstractControl;
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return an error object if the control value is a valid email without a domain', () => {
    const control: AbstractControl = { value: 'test@' } as AbstractControl;
    const result = validatorFn(control);
    expect(result).toEqual({ invalidEmail: true });
  });

  it('should return an error object if the control value has a missing top-level domain', () => {
    const control: AbstractControl = { value: 'test@example' } as AbstractControl;
    const result = validatorFn(control);
    expect(result).toEqual({ invalidEmail: true });
  });

  it('should return an error object if the control value has special characters in the domain', () => {
    const control: AbstractControl = { value: 'test@exa$mple.com' } as AbstractControl;
    const result = validatorFn(control);
    expect(result).toEqual({ invalidEmail: true });
  });
});
