var synth = new Tone.PolySynth().toMaster();
var data = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
var html = '';

for (var octave = 0; octave < 5; octave++) { // 옥타브 범위를 6단계로 수정
    for (var i = 0; i < data.length; i++) {
        var note = data[i];
        var hasSharp = (['E', 'B'].indexOf(note) == -1);

        html += `<div class='whitenote' onmousedown='noteDown(this, false)' onmouseup='noteUp(this,false)' onmouseleave='noteUp(this,false)' data-note='${note + (octave+1)}'>`; // 옥타브 값을 octave+1로 수정

        if (hasSharp) {
            html += `<div class='blacknote' onmousedown='noteDown(this, true)' onmouseup='noteUp(this, true)' onmouseleave='noteUp(this,true)' data-note='${note + '#' + (octave+1)}'></div>`; // 옥타브 값을 octave+1로 수정
        }

        html += `</div>`;
    }
}

// Adding the final C note
html += `<div class='whitenote' onmousedown='noteDown(this, false)' onmouseup='noteUp(this,false)' onmouseleave='noteUp(this,false)' data-note='C7'></div>`; // 옥타브 값을 7단계로 수정

document.getElementById('container').innerHTML = html;

function noteUp(elem, isSharp) {
    elem.style.background = isSharp ? '#777' : 'white';
}

function noteDown(elem, isSharp) {
    var note = elem.dataset.note;
    elem.style.background = isSharp ? 'black' : '#ccc';
    synth.triggerAttackRelease(note, "16n");
    event.stopPropagation();
}