# Labiba Parser

> Labiba Arabic Programing Language Parser

For working IDE see our repository: [labiba](https://github.com/fakoua/labiba)

Labiba Parser generates AST according to babel AST format

## Example:
```sh
const labiba = require('labiba-parser');
 
let labibaCode =`
//Comment
متغير سامح = 1;
مهمة مثل() {
    ارجاع 'مرحبا';
}
 
مثل()
`
 
let ast = labiba.parse(labibaCode)
 
console.log(ast)

```
## repl.it
[https://repl.it/@SamehFakoua/Labiba-Parser-Example](https://repl.it/@SamehFakoua/Labiba-Parser-Example)

## Install

Using npm:

```sh
npm install --save-dev labiba-parser
```

or using yarn:

```sh
yarn add labiba-parser --dev
```

## Build

```sh
yarn install
gulp build
```

