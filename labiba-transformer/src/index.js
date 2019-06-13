import {parse} from 'labiba-parser';
import generate from '@babel/generator';

import * as labibaTransfrom from './transformer/transformer';

exports.transform = function (labibaCode) {
    const ast = parse(labibaCode)
    processTransfrom(ast)
 
    let output = generate(ast, {
        sourceMaps: true,
        retainFunctionParens: true
    });
    return output.code
}

exports.language = function() {
    return labibaTransfrom.language();
}

function processTransfrom(node) {
    if (Array.isArray(node)) {
        node.forEach(subNode => {
            processNode(subNode)
            processTransfrom(subNode)
        })
    } else {
        processNode(node)
        for (const prop in node) {
            //console.log(`${prop}: ${node[prop]}`)
            let tp = typeof node[prop];
            if (tp === 'object') {
                //console.log(prop)
                processTransfrom(node[prop])
            }
        }
    }
     
}

function processNode(node) {
    if ( node && 'type' in node) {
        //console.log(node.type)
        if (node.type === 'VariableDeclaration') {
            node.kind = labibaTransfrom.declaration(node) 
        }

        if (node.type === 'CallExpression') {
            if (node.callee.object) {
                // Class.Property
                let member = labibaTransfrom.transformMember(node.callee.object.name, node.callee.property.name)
                node.callee.object.name=member.objectName
                node.callee.property.name=member.propertyName
            } else {
                // Global Functions
                console.log('Global Functions')
                node.callee.name=labibaTransfrom.transformGlobal(node.callee.name);
            }
            
        }

        if (node.type === 'MemberExpression') {
            let member = labibaTransfrom.transformMember(node.object.name, node.property.name)
            node.object.name=member.objectName
            node.property.name=member.propertyName
        }

        if (node.type === 'NewExpression') {
            node.callee.name = labibaTransfrom.tranformNew(node.callee.name);
        }

        if (node.type === 'Identifier') {
            if (node.name === 'غير_محدد') {
                node.name = 'undefined'
            }
            if (node.name === 'ثم') {
                node.name = 'then'
            }
        }
    }
}