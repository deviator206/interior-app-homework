
import CanvasButton from './CanvasButton';
var width = window.innerWidth;
var height = window.innerHeight;

const canvasElements = [];
let drawHorizontal = false;
let drawVertical = false;
let initiateMouseDown = false;
let initiateDragging = false;
let mouseY = 0;
let mouseX = 0;
window.onload = () => {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  var painting = document.getElementById('container');
  var paint_style = getComputedStyle(painting);
  canvas.width = parseInt(paint_style.getPropertyValue('width'));
  canvas.height = parseInt(paint_style.getPropertyValue('height'));

  let canvasBtnInstance;

  var mouse = { x: 0, y: 0 };
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#00CC99';







  const onMouseMove = function (e) {
    if (initiateDragging) {
      mouse.x = ((e.touches) ? e.touches[0].pageX : e.pageX) - this.offsetLeft;
      mouse.y = ((e.touches) ? e.touches[0].pageY : e.pageY) - this.offsetTop;
    } else if (drawHorizontal) {
      mouse.y = mouseY;
      mouse.x = ((e.touches) ? e.touches[0].pageX : e.pageX) - this.offsetLeft;
    } else if (drawVertical) {
      mouse.y = ((e.touches) ? e.touches[0].pageY : e.pageY) - this.offsetTop;
      mouse.x = mouseX;
    }
    // onPaint();
  }
  const onMouseOut = function (e) {
    initiateMouseDown = false;
    drawHorizontal = false;
    drawVertical = false;
  }

  const onMouseUp = function () {
    initiateMouseDown = false;
    canvas.removeEventListener('mousemove', onPaint, false);
    canvas.removeEventListener("touchmove", onPaint, false);
  }

  const onMouseDown = function (e) {
    if (!initiateMouseDown) {
      mouseX = -1;
      mouseY = -1;
      initiateMouseDown = true;
      if (drawHorizontal) {
        mouseY = ((e.touches) ? e.touches[0].pageY : e.pageY) - this.offsetTop;
        mouse.x = ((e.touches) ? e.touches[0].pageX : e.pageX) - this.offsetLeft;
      } else if (drawVertical) {
        mouseX = ((e.touches) ? e.touches[0].pageX : e.pageX) - this.offsetLeft;
        mouse.y = ((e.touches) ? e.touches[0].pageY : e.pageY) - this.offsetTop;
      }

    }
    ctx.beginPath();
    ctx.moveTo((mouseX !== -1) ? mouseX : mouse.x, (mouseY !== -1) ? mouseY : mouse.y);
    if (e.touches && e.touches[0]) {
      canvas.addEventListener("touchmove", onPaint, false);
    } else {
      canvas.addEventListener('mousemove', onPaint, false);
    }
  }

  var onPaint = function () {
    if (initiateDragging) {
      canvasBtnInstance.render(mouse.x, mouse.y)
    } else if (drawHorizontal) {
      ctx.lineTo(mouse.x, mouseY);
    } else if (drawVertical) {
      ctx.lineTo(mouseX, mouse.y);
    }
    ctx.stroke();
  }

  document.getElementById("vertical_btn").onclick = function () {
    initiateDragging = false;
    initiateMouseDown = false;
    drawHorizontal = false;
    drawVertical = true;
  }
  document.getElementById("horizontal_btn").onclick = function () {
    initiateDragging = false;
    initiateMouseDown = false;
    drawHorizontal = true;
    drawVertical = false;
  }

  document.getElementById("drag_img_btn").onclick = function () {
    initiateMouseDown = false;
    drawHorizontal = false;
    drawVertical = false;
    initiateDragging = true
    canvasBtnInstance = new CanvasButton(ctx, canvas);
  }


  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);

  canvas.addEventListener("touchstart", onMouseDown, false);
  canvas.addEventListener("touchend", onMouseUp, false);
  canvas.addEventListener("touchcancel", onMouseUp, false);
  canvas.addEventListener("touchmove", onMouseMove, false);

}
