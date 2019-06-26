window.$ = require('jquery')
window.jQuery = window.$
const labiba = require('./labiba-lib') 
const split = require('split.js')

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
    const electron = require('electron').remote
    const dialog = electron.dialog
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
      const electron = require('electron').remote
      const dialog = electron.dialog
      let file = dialog.showSaveDialog({ filters: [{name: 'لبيبة', extensions: ['la']}]})
      let content = editor.getValue()
      fs.writeFileSync(file, content, 'utf-8')
    })

    $('#btnClose').click(function(e) {
      e.preventDefault();
      const remote = require('electron').remote
      let w = remote.getCurrentWindow()
      w.close()
    })

    $('div[data-file]').click(function(e) {
      e.preventDefault();
      let file = $(this).data('file')
      readExample(file)
    })
}

function readExample(example) {
  const fs = require('fs');
  const path = require('path');

  let fileName = path.join(__dirname, `static/examples/${example}.la`)
  
  fs.readFile(fileName, function (err, data) {
        if (err) {
          return console.error(err);
        }
        editor.setValue(data.toString())
      });
}