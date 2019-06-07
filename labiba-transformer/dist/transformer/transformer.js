"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.declaration = declaration;
exports.transformGlobal = transformGlobal;
exports.transformMember = transformMember;

function declaration(node) {
  switch (node.kind) {
    case 'متغير':
      return 'var';

    case 'ثابت':
      return 'const';

    case 'مقيد':
      return 'let';

    default:
      return node.kind;
  }
}

function transformGlobal(objectName) {
  var globalOject = {
    properties: [{
      js: 'parseInt',
      la: 'الى_صحيح'
    }, {
      js: 'parseFloat',
      la: 'الى_حقيقي'
    }, {
      js: 'isNaN',
      la: 'هو_ليس_رقم'
    }, {
      js: 'isFinite',
      la: 'هو_منتهي'
    }, {
      js: 'decodeURI',
      la: 'فك_تشفير_رابط'
    }, {
      js: 'decodeURIComponent',
      la: 'فك_تشفير_رابط_شامل'
    }, {
      js: 'encodeURI',
      la: 'تشفير_رابط'
    }, {
      js: 'encodeURIComponent',
      la: 'تشفير_رابط_شامل'
    }, {
      js: 'escape',
      la: 'تشفير'
    }, {
      js: 'unescape',
      la: 'فك_تشفير'
    }]
  };

  function getGlobalName(objectName) {
    var found = globalOject.properties.find(function (el) {
      return el.la === objectName;
    });
    return found ? found.js : objectName;
  }

  return getGlobalName(objectName);
}

function transformMember(objectName, propertyName) {
  var generalObject = {
    properties: [{
      js: 'toString',
      la: 'الى_نص'
    }]
  };
  var numberObject = {
    js: 'Number',
    la: 'رقم',
    properties: [{
      js: 'NaN',
      la: 'حلل'
    }, {
      js: 'NEGATIVE_INFINITY',
      la: 'حلل'
    }, {
      js: 'POSITIVE_INFINITY',
      la: 'حلل'
    }, {
      js: 'MAX_VALUE',
      la: 'حلل'
    }, {
      js: 'MIN_VALUE',
      la: 'حلل'
    }, {
      js: 'EPSILON',
      la: 'حلل'
    }, {
      js: 'MAX_SAFE_INTEGER',
      la: 'حلل'
    }, {
      js: 'MIN_SAFE_INTEGER',
      la: 'حلل'
    }, {
      js: 'isFinite',
      la: 'حلل'
    }, {
      js: 'isInteger',
      la: 'حلل'
    }, {
      js: 'isSafeInteger',
      la: 'حلل'
    }, {
      js: 'isNaN',
      la: 'حلل'
    }, {
      js: 'toFixed',
      la: 'حلل'
    }, {
      js: 'toExponential',
      la: 'حلل'
    }, {
      js: 'toPrecision',
      la: 'حلل'
    }]
  };
  var jsonObject = {
    js: 'JSON',
    la: 'جايسون',
    properties: [{
      js: 'parse',
      la: 'حلل'
    }, {
      js: 'stringify',
      la: 'الى_نص'
    }]
  };
  var mathObject = {
    js: 'Math',
    la: 'رياضيات',
    properties: [{
      js: 'E',
      la: 'نيريبي_'
    }, {
      js: 'LN10',
      la: 'اس10_'
    }, {
      js: 'LN2',
      la: 'اس2_'
    }, {
      js: 'LOG2E',
      la: 'اس2نيريبي_'
    }, {
      js: 'LOG10E',
      la: 'اس10نيريبي_'
    }, {
      js: 'PI',
      la: 'باي_'
    }, {
      js: 'SQRT1_2',
      la: 'تربيعي1_2_'
    }, {
      js: 'SQRT2',
      la: 'تربيعي2_'
    }, {
      js: 'abs',
      la: 'مطلقة'
    }, {
      js: 'acos',
      la: 'جيب_تام_معكوس'
    }, {
      js: 'acosh',
      la: 'جيب_تام_زائدي_معكوس'
    }, {
      js: 'asin',
      la: 'جيب_عكسي'
    }, {
      js: 'asinh',
      la: 'جيب_زائدي_معكوس'
    }, {
      js: 'atan',
      la: 'ظل_معكوس'
    }, {
      js: 'atanh',
      la: 'ظل_زائدي_معكوس'
    }, {
      js: 'atan2',
      la: 'ظل_معكوس2'
    }, {
      js: 'cbrt',
      la: 'جذر_تكعيبي'
    }, {
      js: 'ceil',
      la: 'صحيح'
    }, {
      js: 'clz32',
      la: 'عدد_اصفار32'
    }, {
      js: 'cos',
      la: 'جيب_تام'
    }, {
      js: 'cosh',
      la: 'جيب_تام_زائدي'
    }, {
      js: 'exp',
      la: 'اسية'
    }, {
      js: 'expm1',
      la: 'اسية_بلا1'
    }, {
      js: 'floor',
      la: 'سطح'
    }, {
      js: 'fround',
      la: 'تقريب_فواصل'
    }, {
      js: 'hypot',
      la: 'وتر'
    }, {
      js: 'imul',
      la: 'ضرب'
    }, {
      js: 'log',
      la: 'اس'
    }, {
      js: 'log10',
      la: 'اس10'
    }, {
      js: 'log1p',
      la: 'اس_اضف1'
    }, {
      js: 'log2',
      la: 'اس2'
    }, {
      js: 'max',
      la: 'اقصى'
    }, {
      js: 'min',
      la: 'ادنى'
    }, {
      js: 'pow',
      la: 'رفع'
    }, {
      js: 'random',
      la: 'عشوائي'
    }, {
      js: 'round',
      la: 'تقريب'
    }, {
      js: 'sin',
      la: 'جيب'
    }, {
      js: 'sinh',
      la: 'جيب_زائدي'
    }, {
      js: 'sqrt',
      la: 'جذر_تربيعي'
    }, {
      js: 'tan',
      la: 'ظل'
    }, {
      js: 'tanh',
      la: 'ظل_زائدي'
    }, {
      js: 'trunc',
      la: 'بتر'
    }]
  };
  var jsFunctions = [mathObject, jsonObject, numberObject]; /////////////////////////////////////////

  function getObjectName(objectName) {
    var found = jsFunctions.find(function (el) {
      return el.la === objectName;
    });
    return found ? found.js : objectName;
  }

  function getPropertyName(objectName, propertyName) {
    var found = jsFunctions.find(function (el) {
      return el.la === objectName;
    });

    if (found) {
      //Example Math.PI, Math.sin(12) ...
      var prop = found.properties.find(function (el) {
        return el.la === propertyName;
      });

      if (prop) {
        return prop.js;
      } else {
        // Should Raise Error
        return propertyName;
      }
    } else {
      //Example of d.getDay() while d is date ...
      var _prop = generalObject.properties.find(function (el) {
        return el.la === propertyName;
      });

      return _prop ? _prop.js : propertyName;
    }
  }

  return {
    objectName: getObjectName(objectName),
    propertyName: getPropertyName(objectName, propertyName)
  };
}