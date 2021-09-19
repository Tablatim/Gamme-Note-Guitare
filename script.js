function draw(X, Y, T)
  {
    var canvas = document.getElementById('circle');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d'); 
        // var X = 22; //150 75
        // var Y = 25.5;
        var R = 8;
        ctx.beginPath();
        ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
        ctx.fillText(T, X-3.5, Y+3.25)
        ctx.lineWidth = 3;
        ctx.fillStyle = "#FF0000";
        ctx.font='bold 8px Arial';
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
    }
}
function drawCircles() {
  for(y=27; y<27+(24*6); y+=24){
    for(x=22; x<22+(26.25*15); x+=26.25){
      draw(x, y)
    }
  }
}
function drawCircle(c, f, t) {
  if(f != 0) {
    x = 22+(26.25*(f-1))
    y = 27+(24*(c-1))
  } else {
    x = 11
    y = 27+(24*(c-1))
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
    for (const [key, value] of Object.entries(a[c])) {
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
  if(getSelectedOption(mode).innerHTML == "") {mode = "M"} else {mode = getSelectedOption(mode).innerHTML}
  if(tune != "") {
    var temp = tune+alt+mode
    h.innerHTML = b[temp].join(",  ").replace("true, ", "").replace("false, ", "")
    update2()
    b[temp].forEach(n => {
      for (const [key, value] of Object.entries(a[n])) {
        drawCircle(key, value, n);
        if(value<=3) {
          drawCircle(key, value+12, n);
        }
        if(n.includes("♭")) {
          n = equ[n]
        }
        var g = document.getElementById(n);
        g.checked = true
      }
    })
  } else {
    h.innerHTML = ""
    update2()
  }
  
}

a = {
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

b = {
  "C♮M" : ["C", "D", "E", "F", "G", "A", "B"],
  "D♮M" : ["C#", "D", "E", "F#", "G", "A", "B"],
  "E♮M" : ["C#", "D#", "E", "F#", "G#", "A", "B"],
  "F♮M" : ["C", "D", "E", "F", "G", "A", "A#"],
  "G♮M" : ["C", "D", "E", "F#", "G", "A", "B"],
  "A♮M" : ["C#", "D", "E", "F#", "G#", "A", "B"],
  "B♮M" : ["C#", "D#", "E", "F#", "G#", "A#", "B"],

  "C♮m" : ["C", "D", "D#", "F", "G", "G#", "A#"],
  "D♮m" : ["C", "D", "E", "F", "G", "A", "A#"],
  "E♮m" : ["C", "D", "E", "F#", "G", "A", "B"],
  "F♮m" : ["C", "C#", "D#", "F", "G", "G#", "A#"],
  "G♮m" : ["C", "D", "D#", "F", "G", "A", "A#"],
  "A♮m" : ["C", "D", "E", "F", "G", "A", "B"],
  "B♮m" : ["C#", "D", "E", "F#", "G", "A", "B"],

  "C♭M" : ["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭"],
  "D♭M" : ["C", "D♭", "E♭", "F", "G♭", "A♭", "B♭"],
  "E♭M" : ["C", "D", "E♭", "F", "G", "A♭", "B♭"],
  "F♭M" : ["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "A"],
  "G♭M" : ["C♭", "D♭", "E♭", "F", "G♭", "A♭", "B♭"],
  "A♭M" : ["C", "D♭", "E♭", "F", "G", "A♭", "B♭"],
  "B♭M" : ["C", "D", "E♭", "F", "G", "A", "B♭"],

  "C♭m" : ["C♭", "D♭", "D", "F♭", "G♭", "G", "A"],
  "D♭m" : ["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "A"],
  "E♭m" : ["C♭", "D♭", "E♭", "F", "G♭", "A♭", "B♭"],
  "F♭m" : ["C♭", "C", "D", "F♭", "G♭", "G", "A"],
  "G♭m" : ["C♭", "D♭", "D", "F♭", "G♭", "A♭", "A"],
  "A♭m" : ["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭"],
  "B♭m" : ["C", "D♭", "E♭", "F", "G♭", "A♭", "B♭"],

  "C#M" : ["C#", "D#", "F", "F#", "G#", "A#", "C"],
  "D#M" : ["D", "D#", "F", "G", "G#", "A#", "C"],
  "E#M" : ["D", "E", "F", "G", "A", "A#", "C"],
  "F#M" : ["C#", "D#", "F", "F#", "G#", "A#", "B"],
  "G#M" : ["C#", "D#", "F", "G", "G#", "A#", "C"],
  "A#M" : ["D", "D#", "F", "G", "A", "A#", "C"],
  "B#M" : ["D", "E", "F", "G", "A", "B", "C"],

  "C#m" : ["C#", "D#", "E", "F#", "G#", "A", "B"],
  "D#m" : ["C#", "D#", "F", "F#", "G#", "A#", "B"],
  "E#m" : ["C#", "D#", "F", "G", "G#", "A#", "C"],
  "F#m" : ["C#", "D", "E", "F#", "G#", "A", "B"],
  "G#m" : ["C#", "D#", "E", "F#", "G#", "A#", "B"],
  "A#m" : ["C#", "D#", "F", "F#", "G#", "A#", "C"],
  "B#m" : ["D", "D#", "F", "G", "G#", "A#", "C"],
}

ordre = ["C", "D", "E", "F", "G", "A", "B", "C"]

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