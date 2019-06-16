"use strict";

var labiba = require('./index');

var labibaCode = "\n//Comment\n\u0645\u062A\u063A\u064A\u0631 \u0633\u0627\u0645\u062D = 1;\n\u0645\u0647\u0645\u0629 \u0645\u062B\u0644() {\n    \u0627\u0631\u062C\u0627\u0639 '\u0645\u0631\u062D\u0628\u0627';\n}\n\n\u0645\u062B\u0644()\n";
var code = labiba.transform(labibaCode);
console.log(code);