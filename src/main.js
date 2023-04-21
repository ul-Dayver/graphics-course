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

  rect(ctx);
  // face(ctx);
  
  // ctx.fillStyle = 'red'
  // ctx.fill(drawRoundedRect(400, 400, 100, 100, 5));
  
  // ctx.strokeStyle = 'rgb(55, 90, 33)'
  // ctx.scale(2, 2); // растяжение по ширине в 1.5 раза и сжатие по высоте в 1.3 раза
  // ctx.translate(100, 50); // смещение на 100 пикселей вправо и 50px вниз
  // ctx.stroke(quadraticCurve());
  

  // ctx.fillStyle = getGradient(ctx)
  // ctx.scale(2, 2); // растяжение по ширине в 1.5 раза и сжатие по высоте в 1.3 раза
  // ctx.fill(bezierCurve());
  
}

function getGradient(ctx) {
  const cg = ctx.createLinearGradient(0, 0, 0, 100);
  // Вверху начинаем с голубого неба.
  cg.addColorStop(0, '#00BFFF');
  // В середине градиента голубой блекнет до белого.
  cg.addColorStop(0.5, 'white');
  // Верхняя часть травы окрашена в зеленый.
  cg.addColorStop(0.5, '#55dd00');
  // В нижней части градиента трава блекнет до белого.
  cg.addColorStop(1, 'white');

  return cg
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
}

function barcode(ctx) {
  for (let i = 0; i < 10; i++){
    ctx.lineWidth = 1+i;
    ctx.beginPath();
    ctx.moveTo(5+i*14,5);
    ctx.lineTo(5+i*14,140);
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
  return ctx
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
  
  return ctx
}

draw();
// grid();
