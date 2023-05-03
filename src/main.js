import "/src/assets/style.scss";

function grid() {
  const background = document.getElementById("background");
  const ctx = background.getContext("2d");
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";

  for (let i = 1; i < background.offsetWidth / 10; i++) {
    ctx.beginPath(); // Создаёт новый контур.
    ctx.moveTo(i * 10, 0); // Перемещает перо в точку с координатами x и y.
    ctx.lineTo(i * 10, background.offsetHeight);
    ctx.stroke();
    ctx.closePath(); // Закрывает контур.
  }

  for (let i = 0; i < background.offsetHeight / 10; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * 10);
    ctx.lineTo(background.offsetWidth, i * 10);
    ctx.stroke();
    ctx.closePath();
  }
}

function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
 
  // rect(ctx);
  // triangle(ctx);
  // face(ctx);
  // hook(ctx);
  // ellipse(ctx);

  // ctx.fill(new Path2D("M100 100 h 200 v 80 h -200 Z"))

  // barcode(ctx);

  // ctx.fillStyle = 'red'
  // ctx.fillStyle = getGradient(ctx);
  // ctx.fill(drawRoundedRect(150, 200, 300, 300, 5));

  // ctx.strokeStyle = 'rgb(55, 90, 33)'
  // ctx.scale(2, 2); // растяжение по ширине в 1.5 раза и сжатие по высоте в 1.3 раза
  // ctx.translate(100, 50); // смещение на 100 пикселей вправо и 50px вниз
  //  ctx.stroke(quadraticCurve());

  // ctx.fillStyle = getGradient(ctx)
  // ctx.scale(2, 2); // растяжение по ширине в 1.5 раза и сжатие по высоте в 1.3 раза
  // ctx.fill(bezierCurve());

  // ctx.font = "48px serif";
  // const text = "Привет!"
  // const textMeasure = ctx.measureText(text);
  // ctx.strokeRect(400, 400, textMeasure.width, -48);

  // // ctx.textAlign = "right";
  // ctx.fillText(text, 400, 400, 400)

  // shadow(ctx)

  // ctx.setLineDash([10, 20]);
}


function getGradient(ctx) {
  const point1 = { x: 100, y: 200 };
  const point2 = { x: 700, y: 200 };
  ctx.fillStyle = 'black'
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.stroke();
  ctx.closePath();

  const cg = ctx.createLinearGradient(point1.x, point1.y, point2.x, point2.y);
  // Вверху начинаем с голубого неба.
  cg.addColorStop(0, "#00BFFF");
  // В середине градиента голубой блекнет до белого.
  // cg.addColorStop(0.3, 'white');
  // Верхняя часть травы окрашена в зеленый.
  cg.addColorStop(1, "#55dd00");
  // В нижней части градиента трава блекнет до белого.
  // cg.addColorStop(1, 'white');

  return cg;
}

function rect(ctx) {
  /**
   * Рисование заполненного прямоугольника.
   *
   * void ctx.fillRect(x, y, width, height);
   */
  ctx.fillRect(10, 10, 250, 250);

  /**
   * Рисование прямоугольного контура.
   *
   * void ctx.strokeRect(x, y, width, height)
   */
  ctx.strokeRect(60, 60, 300, 300);

  /**
   * Очистка прямоугольной области, делая содержимое совершенно прозрачным
   *
   * void ctx.clearRect(x, y, width, height)
   */
  ctx.clearRect(15, 15, 40, 40);
}

function triangle(ctx) {
  ctx.beginPath();
  ctx.moveTo(500, 100);
  ctx.lineTo(700, 400);
  ctx.lineTo(200, 400);
  ctx.lineTo(500, 100);
  ctx.stroke();
  // ctx.fill();
  ctx.closePath();
}

function face(ctx) {
  ctx.beginPath();
  ctx.arc(100, 180, 50, 0, Math.PI * 2, true); // Внешняя окружность
  ctx.moveTo(140, 180);
  ctx.arc(100, 180, 40, 0, Math.PI, false); // рот (по часовой стрелке)
  ctx.moveTo(85, 165);
  ctx.arc(80, 165, 5, 0, Math.PI * 2, true); // Левый глаз
  ctx.moveTo(125, 165);
  ctx.arc(120, 165, 5, 0, Math.PI * 2, true); // Правый глаз
  ctx.stroke();
  ctx.closePath();
}

function ellipse(ctx) {
  ctx.beginPath();
  ctx.ellipse(400, 400, 100, 300, Math.PI / 2, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.closePath();
}

function hook (ctx) {
  target(ctx, 300, 300);
  target(ctx, 500, 350);
  target(ctx, 350, 550);

  ctx.beginPath();
  ctx.moveTo(300, 300);
  ctx.arcTo(500, 350, 350, 550, Math.PI * 15);
  ctx.stroke();
  ctx.closePath();
}

function target(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y - 50);
  ctx.lineTo(x, y + 50);
  ctx.stroke();
  ctx.moveTo(x - 50, y);
  ctx.lineTo(x + 50, y);
  ctx.stroke();
  ctx.closePath();
}

function barcode(ctx) {
  // ctx.setLineDash([3, 5]);

  for (let i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    // ctx.lineCap = "round"; // butt square
    ctx.beginPath();
    ctx.moveTo(400 + i * 14, 400);
    ctx.lineTo(400 + i * 14, 540);
    ctx.stroke();
  }
}

function drawRoundedRect(x, y, w, h, cr) {
  const _cr = Math.PI * cr;

  const ctx = new Path2D();
  ctx.moveTo(x + w / 2, y);
  ctx.arcTo(x + w, y, x + w, y + h, _cr);
  ctx.arcTo(x + w, y + h, x, y + h, _cr);
  ctx.arcTo(x, y + h, x, y, _cr);
  ctx.arcTo(x, y, x + w, y, _cr);

  return ctx;
}

function quadraticCurve() {
  const ctx = new Path2D();
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  return ctx;
}

function bezierCurve() {
  const ctx = new Path2D();
  ctx.moveTo(75, 40);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);

  return ctx;
}

function shadow(ctx) {
  ctx.shadowOffsetX = 25;
  ctx.shadowOffsetY = 25;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.75)";

  ctx.font = "40px Times New Roman";
  ctx.fillStyle = "Black";
  ctx.fillText("Sample String", 400, 400);
}

function translate(ctx) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}

function rotate(ctx) {
  ctx.save();
  // blue rect
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(30, 30, 100, 100);
  ctx.rotate((Math.PI / 180) * 25);
  // grey rect
  ctx.fillStyle = '#4D4E53';
  ctx.fillRect(30, 30, 100, 100);
  ctx.restore();
}

draw();
// grid();
