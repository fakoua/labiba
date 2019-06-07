import {parse} from 'asx-parser';
import generate from '@babel/generator';
import * as labibaTransfrom from './transformer/transformer';

const code = `
// استيراد math from 'mith';
// Start Of Program
متغير سامح=1, k=10;
let b=سامح;
متغير c=1000;
ثابت kk=14;
اذا (a==1) {
    console.log(1);
    ثابت d=1;
} غير {
    //test
    متغير sam = 12;
}

اذا (t==12) {
    //hi
}
غير { 
    //hi
}

تكرار (i=1;i++;i<10) {
    متغير s = 1;
    ثابت aaa=s;
}

طالما (a==1) {
    ثابت cc=12;
    تكرار (i=1;i++;i<10) {
        متغير s = 1;
        ثابت aaa=s;
    }
}

مهمة رامي() {
    //Test
    متغير a=1, k=10;
    ارجاع a;
}

فاصل (a) {
    حالة 1:
        console.log(1);
        خروج;
        حالة 2:
        console.log(10);
        خروج;
}

حاول {
    متغير a=1;
  } مشكلة(e) {
    متغير a=e;
   
    ثابت t=1;
  } 
  اخيرا {

  }

ثابت سامي = نوع 1

عقيم مهمة samo() {
    console.log(123);
}

افعل {
    console.log(1)
    اكمل;
  } طالما(1)

  تكرار (متغير i=1;i++;i<10) {
    متغير s = 1;
    ثابت aaa=s;
}

صنف a {
    init() {
    }
}
  
صنف bb يرث a {
    init() {
        ابي.init();
    }
}

متغير cc = جديد a();

متغير m = رياضيات.باي;

متغير timeout=مهمة() {
    متغير c=1;

    مهمة cc() {
        ثابت a=1;
      }

    ارجاع c;
  };

  تكرار(متغير sam = 1; sam++; sam < Math.PI) {
      console.log(sam);
  }

  اذا (ر.باي === ر.جيب(12)) {
      console.log(Math.cos(2));
  }
/*
End of the program
*/
`

let factorial = `
مهمة فاكتوريال(رقم) {
    ارجاع (رقم != 1) ؟ رقم * فاكتوريال(رقم -1) : 1
    }
    `

let sam = `

//@labiba
متغير d = جديد Date();
d.الى_نص()
`    
const ast = parse(sam)
//console.log(JSON.stringify(ast))
//console.log(ast.program.body);

//const nodes = ast.program.body;


//processAst(nodes);
processTransfrom(ast);


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
                node.callee.name=labibaTransfrom.transformGlobal(node.callee.name);
            }
            
        }

        if (node.type === 'MemberExpression') {
            let member = labibaTransfrom.transformMember(node.object.name, node.property.name)
            node.object.name=member.objectName
            node.property.name=member.propertyName
        }
    }
}

function processAst(nodes) {
    nodes.forEach(node => {
        switch (node.type) {
            case 'VariableDeclaration':
                node.kind = declaration(node) 
                processAst(node.declarations);      
                break;
            case 'VariableDeclarator':
                if (node.init.body) {
                    processAst(node.init.body.body)
                }
                break;
            case 'IfStatement':
                // if
                processAst(node.consequent.body)
                if (node.alternate) {
                    // else
                    processAst(node.alternate.body)
                }
                break;
            case 'ForStatement':
                    processAst(node.body.body)
                    if (node.init.type==='VariableDeclaration') {
                        node.init.kind = declaration(node.init)       
                    }
                break;
            case 'WhileStatement':
                    processAst(node.body.body)
                break;
            case 'FunctionDeclaration':
                    processAst(node.body.body)
                break;
            case 'FunctionExpression':
                    processAst(node.body.body)
                break;
            case 'TryStatement':
                processAst(node.block.body)
                if (node.handler) {
                    processAst(node.handler.body.body)
                }
                if (node.finalizer) {
                    processAst(node.finalizer.body)
                }
                break;
            default:
                console.log('default')
                break;
        }
    })
}


let output = generate(ast, {
    sourceMaps: true
});

console.log(output.code)

/*
output = transform(output.code, {
    plugins: ["C:\\elec\\labiba\\babel-plugin-labiba-transformer"]
});
*/

//var ccccccc = transform(output.code)
//console.log('---------------------------')

//console.log(ccccccc)