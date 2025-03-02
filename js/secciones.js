(function () {
  const FILL = 0;        // const to indicate filltext render
  const STROKE = 1;
  var renderType = FILL; // used internal to set fill or stroke text
  const multiplyCurrentTransform = true; // if true Use current transform when rendering
  var measure = function (ctx, text, radius) {
    var textWidth = ctx.measureText(text).width; // get the width of all the text
    return {
      width: textWidth,
      angularWidth: (1 / radius) * textWidth,
      pixelAngularSize: 1 / radius
    };
  }
  var circleText = function (ctx, text, x, y, radius, start, end, forward) {
    var i, textWidth, pA, pAS, a, aw, wScale, aligned, dir, fontSize;
    if (text.trim() === "" || ctx.globalAlpha === 0) { // dont render empty string or transparent
      return;
    }
    if (isNaN(x) || isNaN(y) || isNaN(radius) || isNaN(start) || (end !== undefined && end !== null && isNaN(end))) { // 
      throw TypeError("circle text arguments requires a number for x,y, radius, start, and end.")
    }
    aligned = ctx.textAlign;        // save the current textAlign so that it can be restored at end
    dir = forward ? 1 : forward === false ? -1 : 1;  // set dir if not true or false set forward as true  
    pAS = 1 / radius;               // get the angular size of a pixel in radians
    textWidth = ctx.measureText(text).width; // get the width of all the text
    if (end !== undefined && end !== null) { // if end is supplied then fit text between start and end
      pA = ((end - start) / textWidth) * dir;
      wScale = (pA / pAS) * dir;
    } else {                 // if no end is supplied correct start and end for alignment
      // if forward is not given then swap top of circle text to read the correct direction
      if (forward === null || forward === undefined) {
        if (((start % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) > Math.PI) {
          dir = -1;
        }
      }
      pA = -pAS * dir;
      wScale = -1 * dir;
      switch (aligned) {
        case "center":       // if centered move around half width
          start -= (pA * textWidth) / 2;
          end = start + pA * textWidth;
          break;
        case "right":// intentionally falls through to case "end"
        case "end":
          end = start;
          start -= pA * textWidth;
          break;
        case "left":  // intentionally falls through to case "start"
        case "start":
          end = start + pA * textWidth;
      }
    }

    ctx.textAlign = "center";                     // align for rendering
    a = start;                                    // set the start angle
    for (var i = 0; i < text.length; i += 1) {    // for each character
      aw = ctx.measureText(text[i]).width * pA; // get the angular width of the text
      var xDx = Math.cos(a + aw / 2);           // get the yAxies vector from the center x,y out
      var xDy = Math.sin(a + aw / 2);
      if (multiplyCurrentTransform) { // transform multiplying current transform
        ctx.save();
        if (xDy < 0) { // is the text upside down. If it is flip it
          ctx.transform(-xDy * wScale, xDx * wScale, -xDx, -xDy, xDx * radius + x, xDy * radius + y);
        } else {
          ctx.transform(-xDy * wScale, xDx * wScale, xDx, xDy, xDx * radius + x, xDy * radius + y);
        }
      } else {
        if (xDy < 0) { // is the text upside down. If it is flip it
          ctx.setTransform(-xDy * wScale, xDx * wScale, -xDx, -xDy, xDx * radius + x, xDy * radius + y);
        } else {
          ctx.setTransform(-xDy * wScale, xDx * wScale, xDx, xDy, xDx * radius + x, xDy * radius + y);
        }
      }
      if (renderType === FILL) {
        ctx.fillText(text[i], 0, 0);    // render the character
      } else {
        ctx.strokeText(text[i], 0, 0);  // render the character
      }
      if (multiplyCurrentTransform) {  // restore current transform
        ctx.restore();
      }
      a += aw;                     // step to the next angle
    }
    // all done clean up.
    if (!multiplyCurrentTransform) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // restore the transform
    }
    ctx.textAlign = aligned;            // restore the text alignment
  }
  // define fill text
  var fillCircleText = function (text, x, y, radius, start, end, forward) {
    renderType = FILL;
    circleText(this, text, x, y, radius, start, end, forward);
  }
  // define stroke text
  var strokeCircleText = function (text, x, y, radius, start, end, forward) {
    renderType = STROKE;
    circleText(this, text, x, y, radius, start, end, forward);
  }
  // define measure text
  var measureCircleTextExt = function (text, radius) {
    return measure(this, text, radius);
  }
  // set the prototypes
  CanvasRenderingContext2D.prototype.fillCircleText = fillCircleText;
  CanvasRenderingContext2D.prototype.strokeCircleText = strokeCircleText;
  CanvasRenderingContext2D.prototype.measureCircleText = measureCircleTextExt;
  console.log("Ejecutado");
})();
let data = [];
(() => {
  data = JSON.parse(sessionStorage.getItem("data")) || [];
  if (data.length == 0) {
    data = [
	{ number: 1, text: "CONTRIBUCIONES", color: '#b2e2f2' },
    { number: 2, text: "OCIO", color: '#fdfd96' },
    { number: 3, text: "SALUD", color: '#acf7c3' },
    { number: 4, text: "FAMILIA", color: '#f47e8e' },
    { number: 5, text: "AMISTADES", color: '#ffe180' },
    { number: 6, text: "PAREJA", color: '#ff85d5' },
    { number: 7, text: "HOGAR", color: '#e79eff' },
    { number: 8, text: "CRECIMIENTO PERSONAL", color: '#d8f79a' },
    { number: 9, text: "EDUCACIÓN", color: '#6a9eda' },
    { number: 10, text: "ESPIRITUALIDAD", color: '#e4fbfb' },
    { number: 11, text: "ECONOMÍA", color: '#009d71' },
    { number: 12, text: "TRABAJO", color: '#d8af97' },
    ]
  }
  console.log(data);
})();

var CX = 300;
var CY = 300;
var SLICES_COUNT = 8;
var RADIUS = 240; //variamos la 
var MAX_DISTANCE = 0.035;
var MAXRAD = Math.PI * 2; // 360 º
var BORDER_COLOR = '#2E6EA6';
var cont = 1;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawPie(x, y, r, starts, ends, color, i, s) {
  context.beginPath();
  if (data[i].color) {
    context.fillStyle = data[i].color;
  } else
    context.fillStyle = color;
  context.moveTo(x, y);
  context.arc(x, y, r, starts, ends, 0);
  context.fill();
  context.stroke();
  context.fillStyle = "";

  context.font = "italic 40px 5px serif";
  context.textBaseline = "top";
  const categoria = data[i].text;
  var words = categoria.split(' ');

  if (starts < Math.PI && ends <= Math.PI) {
    for (var n = 0; n < words.length; n++) {
      const lenW = s / (Math.round(words[n].length));
      context.fillCircleText(words[n], x, y + ((n + 1) * 5), (r + 5) + ((n) * 17), ends - (lenW + Math.round(s / 16)), starts + (lenW + Math.floor(s / 16)), true);
    }
  }
  else if (starts < Math.PI && ends > Math.PI) {
    context.textBaseline = "bottom";
    for (var n = 0; n < words.length; n++) {
      const lenW = s / (Math.round(words[n].length));
      context.fillCircleText(words[n], x, y - ((n + 1) * 5), (r + 5) + ((n) * 17), ends - (lenW + Math.round(s / 16)));
    }
  }
  else {
    context.textBaseline = "bottom";
    for (var n = 0; n < words.length; n++) {
      const lenW = s / (Math.round(words[n].length));
      context.fillCircleText(words[(words.length - 1) - n], x, y - ((n + 1) * 5), (r + 5) + ((n) * 17), starts + (lenW + Math.round(s / 16)), ends - (lenW + Math.round(s / 16)), true);
    }
  }
}

// function drawScoresValues(scores){
//   let startPx;
//   let startPy;
//   let cont_slices = scores.length;
//   for (var index = 0; index < cont_slices; index++) {
//     var fromRadians = MAXRAD * (index / cont_slices);
//     startPx = (RADIUS * ((scores[index] / 10.5)+0.01)) * Math.cos(fromRadians) + CX;
//     startPy = (RADIUS * ((scores[index] / 10.5)+0.01)) * Math.sin(fromRadians) + CY;
//     context.beginPath();
//     context.fillStyle = '#FFFFFF';
//     context.arc(startPx,startPy,11,0,2*Math.PI);
//     context.fill();
//     context.lineWidth = 3;
//     context.stroke();
//     context.font = '22px sans-serif';
//     context.textAlign = 'center';
//     context.textBaseline = 'middle';
//     context.fillStyle = "#DC143C";
//     context.fillText(String(scores[index]), startPx, startPy);  
//   }
// }

function drawScoresValues(scores){
  let startPx;
  let startPy;
  let cont_slices = scores.length;
  for (var index = 0; index < cont_slices; index++) {
    if (scores[index] !== 0) {
      var fromRadians = MAXRAD * (index / cont_slices);
      startPx = (RADIUS * ((scores[index] / 10.5)+0.01)) * Math.cos(fromRadians) + CX;
      startPy = (RADIUS * ((scores[index] / 10.5)+0.01)) * Math.sin(fromRadians) + CY;
      context.beginPath();
      context.fillStyle = '#FFFFFF';
      context.arc(startPx,startPy,11,0,2*Math.PI);
      context.fill();
      context.lineWidth = 3;
      context.stroke();
      context.font = '22px sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = "#DC143C";
      context.fillText(String(scores[index]), startPx, startPy);
    }
  }
}

function drawScores(scores) {
  let cx = CX;
  let cy = CY;
  let startPx;
  let startPy;
  let cont_slices = scores.length;
  let saveFirstx,saveFirsty;
  for (var index = 0; index < cont_slices; index++) {
    var fromRadians = MAXRAD * (index / cont_slices);
    startPx = (RADIUS * ((scores[index] / 10.5)+0.01)) * Math.cos(fromRadians) + CX;
    startPy = (RADIUS * ((scores[index] / 10.5)+0.01)) * Math.sin(fromRadians) + CY;
    if (index === 0) {
      cx = startPx;
      saveFirstx=cx;
      cy = startPy;
      saveFirsty=cy;
    }
    context.beginPath();
    context.moveTo(cx, cy);
    context.strokeStyle = '#F2B22A';
    context.lineWidth = 5;
    context.lineTo(startPx, startPy);
    context.stroke();
    cx = startPx;
    cy = startPy;
    if(index===cont_slices-1)
    {
      context.lineTo(saveFirstx, saveFirsty);
      context.stroke();
    }
  }
  drawScoresValues(scores);

}

function drawSlices() {
  let cont_slices = data.length;
  if (cont <= 10) {
    for (var index = 0; index < cont_slices; index++) {
      var sliceSize = MAXRAD / cont_slices;
      var fromRadians = MAXRAD * (index / cont_slices);
      var toRadians = fromRadians + sliceSize;
      var halfRadians = fromRadians + (sliceSize / 2);
      var distance = RADIUS * MAX_DISTANCE;
      var cx = distance * Math.cos(halfRadians) + CX;
      var cy = distance * Math.sin(halfRadians) + CY;
      drawPie(cx, cy, RADIUS, fromRadians, toRadians, BORDER_COLOR, index, sliceSize, cont_slices);
      cont++;
    }
    RADIUS = RADIUS + 20;
  }
}
drawSlices();
// drawScores();