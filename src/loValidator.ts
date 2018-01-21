import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { camelCase } from 'lodash';

export class LoValidator {
  /**
   * Overlay for LoDash vars
   */
  public static camelCase(str: string): string {
    return camelCase(str);
  }
}