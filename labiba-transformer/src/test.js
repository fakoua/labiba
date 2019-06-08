const transformer = require('./index');

const code = `

//test

متغير a = غير_محدد

اذا (a === غير_محدد) {

}

اذا (a == غير_محدد) {

}
`

let res = transformer.transform(code)

console.log(res);

var t=undefined

if (t === undefined) {
    console.log('undddd')
}


/*
let b = new Boolean(-1)
console.log(b)
let n = new Number(14)
console.log(n)
var s = new String(14)
console.log(s)
var d = new Date()
console.log(d)
var a = new Array(2)
console.log(a)
var f = new Function()
console.log(f)
var o = new Object(b)
console.log(o)
*/