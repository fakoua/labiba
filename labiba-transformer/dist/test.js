"use strict";

var transformer = require('./index');

var code = "\n\n//test\n\n\u0645\u062A\u063A\u064A\u0631 a = \u063A\u064A\u0631_\u0645\u062D\u062F\u062F\n\n\u0627\u0630\u0627 (a === \u063A\u064A\u0631_\u0645\u062D\u062F\u062F) {\n\n}\n\n\u0627\u0630\u0627 (a == \u063A\u064A\u0631_\u0645\u062D\u062F\u062F) {\n\n}\n";
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