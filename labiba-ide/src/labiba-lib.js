const Dialogs = require('dialogs')
const Tone = require('tone')

module.exports.sound = function(tone, time) {
    var synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease(tone, time);
}

module.exports.ask = async function(msg) {
    const dialogs = Dialogs()

    return new Promise(function(resolve, reject) {
       dialogs.prompt(msg, "", function(res) {
           resolve(res)
       })
    })
}

module.exports.alert = async function(msg) {
    const dialogs = Dialogs()

    return new Promise(function(resolve, reject) {
        dialogs.alert(msg, function(p) {
            resolve('OK')
        })
    })
}

module.exports.askText = async function(msg) {
    let id = getRandomId();
    let inputId = `input-${id}`
    let buttonId = `button-${id}`
    let html = ` &gt; ${msg}: <input type='text' id='${inputId}' /><button id='${buttonId}'>أدخل</button>`
    appendHtml(html, 'input')
    
    let btn = document.getElementById(buttonId)
    let txt = document.getElementById(inputId)
    txt.focus()
    return new Promise(function(resolve, reject) {
        btn.addEventListener('click', function func_() {
          btn.removeEventListener('click', func_)
          let val = txt.value
          btn.setAttribute("disabled", "disabled")
          txt.setAttribute("disabled", "disabled")
          resolve(val)
        })
        txt.addEventListener("keydown", function keydown_(event) {
          if (event.keyCode === 13) {
            txt.removeEventListener('keydown', keydown_);
            let val = txt.value
            btn.setAttribute("disabled", "disabled")
            txt.setAttribute("disabled", "disabled")
            resolve(val)
          }
        });
    })
  }

  module.exports.clear = async function() {
    let output = document.getElementById('output');
    output.innerHTML = '';
  }

module.exports.askYesNo = async function(msg) {
    let id = getRandomId();
    let inputYesId = `button-yes-${id}`
    let buttonNoId = `button-no-${id}`
    let html = ` &gt; ${msg}: <button id='${inputYesId}'>نعم</button> <button id='${buttonNoId}'>كلا</button>`
    appendHtml(html, 'input')
    
    let btnYes = document.getElementById(inputYesId)
    let btnNo = document.getElementById(buttonNoId)
    return new Promise(function(resolve, reject) {
        btnYes.addEventListener('click', function func_() {
          btnYes.removeEventListener('click', func_)
          btnYes.setAttribute("disabled", "disabled")
          btnNo.setAttribute("disabled", "disabled")
          resolve(true)
      });    
      btnNo.addEventListener('click', function func_no() {
          btnNo.removeEventListener('click', func_no)
          btnYes.setAttribute("disabled", "disabled")
          btnNo.setAttribute("disabled", "disabled")
          resolve(false)
      });   
    })
  }

module.exports.print = function(msg) {
    appendText(msg, 'info')
}

module.exports.askMultiple = async function (msg, options) {
    let id = getRandomId();
    let inputId = `input-${id}`
    let buttonId = `button-${id}`
    let opts = ''
    options.forEach(function(value) {
      opts = `${opts}<option value='${value}'>${value}</option>`
    })
    let html = ` &gt; ${msg}: <select id='${inputId}' />${opts}</select> <button id='${buttonId}'>إختر</button>`
    appendHtml(html, 'input')
    
    let btn = document.getElementById(buttonId)
    let txt = document.getElementById(inputId)
    txt.focus()
    return new Promise(function(resolve, reject) {
        btn.addEventListener('click', function func_() {
          btn.removeEventListener('click', func_)
          let val = txt.value
          btn.setAttribute("disabled", "disabled")
          txt.setAttribute("disabled", "disabled")
          resolve(val)
      })    
    })
  }

function appendText(msg, cls) {
    appendHtml(" &gt; " + msg, cls)
}

function appendHtml(html, cls) {
  let output = document.getElementById('output');
  let node = document.createElement("DIV")
  node.className = cls
  node.innerHTML = html
  output.appendChild(node)
  output.scrollTop = output.scrollHeight
}

function getRandomId() {
    var number = Math.random() // 0.9394456857981651
    var id = number.toString(36).substr(2, 9); // 'xtis06h6'
    return id
  }