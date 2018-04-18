import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  camelCase,
  capitalize,
  deburr,
  endsWith,
  escape,
  escapeRegExp,
  kebabCase,
  lowerCase,
  lowerFirst, 
  pad,
  padEnd,
  padStart,
  parseInt,
  repeat,
  replace,
  snakeCase,
  split,
  startCase,
  startsWith,
  template,
  toLower,
  toUpper,
  trim,
  trimEnd,
  trimStart,
  truncate,
  unescape,
  upperCase,
  upperFirst,
  words
} from 'lodash';

export class LoValidator {
  /**
   * Overlay for LoDash vars
   */
  public static camelCase(str: string): string {
    return camelCase(str);
  }

  public static capitalize(str: string): string {
    return capitalize(str);
  }

  public static deburr(str: string): string {
    return deburr(str);
  }

  public static endsWith(str: string, target?: string, pos?: number): string {
    return endsWith(str, target, pos);
  }

  public static escape(str: string): string {
    return escape(str);
  }

  public static escapeRegExp(str: string): string {
    return escapeRegExp(str);
  }

  public static kebabCase(str: string): string {
    return kebabCase(str);
  }

  public static lowerCase(str: string): string {
    return lowerCase(str);
  }

  public static lowerFirst(str: string): string {
    return lowerFirst(str);
  }

  public static pad(str: string, len: number, chars?: string): string {
    return pad(str, len, chars);
  }

  public static padEnd(str: string, len: number, chars?: string): string {
    return padEnd(str, len, chars);
  }

  public static padStart(str: string, len: number, chars?: string): string {
    return padStart(str, len, chars);
  }

  public static parseInt(str: string): string {
    return parseInt(str);
  }

  public static repeat(str: string, num: number): string {
    return repeat(str, num);
  }

  public static replace(str: string, pattern: string, rep: string): string {
    return replace(str, pattern, rep);
  }

  public static snakeCase(str: string): string {
    return snakeCase(str);
  }

  public static split(str: string, sep: string, limit: string): string {
    return split(str, sep, limit);
  }

  public static startCase(str: string): string {
    return startCase(str);
  }

  public static startsWith(str: string, target: string, pos?: number): string {
    return startsWith(str, target, pos);
  }

  public static template(str: string, option?: object): string {
    return template(str, option);
  }

  public static toLower(str: string): string {
    return toLower(str);
  }

  public static toUpper(str: string): string {
    return toUpper(str);
  }

  public static trim(str: string, chars?: string): string {
    return trim(str, chars);
  }

  public static trimEnd(str: string, chars?: string): string {
    return trimEnd(str, chars);
  }

  public static trimStart(str: string, chars?: string): string {
    return trimStart(str, chars);
  }

  public static truncate(str: string, options?: object): string {
    return truncate(str, options);
  }

  public static unescape(str: string): string {
    return unescape(str);
  }

  public static upperCase(str: string): string {
    return upperCase(str);
  }

  public static upperFirst(str: string): string {
    return upperFirst(str);
  }

  public static words(str: string, pattern?: RegExp | string): string {
    return words(str, pattern);
  }
}
