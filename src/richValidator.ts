import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { camelCase } from 'lodash';

export class RichValidator {
  public static unBase64(str: string): string {
    return atob(str);
  }
  public static base64(str: string): string {
    return btoa(str);
  }
}