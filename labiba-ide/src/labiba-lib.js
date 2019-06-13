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