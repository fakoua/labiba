# Labiba Transformer

> Transform Labiba Syntax into JavaScript

For working IDE see our repository: [labiba](https://github.com/fakoua/labiba)

## Example:
```sh
const labiba = require('labiba-transformer')

let labibaCode =`
//Comment
متغير سامح = 1;
مهمة مثل() {
    ارجاع 'مرحبا';
}

مثل()
`
let code = labiba.transform(labibaCode);

console.log(code)

------------
output:
//Comment

var سامح = 1;

function مثل() {
  return 'مرحبا';
}

مثل();

```

## Install

Using npm:

```sh
npm install labiba-transformer --save-dev
```

or using yarn:

```sh
yarn add labiba-transformer --dev
```

## Build
```sh
yarn install
yarn build
```
