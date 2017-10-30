# angular-super-validator
[![npm version](https://badge.fury.io/js/angular-super-validator.svg)](https://badge.fury.io/js/angular-super-validator)

A form validator library for deep validation and error extraction from Angular Forms

## Install

```sh
$ npm install --save angular-super-validator
```

## Import
```typescript
import { SuperForm } from "angular-super-validator";
```

## Use in FormGroup

```typescript
const fg = new FormGroup({
     id: new FormControl(0, [Validators.required]),
     name: new FormControl('', [Validators.required]),
     description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
     isSkipped: new FormControl(false),
});

if (!fg.valid) {
    const errors = SuperForm.getAllErrors(fg);
    const errorsFlat = SuperForm.getAllErrorsFlat(fg);

    console.log(errors);
}

```


Made with :heart: in :uk: