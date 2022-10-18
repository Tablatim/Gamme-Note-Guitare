function draw(X, Y, T)
  {
    var canvas = document.getElementById('circle');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var R = 8;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = "red";
        ctx.arc(X, Y, R, 0, 2 * Math.PI, false)
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.fillText(T, X-R/2, Y+3.25)
        ctx.font='bold 8px Arial';
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
    }
}

function drawCircle(c, f, t) {
  if(f != 0) {
    x = 18+(27*(f-1))
    y = 30+(29*(c-1))
  } else {
    x = 7
    y = 30+(29.25*(c-1))
  }
  draw(x, y, t)
}
function sort(t){
  var e = document.getElementById(t.id);
  if(e.checked){
    check()
  } else {
    uncheck(e.value)
  }
}
let checkedcheckboxes = [];
function check() {
  checkedcheckboxes = [];
  const checkboxes = document.querySelectorAll('input[name="f"]:checked');
  checkboxes.forEach((checkbox) => {
    checkedcheckboxes.push(checkbox.value);
  });
  n()
}
function uncheck(v){
  index = checkedcheckboxes.indexOf(v)
  checkedcheckboxes.splice(index, 1)
  update()
}

function update() {
  var canvas = document.getElementById('circle');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d'); 
    ctx.clearRect(0, 0, 1000, 1000);
    n()
  }
}

function update2() {
  var canvas = document.getElementById('circle');
  var ctx = canvas.getContext('2d'); 
  ctx.clearRect(0, 0, 1000, 1000);

  const checkboxes = document.querySelectorAll('input[name="f"]');
  checkboxes.forEach(c => {
    if(c.checked) c.checked = false
  })
}

function n(){
  checkedcheckboxes.forEach((c) => {
    for (const [key, value] of Object.entries(notesOnBoard[c])) {
      drawCircle(key, value, c);
      if(value<=3) {
        drawCircle(key, value+12, c);
      }
    }
  });
}

function writeTune(){
  var h = document.getElementById("tunes");
  var tune = document.getElementById('tune-select');
  tune = getSelectedOption(tune).innerHTML
  var alt = document.getElementById('alt-select');
  if(getSelectedOption(alt).innerHTML == "") {alt = "♮"} else {alt = getSelectedOption(alt).innerHTML}
  var mode = document.getElementById('mode-select');
  if(getSelectedOption(mode).value == "") {mode = "M"} else {mode = getSelectedOption(mode).value}
  if(tune != "") {
    var temp = tune+alt+mode
    h.innerHTML = gamme_constructor(temp).join(",  ")
    update2()
    gamme_constructor(temp).forEach(n => {
      if(!Object.keys(notesOnBoard).includes(n)) {
        n = equ[n]
      }
      for (const [key, value] of Object.entries(notesOnBoard[n])) {
        drawCircle(key, value, n);
        if(value<=3) {
          drawCircle(key, value+12, n);
        }
        if(n.includes("♭")) {
          n = equ[n]
        }
        var g = document.getElementById(n);
        if(g == null) g = document.getElementById(equ[n]);
        g.checked = true
      }
    })
  } else {
    h.innerHTML = ""
    update2()
  }
  
}

notesOnBoard = {
  "C" : {
    6 : 8,
    5 : 3,
    4 : 10,
    3 : 5,
    2 : 1,
    1 : 8,
  },
  "C#" : {
    6 : 9,
    5 : 4,
    4 : 11,
    3 : 6,
    2 : 2,
    1 : 9,
  },
  "D" : {
    6 : 10,
    5 : 5,
    4 : 0,
    3 : 7,
    2 : 3,
    1 : 10,
  },
  "D#" : {
    6 : 11,
    5 : 6,
    4 : 1,
    3 : 8,
    2 : 4,
    1 : 11,
  },
  "E" : {
    6 : 0,
    5 : 7,
    4 : 2,
    3 : 9,
    2 : 5,
    1 : 0,
  },
  "E#" : {
    6 : 1,
    5 : 8,
    4 : 3,
    3 : 10,
    2 : 6,
    1 : 1,
  },
  "F" : {
    6 : 1,
    5 : 8,
    4 : 3,
    3 : 10,
    2 : 6,
    1 : 1,
  },
  "F#" : {
    6 : 2,
    5 : 9,
    4 : 4,
    3 : 11,
    2 : 7,
    1 : 2,
  },
  "G" : {
    6 : 3,
    5 : 10,
    4 : 5,
    3 : 0,
    2 : 8,
    1 : 3,
  },
  "G#" : {
    6 : 4,
    5 : 11,
    4 : 6,
    3 : 1,
    2 : 9,
    1 : 4,
  },
  "A" : {
    6 : 5,
    5 : 0,
    4 : 7,
    3 : 2,
    2 : 10,
    1 : 5,
  },
  "A#" : {
    6 : 6,
    5 : 1,
    4 : 8,
    3 : 3,
    2 : 11,
    1 : 6,
  },
  "B" : {
    6 : 7,
    5 : 2,
    4 : 9,
    3 : 4,
    2 : 0,
    1 : 7,
  },

  "C♭" : {
    6 : 7,
    5 : 2,
    4 : 9,
    3 : 4,
    2 : 0,
    1 : 7,
  },
  "D♭" : {
    6 : 9,
    5 : 4,
    4 : 11,
    3 : 6,
    2 : 2,
    1 : 9,
  },
  "E♭" : {
    6 : 11,
    5 : 6,
    4 : 1,
    3 : 8,
    2 : 4,
    1 : 11,
  },
  "F♭" : {
    6 : 0,
    5 : 7,
    4 : 2,
    3 : 9,
    2 : 5,
    1 : 0,
  },
  "G♭" : {
    6 : 2,
    5 : 9,
    4 : 4,
    3 : 11,
    2 : 7,
    1 : 2,
  },
  "A♭" : {
    6 : 4,
    5 : 11,
    4 : 6,
    3 : 1,
    2 : 9,
    1 : 4,
  },
  "B♭" : {
    6 : 6,
    5 : 1,
    4 : 8,
    3 : 3,
    2 : 11,
    1 : 6,
  },
}

equ = {
  "C" : "B#",
  "C#" : "D♭",
  "D♭" : "C#",
  "E♭" : "D#",
  "D#" : "E♭",
  "E" : "F♭",
  "F♭" : "E",
  "F" : "E#",
  "E#" : "F",
  "F#" : "G♭",
  "G♭" : "F#",
  "G#" : "A♭",
  "A♭" : "G#",
  "B♭" : "A#",
  "A#" : "B♭",
  "B" : "C♭",
  "C♭" : "B",
  "B#" : "C"
}

function getSelectedOption(sel) {
  var opt;
  for ( var i = 0, len = sel.options.length; i < len; i++ ) {
      opt = sel.options[i];
      if ( opt.selected === true ) {
          break;
      }
  }
  return opt;
}

all_notes = [
  "C♮B#", 
  "C#D♭", 
  "D♮", 
  "D#E♭", 
  "E♮F♭", 
  "E#F♮", 
  "F#G♭", 
  "G♮", 
  "G#A♭", 
  "A♮", 
  "A#B♭", 
  "B♮C♭"
]

mode = {
  "M":[2, 2, 1, 2, 2, 2],
  "m":[2, 1, 2, 2, 1, 2],
  "D":[2, 1, 2, 2, 2, 1],
  "P":[1, 2, 2, 2, 1, 2],
  "L":[2, 2, 2, 1, 2, 2],
  "X":[2, 2, 1, 2, 2, 1],
  "E":[2, 1, 2, 2, 1, 2],
  "O":[1, 2, 2, 1, 2, 2]
}

function mode_interval_to_mode(mode) {
  rMode = []
  for (let index = 0; index < mode.length; index++) {
    const element = mode[index];
    if(index == 0) {
      rMode.push(element)
    } else {
      rMode.push(rMode[index-1]+element)
    }
  }
  return rMode
}

function gamme_constructor(tune) {
  root = tune.substring(0, 2)
  alteration = root.slice(-1)
  tune_mode = mode_interval_to_mode(mode[tune.slice(-1)])
  indexOfRoot = 0
  for (let i = 0; i < all_notes.length; i++) {
    if(all_notes[i].includes(root)) {
      indexOfRoot = i
      break
    }
  }
  final_gamme = [root]
  tune_mode.forEach(shift => {
    new_note = all_notes[(indexOfRoot + shift) % all_notes.length]
    final_gamme.push(new_note)
  });
  for(i = 0; i<final_gamme.length; i++) {
    if(alteration == "#") {
      if(final_gamme[i].length > 2) {
        final_gamme[i] = final_gamme[i].substring(0, 2)
      }
    }
    else if(alteration == "♭") {
      if(final_gamme[i].length > 2) {
        final_gamme[i] = final_gamme[i].slice(-2)
      }
    } else {
      if(final_gamme[i].length > 2) {
        final_gamme[i] = final_gamme[i].slice(-2)
      }
    }
    if(final_gamme[i].includes("♮")) {
      final_gamme[i] = final_gamme[i][0]
    }
  };
  return final_gamme
}
