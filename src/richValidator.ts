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

  public cvv(number: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>  {
       if(!control.value || isNaN(control.value) || !number ){
         return  {'cvv': false};
       }
       // AMEX
       const re = new RegExp("^3[47]");
       if (number.match(re) != null){
         return control.value.length === 4 ? null : {'cvv': false};
       }

       return control.value.length === 3 ? null : {'cvv': false};
    }
  }
  //The value of control.value should not be found in str arg.
  //Set strict arg. to true to match upper or lower cases
   public notInclude(str: string, strict?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>  {
      if(!control.value || !str){
        return  {'notInclude': false};
      }
      if(strict){
        return control.value.toLowerCase().indexOf(str.toLowerCase()) === -1 ? null : {'notInclude': false};
      }
      return control.value.indexOf(str) === -1 ? null : {'notInclude': false};
    }
  }

 //The value of control.value should be found in str arg.
 //Set strict arg. to true to match upper or lower cases
 public includes(str: string, strict?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>  {
      if(!control.value){
        return  {'includes': false};
      }
      if(strict){
        return str.toLowerCase().includes(control.value.toLowerCase()) ? null : {'includes': false};
      }
      return str.includes(control.value) ? null : {'includes': false}
    }
  }

  //different
  //Set strict arg. to true to match upper or lower cases
  public different(str: string, strict?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>  {
      if(!control.value){
        return  {'different': false};
      }
      if(strict){
        return control.value.toLowerCase() !== str.toLowerCase() ? null : {'different': false};
      }
      return control.value !== str ? null : {'different': false};
    }
  }

  //identical
  public identical(str: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>  {
      if(!control.value){
        return  {'identical': false};
      }
      return control.value === str ? null : {'identical': false}
    }
  }

  public greaterThan(number: number, decimalsLen?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>  {

       if(!control.value || !number){
         return  {'greaterThan': false};
       }

       let decimals = decimalsLen || 0;
       let decNum = 0;
       let inputNum = parseFloat(parseFloat(control.value).toFixed(decimals));
       let controlIndex = control.value.indexOf('.');

       if(decimals > 0){
         if(control.value[controlIndex + 1] !== undefined){
           decNum = (control.value.length - 1) - controlIndex;
         }else{
           return  {'greaterThan': false};
         }
          return inputNum > number && decNum <= decimals ? null : {'lessThan': false}
       }
       return inputNum > number && controlIndex < 0 ? null : {'lessThan': false}
    }
  }

  public lessThan(number: number, decimalsLen?: number): ValidatorFn {
     return (control: AbstractControl): ValidationErrors | null =>  {

       if(!control.value || !number){
         return  {'lessThan': false};
       }

       let decimals = decimalsLen || 0;
       let decNum = 0;
       let inputNum = parseFloat(parseFloat(control.value).toFixed(decimals));
       let controlIndex = control.value.indexOf('.');

       if(decimals > 0){
         if(control.value[controlIndex + 1] !== undefined){
           decNum = (control.value.length - 1) - controlIndex;
         }else{
           return  {'lessThan': false};
         }
          return inputNum < number && decNum <= decimals ? null : {'lessThan': false}
       }
       return inputNum < number && controlIndex < 0 ? null : {'lessThan': false}
     }
   }

}
