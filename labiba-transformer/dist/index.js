"use strict";

var _asxParser = require("asx-parser");

var _generator = _interopRequireDefault(require("@babel/generator"));

var labibaTransfrom = _interopRequireWildcard(require("./transformer/transformer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var code = "\n// \u0627\u0633\u062A\u064A\u0631\u0627\u062F math from 'mith';\n// Start Of Program\n\u0645\u062A\u063A\u064A\u0631 \u0633\u0627\u0645\u062D=1, k=10;\nlet b=\u0633\u0627\u0645\u062D;\n\u0645\u062A\u063A\u064A\u0631 c=1000;\n\u062B\u0627\u0628\u062A kk=14;\n\u0627\u0630\u0627 (a==1) {\n    console.log(1);\n    \u062B\u0627\u0628\u062A d=1;\n} \u063A\u064A\u0631 {\n    //test\n    \u0645\u062A\u063A\u064A\u0631 sam = 12;\n}\n\n\u0627\u0630\u0627 (t==12) {\n    //hi\n}\n\u063A\u064A\u0631 { \n    //hi\n}\n\n\u062A\u0643\u0631\u0627\u0631 (i=1;i++;i<10) {\n    \u0645\u062A\u063A\u064A\u0631 s = 1;\n    \u062B\u0627\u0628\u062A aaa=s;\n}\n\n\u0637\u0627\u0644\u0645\u0627 (a==1) {\n    \u062B\u0627\u0628\u062A cc=12;\n    \u062A\u0643\u0631\u0627\u0631 (i=1;i++;i<10) {\n        \u0645\u062A\u063A\u064A\u0631 s = 1;\n        \u062B\u0627\u0628\u062A aaa=s;\n    }\n}\n\n\u0645\u0647\u0645\u0629 \u0631\u0627\u0645\u064A() {\n    //Test\n    \u0645\u062A\u063A\u064A\u0631 a=1, k=10;\n    \u0627\u0631\u062C\u0627\u0639 a;\n}\n\n\u0641\u0627\u0635\u0644 (a) {\n    \u062D\u0627\u0644\u0629 1:\n        console.log(1);\n        \u062E\u0631\u0648\u062C;\n        \u062D\u0627\u0644\u0629 2:\n        console.log(10);\n        \u062E\u0631\u0648\u062C;\n}\n\n\u062D\u0627\u0648\u0644 {\n    \u0645\u062A\u063A\u064A\u0631 a=1;\n  } \u0645\u0634\u0643\u0644\u0629(e) {\n    \u0645\u062A\u063A\u064A\u0631 a=e;\n   \n    \u062B\u0627\u0628\u062A t=1;\n  } \n  \u0627\u062E\u064A\u0631\u0627 {\n\n  }\n\n\u062B\u0627\u0628\u062A \u0633\u0627\u0645\u064A = \u0646\u0648\u0639 1\n\n\u0639\u0642\u064A\u0645 \u0645\u0647\u0645\u0629 samo() {\n    console.log(123);\n}\n\n\u0627\u0641\u0639\u0644 {\n    console.log(1)\n    \u0627\u0643\u0645\u0644;\n  } \u0637\u0627\u0644\u0645\u0627(1)\n\n  \u062A\u0643\u0631\u0627\u0631 (\u0645\u062A\u063A\u064A\u0631 i=1;i++;i<10) {\n    \u0645\u062A\u063A\u064A\u0631 s = 1;\n    \u062B\u0627\u0628\u062A aaa=s;\n}\n\n\u0635\u0646\u0641 a {\n    init() {\n    }\n}\n  \n\u0635\u0646\u0641 bb \u064A\u0631\u062B a {\n    init() {\n        \u0627\u0628\u064A.init();\n    }\n}\n\n\u0645\u062A\u063A\u064A\u0631 cc = \u062C\u062F\u064A\u062F a();\n\n\u0645\u062A\u063A\u064A\u0631 m = \u0631\u064A\u0627\u0636\u064A\u0627\u062A.\u0628\u0627\u064A;\n\n\u0645\u062A\u063A\u064A\u0631 timeout=\u0645\u0647\u0645\u0629() {\n    \u0645\u062A\u063A\u064A\u0631 c=1;\n\n    \u0645\u0647\u0645\u0629 cc() {\n        \u062B\u0627\u0628\u062A a=1;\n      }\n\n    \u0627\u0631\u062C\u0627\u0639 c;\n  };\n\n  \u062A\u0643\u0631\u0627\u0631(\u0645\u062A\u063A\u064A\u0631 sam = 1; sam++; sam < Math.PI) {\n      console.log(sam);\n  }\n\n  \u0627\u0630\u0627 (\u0631.\u0628\u0627\u064A === \u0631.\u062C\u064A\u0628(12)) {\n      console.log(Math.cos(2));\n  }\n/*\nEnd of the program\n*/\n";
var factorial = "\n\u0645\u0647\u0645\u0629 \u0641\u0627\u0643\u062A\u0648\u0631\u064A\u0627\u0644(\u0631\u0642\u0645) {\n    \u0627\u0631\u062C\u0627\u0639 (\u0631\u0642\u0645 != 1) \u061F \u0631\u0642\u0645 * \u0641\u0627\u0643\u062A\u0648\u0631\u064A\u0627\u0644(\u0631\u0642\u0645 -1) : 1\n    }\n    ";
var sam = "\n\n//@labiba\n\u0645\u062A\u063A\u064A\u0631 d = \u062C\u062F\u064A\u062F Date();\nd.\u0627\u0644\u0649_\u0646\u0635()\n";
var ast = (0, _asxParser.parse)(sam); //console.log(JSON.stringify(ast))
//console.log(ast.program.body);
//const nodes = ast.program.body;
//processAst(nodes);

processTransfrom(ast);

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
        node.callee.name = labibaTransfrom.transformGlobal(node.callee.name);
      }
    }

    if (node.type === 'MemberExpression') {
      var _member = labibaTransfrom.transformMember(node.object.name, node.property.name);

      node.object.name = _member.objectName;
      node.property.name = _member.propertyName;
    }
  }
}

function processAst(nodes) {
  nodes.forEach(function (node) {
    switch (node.type) {
      case 'VariableDeclaration':
        node.kind = declaration(node);
        processAst(node.declarations);
        break;

      case 'VariableDeclarator':
        if (node.init.body) {
          processAst(node.init.body.body);
        }

        break;

      case 'IfStatement':
        // if
        processAst(node.consequent.body);

        if (node.alternate) {
          // else
          processAst(node.alternate.body);
        }

        break;

      case 'ForStatement':
        processAst(node.body.body);

        if (node.init.type === 'VariableDeclaration') {
          node.init.kind = declaration(node.init);
        }

        break;

      case 'WhileStatement':
        processAst(node.body.body);
        break;

      case 'FunctionDeclaration':
        processAst(node.body.body);
        break;

      case 'FunctionExpression':
        processAst(node.body.body);
        break;

      case 'TryStatement':
        processAst(node.block.body);

        if (node.handler) {
          processAst(node.handler.body.body);
        }

        if (node.finalizer) {
          processAst(node.finalizer.body);
        }

        break;

      default:
        console.log('default');
        break;
    }
  });
}

var output = (0, _generator["default"])(ast, {
  sourceMaps: true
});
console.log(output.code);
/*
output = transform(output.code, {
    plugins: ["C:\\elec\\labiba\\babel-plugin-labiba-transformer"]
});
*/
//var ccccccc = transform(output.code)
//console.log('---------------------------')
//console.log(ccccccc)