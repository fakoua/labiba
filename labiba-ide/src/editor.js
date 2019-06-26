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
function getKeywords() {
    let keywords = la.language().find(la => {
        return la.type === 'keyword'
    }).properties;

    let res = [];

    keywords.forEach((k) => {
        res.push(k.la)
    });
    res.push('لبيبة')
    res.push('لوحة')
    return res;
}
function getTokenizer() {
    let keywords = la.language().find(la => {
        return la.type === 'keyword'
    }).properties;

    let res = [];

    keywords.forEach((k) => {
        res.push([new RegExp(k.la), "custom-keyword"])
    });

    let classes  = la.language().filter(la => {
        return la.type === 'class'
    })

    classes.forEach((k) => {
        res.push([new RegExp(k.la), "custom-class"])
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
        res.push([new RegExp(k.la), "custom-field"])
    });

    //sorting
    res.push([/\/\/.*/, "custom-comment"])
    return res;
}

function getTokenizerV2() {
    let keywords = la.language().find(la => {
        return la.type === 'keyword'
    }).properties;

    let res = [];

    keywords.forEach((k) => {
        res.push(k.la)
    });

    let classes  = la.language().filter(la => {
        return la.type === 'class'
    })

    classes.forEach((k) => {
        res.push(k.la)
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
        res.push(k.la)
    });

    //sorting
    //res.push([/\/\/.*/, "custom-comment"])

    let reg = lo.join(res, '|');
    return new RegExp(reg)
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
            wordPattern1: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
            onEnterRules: [{
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                afterText: /^\s*\*\/$/,
                action: {
                    indentAction: monaco.languages.IndentAction.IndentOutdent,
                    appendText: " * "
                }
            }, {
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                action: {
                    indentAction: monaco.languages.IndentAction.None,
                    appendText: " * "
                }
            }, {
                beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
                action: {
                    indentAction: monaco.languages.IndentAction.None,
                    appendText: "* "
                }
            }, {
                beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
                action: {
                    indentAction: monaco.languages.IndentAction.None,
                    removeText: 1
                }
            }],
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
            operators: ["<=", ">=", "==", "!=", "===", "!==", "=>", "+", "-", "**", "*", "/", "%", "++", "--", "<<", "</", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "=", "+=", "-=", "*=", "**=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", "@"],
            symbols: /[=><!~؟:&|+\-*\/\^%]+/,
            bracketCounting: [
                [/\{/, 'delimiter.bracket', '@bracketCounting'],
                [/\}/, 'delimiter.bracket', '@pop'],
                { include: 'common' }
            ],
            digits:/\d+(_+\d+)*/,
            octaldigits: /[0-7]+(_+[0-7]+)*/,
            binarydigits: /[0-1]+(_+[0-1]+)*/,
            hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
            regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
            regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
            escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
            typeKeywords: ["any", "منطقي", "رقم", "كائن", "نص", "غير_معروف"],
            keywords: getKeywords(),
            tokenizer: {
                root: [
                    [/[{}]/, "delimiter.bracket"], {
                        include: "common"
                    }
                ],
                common: [
                    [getTokenizerV2(), {
                        cases: {
                            "@typeKeywords": "keyword",
                            "@keywords": "keyword",
                            "@default": "identifier"
                        }
                    }],
                    [/[A-Z][\w\$]*/, "type.identifier"], {
                        include: "@whitespace"
                    },
                    [/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/, {
                        token: "regexp",
                        bracket: "@open",
                        next: "@regexp"
                    }],
                    [/[()\[\]]/, "@brackets"],
                    [/!(?=([^=]|$))/, "delimiter"],
                    [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
                    [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
                    [/0[xX](@hexdigits)/, "number.hex"],
                    [/0[oO]?(@octaldigits)/, "number.octal"],
                    [/0[bB](@binarydigits)/, "number.binary"],
                    [/(@digits)/, "number"],
                    [/[;,.]/, "delimiter"],
                    [/"([^"\\]|\\.)*$/, "string.invalid"],
                    [/'([^'\\]|\\.)*$/, "string.invalid"],
                    [/"/, "string", "@string_double"],
                    [/'/, "string", "@string_single"],
                    [/`/, "string", "@string_backtick"]
                ],
                whitespace: [
                    [/[ \t\r\n]+/, ""],
                    [/\/\*\*(?!\/)/, "comment.doc", "@jsdoc"],
                    [/\/\*/, "comment", "@comment"],
                    [/\/\/.*$/, "comment"]
                ],
                comment: [
                    [/[^\/*]+/, "comment"],
                    [/\*\//, "comment", "@pop"],
                    [/[\/*]/, "comment"]
                ],
                jsdoc: [
                    [/[^\/*]+/, "comment.doc"],
                    [/\*\//, "comment.doc", "@pop"],
                    [/[\/*]/, "comment.doc"]
                ],
                regexp: [
                    [/(\{)(\d+(?:,\d*)?)(\})/, ["regexp.escape.control", "regexp.escape.control", "regexp.escape.control"]],
                    [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ["regexp.escape.control", {
                        token: "regexp.escape.control",
                        next: "@regexrange"
                    }]],
                    [/(\()(\?:|\?=|\?!)/, ["regexp.escape.control", "regexp.escape.control"]],
                    [/[()]/, "regexp.escape.control"],
                    [/@regexpctl/, "regexp.escape.control"],
                    [/[^\\\/]/, "regexp"],
                    [/@regexpesc/, "regexp.escape"],
                    [/\\\./, "regexp.invalid"],
                    [/(\/)([gimsuy]*)/, [{
                        token: "regexp",
                        bracket: "@close",
                        next: "@pop"
                    }, "keyword.other"]]
                ],
                regexrange: [
                    [/-/, "regexp.escape.control"],
                    [/\^/, "regexp.invalid"],
                    [/@regexpesc/, "regexp.escape"],
                    [/[^\]]/, "regexp"],
                    [/\]/, {
                        token: "regexp.escape.control",
                        next: "@pop",
                        bracket: "@close"
                    }]
                ],
                string_double: [
                    [/[^\\"]+/, "string"],
                    [/@escapes/, "string.escape"],
                    [/\\./, "string.escape.invalid"],
                    [/"/, "string", "@pop"]
                ],
                string_single: [
                    [/[^\\']+/, "string"],
                    [/@escapes/, "string.escape"],
                    [/\\./, "string.escape.invalid"],
                    [/'/, "string", "@pop"]
                ],
                string_backtick: [
                    [/\$\{/, {
                        token: "delimiter.bracket",
                        next: "@bracketCounting"
                    }],
                    [/[^\\`$]+/, "string"],
                    [/@escapes/, "string.escape"],
                    [/\\./, "string.escape.invalid"],
                    [/`/, "string", "@pop"]
                ],
                bracketCounting: [
                    [/\{/, "delimiter.bracket", "@bracketCounting"],
                    [/\}/, "delimiter.bracket", "@pop"], {
                        include: "common"
                    }
                ]
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
            fontSize: 16,
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
        let condition = editor.createContextKey('trueCondition', false);
        editor.addCommand(monaco.KeyCode.LeftArrow, function() {
            let pos = editor.getPosition();
            pos.column +=1;
            editor.setPosition(pos);
        }, 'trueCondition');

        editor.addCommand(monaco.KeyCode.RightArrow, function() {
            let pos = editor.getPosition();
            pos.column -=1;
            editor.setPosition(pos);
        }, 'trueCondition');

        condition.set(true);
    });
}
