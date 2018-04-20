import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { camelCase } from 'lodash';

export class RichValidator {
  public static unBase64(str: string): string {
    return atob(str);
  }
  public static base64(str: string): string {
    return btoa(str);
  }

  public static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const error: ValidationErrors = { email: false };

      if (!control.value || !regex.test(String(control.value).toLowerCase())) {
        return error;
      }

      return null;
    }
  }

  public static phone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let regex = /^[\s()+-]*([0-9][\s()+-]*){6,20}(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
      if (!control.value || !regex.test(control.value)) {
        return {'phone': false}
      }
      return null;
    };
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

  public static creditCard():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /[^0-9-\s]+/;
      if (!control.value || regex.test(control.value)) return {'creditCard': false};

      let nCheck = 0;
      let bEven = false;
      let value = control.value.replace(/\D/g, "");

      for (let n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
          if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
      }
      return (nCheck % 10) == 0 ? null : {'creditCard': false};
    }
  }

}
