import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DGValidators {
  /**
   * Validator that requires controls to have a value greater than a number.
   */
  static min(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return {'min': min, 'actual': control.value};
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value < min ? {'min': min, 'actual': control.value} : null;
    };
  }

  /**
   * Validator that requires controls to have a value less than a number.
   */
  static max(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return {'max': max, 'actual': control.value};
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value > max ? {'max': max, 'actual': control.value} : null;
    };
  }

  /**
   * Validator for phone from people based on a regexp
   *
   * @returns {ValidatorFn}
   */
  static peoplePhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value !== null && control.value.length > 0 && !/^\+?[ \d]+$/g.test(control.value)) ? {
        'RegExp': '/^\\+?[ \\d]+$/g',
        'actualValue': control.value
      } : null;
    }
  }

}

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}
