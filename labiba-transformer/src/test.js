const labiba = require('./index')

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