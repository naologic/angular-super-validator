import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SuperValidators {
  /**
   * Validator that requires controls to have a value greater than a number.
   */
  public static min(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return {'min': min, 'actualValue': control.value};
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value < min ? {'min': min, 'actualValue': control.value} : null;
    };
  }

  /**
   * Validator that requires controls to have a value less than a number.
   */
  public static max(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return {'max': max, 'actualValue': control.value};
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value > max ? {'max': max, 'actualValue': control.value} : null;
    };
  }
  public static hasNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: ValidationErrors = { hasNumber: false };

      if (!control.value || !/\d/.test(control.value)) {
        return error;
      }

      return null;
    };
  }

  public static hasUpper(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: ValidationErrors = { hasUpper: false };

      if (!control.value || control.value.search(/[A-Z]/) < 0) {
        return error;
      }

      return null;
    };
  }

  public static hasLower(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: ValidationErrors = { hasLower: false };

      if (!control.value || control.value.search(/[a-z]/) < 0) {
        return error;
      }

      return null;
    };
  }

  public static hasSpecial(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const error: ValidationErrors = { hasSpecial: false };
        const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        if (!control.value || !format.test(control.value)) {
          return error;
        }

        return null;
      };
   }
}

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}
