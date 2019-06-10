"use strict";

var _labibaParser = require("labiba-parser");

var _generator = _interopRequireDefault(require("@babel/generator"));

var labibaTransfrom = _interopRequireWildcard(require("./transformer/transformer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.transform = function (labibaCode) {
  var ast = (0, _labibaParser.parse)(labibaCode);
  processTransfrom(ast);
  var output = (0, _generator["default"])(ast, {
    sourceMaps: true
  });
  return output.code;
};

exports.keywords = function () {
  return labibaTransfrom.keywords();
};

function processTransfrom(node) {
  if (Array.isArray(node)) {
    node.forEach(function (subNode) {
      processNode(subNode);
      processTransfrom(subNode);
    });
  } else {
    processNode(node);

    for (var prop in node) {
      //console.log(`${prop}: ${node[prop]}`)
      var tp = _typeof(node[prop]);

      if (tp === 'object') {
        //console.log(prop)
        processTransfrom(node[prop]);
      }
    }
  }
}

function processNode(node) {
  if (node && 'type' in node) {
    //console.log(node.type)
    if (node.type === 'VariableDeclaration') {
      node.kind = labibaTransfrom.declaration(node);
    }

    if (node.type === 'CallExpression') {
      if (node.callee.object) {
        // Class.Property
        var member = labibaTransfrom.transformMember(node.callee.object.name, node.callee.property.name);
        node.callee.object.name = member.objectName;
        node.callee.property.name = member.propertyName;
      } else {
        // Global Functions
        console.log('Global Functions');
        node.callee.name = labibaTransfrom.transformGlobal(node.callee.name);
      }
    }

    if (node.type === 'MemberExpression') {
      var _member = labibaTransfrom.transformMember(node.object.name, node.property.name);

      node.object.name = _member.objectName;
      node.property.name = _member.propertyName;
    }

    if (node.type === 'NewExpression') {
      node.callee.name = labibaTransfrom.tranformNew(node.callee.name);
    }

    if (node.type === 'Identifier') {
      if (node.name === 'غير_محدد') {
        node.name = 'undefined';
      }

      if (node.name === 'ثم') {
        node.name = 'then';
      }

      if (node.name === 'لبيبة') {
        node.name = 'smalltalk';
      }

      if (node.name === 'اسأل') {
        node.name = 'prompt';
      }
    }
  }
}