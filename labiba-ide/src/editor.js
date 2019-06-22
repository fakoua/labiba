const la = require('labiba-transformer');
const lo = require('lodash');

let editor = null;

$(document).ready(function() {
    setLayout();
    initEditor();
});

$(window).resize(function() {
    setLayout();
});

///

function getTokenizer() {
    let keywords = la.language().find(la => {
        return la.type === 'keyword'
    }).properties;

    let res = [];

    keywords.forEach((k) => {
        res.push([new RegExp(k.la, 'gi'), "custom-keyword"])
    });

    let classes  = la.language().filter(la => {
        return la.type === 'class'
    })

    classes.forEach((k) => {
        res.push([new RegExp(k.la, 'gi'), "custom-class"])
    });

    let fields = [];
    let all = la.language()
    all.forEach(la => {
        la.properties.forEach(prop => {
            fields.push(prop)
        })
    })

    fields = lo.uniqBy(fields, 'js');

    fields = lo.sortBy(fields, [function(o) {
        return o.la.length
    }]).reverse()

    fields.forEach((k) => {
        res.push([new RegExp(k.la, 'gi'), "custom-field"])
    });

    //sorting
    res.push([/\/\/.*/, "custom-comment"])
    return res;
}

function getCompletionItems() {
    let keywords = la.language().find(la => {
        return la.type === 'keyword'
    }).properties;

    let withSnippets = keywords.filter((k) => {
        return k.snippet !== ''
    })

    let res = []

    keywords.forEach(k => {
        res.push({
            label: k.la,
            kind: monaco.languages.CompletionItemKind.Keyword, 
            insertText: k.la, 
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        })
    })

    withSnippets.forEach(k => {
        res.push({
            label: k.la,
            kind: monaco.languages.CompletionItemKind.Snippet, 
            insertText: k.snippet, 
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        })
        
    })
    
    let globals = la.language().find(la => {
        return la.type === 'global'
    }).properties;

    globals.forEach(k => {
        res.push({
            label: k.la,
            kind: monaco.languages.CompletionItemKind.Function, 
            insertText: k.snippet, 
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        })
    })

    let classes = la.language().filter(la => {
        return la.type === 'class'
    })

    classes.forEach(k => {
        res.push({
            label: k.la,
            kind: monaco.languages.CompletionItemKind.Function, 
            insertText: k.snippet, 
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        })
    })

    return res
}


// After dot
function getCompletionFields(keyword) {
    
    let allFields = la.language().filter(f => {
        return f.type === 'class'
    })

    let classFields = allFields.find(f => {
        return f.la === keyword
    })

    let result = []
    if (classFields) {
        result = classFields.properties
    } else {
        allFields.forEach(f => {
            f.properties.forEach(prop => {
                result.push(prop)
            })
        })
        result = lo.uniqBy(result, 'la')
    }

    //wrap into completion item
    let rtnVal = [];
    result.forEach(r => {
        rtnVal.push({
            label: r.la,
            kind: monaco.languages.CompletionItemKind.Field, 
            insertText: r.snippet, 
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        })
    })
    return rtnVal
}

function setLayout() {
    let outputWidth = 350;
    let splitterWidth = 10;
    let w = $(window).width() - outputWidth - splitterWidth;
    let h = $(window).height() - 120;
    $('#editor').width(w);
    $('#editor').height(h);
    $('#output').height(h); //-20 due to padding
    $('#splitter').height(h);
    $('#output').width(outputWidth);
    if (editor) {
        editor.layout()
    }
}

function initEditor() {
    const path = require('path');
    const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    //const amdDefine = amdLoader.require.define;
    function uriFromPath(_path) {
        var pathName = path.resolve(_path).replace(/\\/g, '/');
        if (pathName.length > 0 && pathName.charAt(0) !== '/') {
            pathName = '/' + pathName;
        }
        return encodeURI('file://' + pathName);
    }
    amdRequire.config({
        baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
    });
    // workaround monaco-css not understanding the environment
    self.module = undefined;


    
    amdRequire(['vs/editor/editor.main'], function() {
        monaco.languages.register(
          {
            id: 'la'
          });

          monaco.languages.setLanguageConfiguration('la', {
            wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
            autoClosingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"', notIn: ['string'] },
                { open: '\'', close: '\'', notIn: ['string', 'comment'] },
                { open: '`', close: '`', notIn: ['string', 'comment'] },
                { open: "/**", close: " */", notIn: ["string"] }
            ],
            folding: {
                markers: {
                    start: new RegExp("^\\s*//\\s*#?region\\b"),
                    end: new RegExp("^\\s*//\\s*#?endregion\\b")
                }
            },
            brackets: [
                ['{', '}'],
                ['[', ']'],
                ['(', ')']
            ],
            comments: {
                lineComment: '//',
                blockComment: ['/*', '*/']
            }
          });

        monaco.languages.setMonarchTokensProvider('la', {
            bracketCounting: [
                [/\{/, 'delimiter.bracket', '@bracketCounting'],
                [/\}/, 'delimiter.bracket', '@pop'],
                { include: 'common' }
            ],
            tokenizer: {
                root: getTokenizer()
            }
        });
  
        // Define a new theme that contains only rules that match this language
        monaco.editor.defineTheme('la', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'custom-class', foreground: '003184', fontStyle: 'bold' },
                { token: 'custom-comment', foreground: '008000' },
                { token: 'custom-keyword', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'custom-string', foreground: 'A31515' },
                { token: 'custom-field', foreground: 'A31515' },
            ]
        });
        // Register a completion item provider for the new language
        monaco.languages.registerCompletionItemProvider('la', {
            triggerCharacters: ['.'],
            provideCompletionItems: function() {
                var suggestions = getCompletionItems();
               
                let triggerKind = arguments[2].triggerKind;
                let filtered = [];
  
                if (triggerKind === 1) {
                    //dot
                    let pos = arguments[1]
                    pos.column--;
                    let keyword = arguments[0].getWordAtPosition(pos);
                    filtered = getCompletionFields(keyword.word)
                    //console.log(filtered)
                } else {
                    filtered = suggestions.filter((item) => {
                        return item.kind !== monaco.languages.CompletionItemKind.Field;
                    });
                }
    
                return { suggestions: filtered };
            }
        });

        editor = monaco.editor.create(document.getElementById('editor'), {
            value: `//@لبيبة
ثابت جملة = "مرحبا بك في لبيبة"
انتظر لبيبة.انذار(جملة)
            `,
            automaticLayout: false,
            language: 'la',
            theme: 'la',
            fontSize: 14,
            fontFamily: "Tahoma",
            lineNumbers: "on",
            smoothScrolling: true,
            scrollbar: {
                useShadows: true,
                verticalHasArrows: true,
                side: "left"
            },
            minimap: {
                enabled: false,
                side: "left"
            }
        });
    });
}
