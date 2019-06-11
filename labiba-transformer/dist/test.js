"use strict";

var transformer = require('./index');

var code = "\n\n//test\n\n\u0645\u062A\u063A\u064A\u0631 c = \u0631\u0642\u0645._\u0646\u0627\u0642\u0635_\u063A\u064A\u0631_\u0645\u062A\u0646\u0627\u0647\u064A\n\n";
var res = transformer.transform(code);
console.log(res);
var t = undefined;

if (t === undefined) {
  console.log('undddd');
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