window.$ = require('jquery')
window.jQuery = window.$
const labiba = require('./labiba-lib') 
const split = require('split.js')
const about = require('about-window').default;
const path = require('path');
const remote = require('electron').remote

$(document).ready(function() {
  $('<script/>',{type:'text/javascript', src:'./static/theme/semantic.min.js'}).appendTo('body');
  $('<script/>',{type:'text/javascript', src:'editor.js'}).appendTo('body');
  pageLoad()
})

let isDrag = false;
let latestPos;
let latestWidth;

function afterEditorInit() {
  if (editor) {
    console.log(editor)
  } else {
    setTimeout(() => {
      afterEditorInit()
    }, 100);
  }
}

function pageLoad() {
  afterEditorInit()
  $(document).mousedown(function(e) {
    if (e.target.id === 'splitter') {
      isDrag = true;
      latestPos = e.pageX;
      latestWidth = $('#output').width()
    }
  })

  $(document).mousemove(function(e) {
    if (!isDrag) {return;}

    let newOutputWidth = parseInt(latestWidth + (e.pageX - latestPos))
    let w = parseInt($(window).width() - newOutputWidth - 10);
    $('#output').width(newOutputWidth);
    $('#editor').width(w);
    editor.layout()
  });

  $(document).mouseup(function() {
    isDrag = false;
  })

  $('.ui.dropdown').dropdown({
    action: 'select'
  });

  $('#btnRun').click(function() {
    const vm = require('vm');
    const la = require('labiba-transformer')
    
    let code = editor.getValue();
    code = `غير_متزامن مهمة runner(labiba) {
        let labibaConsole = labiba;
        لوحة.تفريغ();
        ${code}
        ;
        لوحة.اطبع("__________ النهاية __________")
      };
      runner(labiba);
    `
    code = la.transform(code);
    vm.runInThisContext(code, 'sam.js');
    //sandbox.main()
  })

  $('#btnOpen').click(function(e) {
    e.preventDefault();
    const fs = require("fs")
    const dialog = remote.dialog
    let file = dialog.showOpenDialog({ filters: [{name: 'لبيبة', extensions: ['la']}], properties: ['openFile'] })
    fs.readFile(file[0], function (err, data) {
        if (err) {
          return console.error(err);
        }
        editor.setValue(data.toString())
      });
    })

    $('#btnSaveAs').click(function(e) {
      e.preventDefault();
      const fs = require("fs")
      const dialog = remote.dialog
      let file = dialog.showSaveDialog({ filters: [{name: 'لبيبة', extensions: ['la']}]})
      let content = editor.getValue()
      fs.writeFileSync(file, content, 'utf-8')
    })

    $('#btnClose').click(function(e) {
      e.preventDefault();
      let w = remote.getCurrentWindow()
      w.close()
    })

    $('div[data-file]').click(function(e) {
      e.preventDefault();
      let file = $(this).data('file')
      readExample(file)
    })

    $('#btnAbout').click(function() {
      let w = remote.getCurrentWindow()
        about({
          icon_path: path.join(__dirname, 'static/images/icon.png'),
          copyright: 'Copyright (c) 2019 Sameh Fakoua',
          product_name: 'لبيبة',
          description: 'لغة البرمجة لبيبة باللغة العربية هي أو لغة برمجة متكاملة متوافقة مع جافاسكريبت 7',
          homepage: 'https://fakoua.github.io/labiba/',
          adjust_window_size: true,
          win_title: 'حول لبيبة',
          win_options: {
              parent: w,
              modal: true,
          },
          show_close_button: "Close"
      })
    });
}

function readExample(example) {
  const fs = require('fs');

  let fileName = path.join(__dirname, `static/examples/${example}.la`)
  
  fs.readFile(fileName, function (err, data) {
        if (err) {
          return console.error(err);
        }
        editor.setValue(data.toString())
      });
}