import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { camelCase } from 'lodash';

export class RichValidator {
  public static unBase64(str: string): string {
    return atob(str);
  }
  public static base64(str: string): string {
    return btoa(str);
  }

  public email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const error: ValidationErrors = { email: false };

      if (!control.value || !regex.test(String(control.value).toLowerCase())) {
        return error;
      }

      return null;
    }
  }

  public static between(min: number, max: number, inclusive?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !min || !max) {
        return {'between': false}
      }
      if(inclusive){
        return control.value >= min && control.value <= max ? null : {'between': false};
      }
      return control.value > min && control.value < max ?  null : {'between': false};
    };
  }
}
