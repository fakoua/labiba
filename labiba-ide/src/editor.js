const $ = require('jquery');
const la = require('labiba-transformer');

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
    let keywords = la.keywords();
    let res = [];
    keywords.forEach((k) => {
        res.push([new RegExp(k.keyword, 'gi'), "custom-keyword"])
    });
    return res;
}

function getCompletionItems() {
    let keywords = la.keywords();
    let withSnipets = keywords.filter((k) => {
        return k.snipet !== ''
    })
    console.log(withSnipets)
    let noSnipets = keywords.filter((k) => {
        return k.snipet === ''
    })
    let res = []

    keywords.forEach(k => {
        res.push({
            label: k.keyword,
            kind: monaco.languages.CompletionItemKind.Keyword, 
            insertText: k.keyword, 
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        })
    })

    withSnipets.forEach(k => {
        res.push({
            label: k.keyword,
            kind: monaco.languages.CompletionItemKind.Snippet, 
            insertText: k.snipet, 
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        })
    })
    
    return res
}

function setLayout() {
    let w = $(window).width() - 222;
    let h = $(window).height() - 90;
    $('#editor').width(w);
    $('#editor').height(h);
}

function initEditor() {
    const path = require('path');
    const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;
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


        monaco.languages.register({ id: 'la' });
        monaco.languages.setMonarchTokensProvider('la', {
            tokenizer: {
                root: getKeywords()
            }
        });
  
        // Define a new theme that contains only rules that match this language
        monaco.editor.defineTheme('la', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'custom-info', foreground: '808080' },
                { token: 'comment', foreground: 'ff0000', fontStyle: 'bold' },
                { token: 'custom-keyword', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'custom-date', foreground: '008800' },
                { token: 'sameh', foreground: 'FF0000' },
            ]
        });
        // Register a completion item provider for the new language
        monaco.languages.registerCompletionItemProvider('la', {
            triggerCharacters: ['.'],
            provideCompletionItems: function() {
                //console.log(arguments[0].getWordAtPosition({column:1, lineNumber:2}))
                var suggestions = [{
                    label: 'سامح',
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: 'سامح'
                }, {
                    label: 'مهمة',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: [
                        'مهمة ${1:اسم} () {',
                        '\t$0',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                }, {
                    label: 'اذا',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'اذا (${1:شرط}) {',
                        '\t$0',
                        '} غير {',
                        '\t',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'If-Else Statement'
                }, {
                    label: 'sameh',
                    kind: monaco.languages.CompletionItemKind.Field,
                    details: 'samhoun',
                    documentation: 'Sameh Fakoua'
                }, {
                    label: 'الى_نص',
                    kind: monaco.languages.CompletionItemKind.Field,
                    insertText: 'الى_نص()',
                    documentation: 'To String'
                }
                ];
                
                suggestions = getCompletionItems();

                console.log(suggestions)
                
                let triggerKind = arguments[2].triggerKind;
                let filtered = [];
  
                if (triggerKind === 1) {
                    //dot
                    let pos = arguments[1]
                    pos.column--;
                    let keyword = arguments[0].getWordAtPosition(pos);
                    console.log(keyword)
                    filtered = suggestions.filter((item) => {
                        return item.kind === monaco.languages.CompletionItemKind.Field;
                    });
                } else {
                    filtered = suggestions.filter((item) => {
                        return item.kind !== monaco.languages.CompletionItemKind.Field;
                    });
                }
                
  
                return { suggestions: filtered };
            }
        });

        editor = monaco.editor.create(document.getElementById('editor'), {
            value: [
                'مهمة سامو(a) {', 
                'console.log(a); console.log(sameh);',
                '}',
                'مهمة main() {',
                'سامو("hi");',
                'show()',
                '}',
                'مهمة show() { لبيبة.اسأل("Question", "How old are you?", "10").ثم((value) => { console.log(value); }).catch(() => { console.log("cancel"); }); }'
            ].join('\n'),
            automaticLayout: true,
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
