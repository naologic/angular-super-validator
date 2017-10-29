import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { mapValues, filter, isArray, isPlainObject, keys, merge, last } from 'lodash';

/**
 * Form Helper
 *
 *
 */
export class FormHelper {
    /**
     * Get all errors from a Abstract Control
     *    -- loop all children
     *    -- eliminate keys that don't have errors
     *
     *
     * @param {AbstractControl} formEl
     * @returns {{}}
     */
    public static getAllErrors(formEl: AbstractControl) {
      let errs = {};
      if (formEl instanceof FormGroup) {

        // -->Get: all errors
        errs = mapValues(formEl.controls, (vv, cc) => {
          const err = FormHelper.getAllErrors(vv);
          return (err) ? err : null;
        });
        // -->Eliminate: null values
        keys(errs)
          .map(k => {
            if (!errs[k]) delete errs[k];
            if (isArray(errs[k]) && errs[k].length === 0) delete errs[k];
          });

      }else if (formEl instanceof FormArray) {

        errs = formEl.controls.map(el => {
          return FormHelper.getAllErrors(el)
        })
        .filter(s => isPlainObject(s))
        .filter(s => keys(s).length);

      }else if (formEl instanceof FormControl) {
        errs = <ValidationErrors>formEl.errors || null;
      }

      return errs;
    }

  /**
   * List the errors in a flat map
   *
   *
   * @param {AbstractControl} formEl
   * @param {string} path
   * @returns {{}}
   */
  public static getAllErrorsFlat(formEl: AbstractControl, path = '') {
    const errs2 = {};

    const walk = (fEl, p) => {
      let errs = {};

      if (fEl instanceof FormGroup || fEl instanceof FormArray) {
        const ks = keys(fEl.controls);
        const isArr = fEl instanceof FormArray;

        ks.map(k => {
          const newKey = (isArr) ? '[' + k + ']' : k;
          const newPath = (isArr) ? (p) ? p + newKey : newKey : (p) ? p + '.' + newKey : newKey;

          const err = walk(fEl.get(k), newPath);
          errs[newPath] = (err) ? err : null;
        });
        // -->Eliminate: null values
        keys(errs)
          .map(k => {
            if (!errs[k]) delete errs[k];
            if (isArray(errs[k]) && errs[k].length === 0) delete errs[k];
          });

      }else if (fEl instanceof FormControl) {
        errs = <ValidationErrors>fEl.errors || null;
        if (errs) errs2[p] = errs;
      }
    };
    walk(formEl, path);

    return errs2;
  }

  /**
   * Format incoming errors
   *
   * @param errs
   * @returns {string}
   */
  public static formatErrors(errs) {
    let text = '';
    text = `<div>`;

    mapValues(errs, (vv, ii) => {
      ii = ii.replace(/\./g , ' -> ');
      text = `${text} ${ii}`;

      console.log(vv)

      // -->Validate: [Validators.minLength]
      if (vv.minlength)
        text = `<p>${text} field is ${vv.minlength.actualLength} characters but the length should have a minimum of ${vv.minlength.requiredLength} characters</p>`;

      // -->Validate: [Validators.maxLength]
      if (vv.maxlength)
        text = `<p>${text} field is ${vv.maxlength.actualLength} characters but the length should have a maximum of ${vv.maxlength.requiredLength} characters</p>`;

      // -->Validate: [DGValidators.min]
      if (vv.min)
        text = `<p>${text} field is ${vv.min.actual} but should be more than ${vv.min.min}</p>`;

      // -->Validate: [DGValidators.max]
      if (vv.max)
        text = `<p>${text} field is ${vv.max.actual} but should be less than ${vv.max.max}</p>`;

      if (vv.email)
        text = `<p>${text} invalid format</p>`;


      let contactByRequired = 0;

      // -->Validate: [Validators.required]
      if (vv.required) {
        if (ii === 'phone')
          text = `<p>${text} field is required or </p>`;
        else if (ii === 'contactByEmail' || ii === 'contactByPhone' || ii === 'contactByPost') {
          if (contactByRequired === 0) {
            contactByRequired++;
            text = `<p>Contact by field is required </p>`;
          }
        } else
          text = `<p>${text} field is required</p>`;
      }

      text += `</div>`;

    });

    return text;
  }

  /**
   * Flatten a deep object
   *
   * @param object
   * @returns {{} & any}
   */
  public static flatten(object) {
    return Object.assign( {}, ...function _flatten( objectBit, path = '' ) {
      return [].concat(
        ...Object.keys( objectBit )
          .map(key => typeof objectBit[ key ] === 'object' ?
            _flatten( objectBit[ key ], `${ path }/${ key }` )
            : ( { [ `${ path }/${ key }` ]: objectBit[ key ] } )
        )
      )
    }( object ) );
  };
}
