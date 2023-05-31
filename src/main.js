import "/src/assets/style.scss";

function draw() {
  // const viewData = document.getElementById("view-data");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  loadImage(ctx, "0.jpg");
  // state(ctx);
  // pixelManipulation(ctx);
  // animationExample(ctx)
}

draw();

function loadImage(ctx, src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);

    // ctx.drawImage(img, 250, 100, 200, 300, 0, 0, 200, 300);
    // transformation(ctx, img);
  };
}

function state(ctx) {
  ctx.fillRect(0, 0, 150, 150); // рисуем прямоугольник с настройками по умолчанию
  ctx.save(); // сохраняем состояние

  ctx.fillStyle = "#09F"; // вносим изменения в настройки
  ctx.fillRect(15, 15, 120, 120); // рисуем прямоугольник с новыми настройками
  ctx.save(); // сохраняем состояние

  ctx.fillStyle = "#FFF"; // вносим изменения в настройки
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // рисуем прямоугольник с новыми настройками

  ctx.restore(); // возвращаемся к предыдущим настройкам
  ctx.fillRect(45, 45, 60, 60); // рисуем прямоугольник с восстановленными настройками

  ctx.restore(); // возвращаемся к начальным настройкам
  ctx.fillRect(60, 60, 30, 30); // рисуем прямоугольник с изначальными настройками
}

/**
 * Этот код рисует красный прямоугольник на холсте,
 * получает пиксельные данные для прямоугольника с помощью getImageData
 * , а затем перебирает каждый пиксель в массиве данных и инвертирует его цвет.
 * Наконец, измененные пиксельные данные помещаются обратно на холст с помощью putImageData.
 * Это приводит к инвертированной цветовой версии исходного красного прямоугольника.
 */
function pixelManipulation(ctx) {
  // Draw a red rectangle on the canvas
  ctx.fillStyle = "red";
  ctx.fillRect(200, 200, 200, 200);

  // Get the pixel data for the rectangle
  const imageData = ctx.getImageData(200, 200, 200, 200);
  const data = imageData.data;

  // Loop through each pixel and invert its color
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // Red
    data[i + 1] = 255 - data[i + 1]; // Green
    data[i + 2] = 255 - data[i + 2]; // Blue
  }

  // Put the modified pixel data back onto the canvas
  ctx.putImageData(imageData, 200, 200);

  ctx.font = "20px serif";
  const text = `${imageData.width} x ${imageData.height}`;
  const textMeasure = ctx.measureText(text);
  ctx.fillText(text, 250, 300, textMeasure.width);
}

function transformation(ctx, img) {
  // Save the current canvas state before applying transformation
  ctx.save();

  ctx.translate(100, 100);

  // ctx.scale(0.5, 0.5);

  // Повернуть на 45 градусов по часовой стрелке
  // ctx.rotate(Math.PI / 4);

  ctx.drawImage(img, 0, 0);
  // ctx.drawImage(img, 250, 100, 200, 300, 0, 0, 200, 300);

  // Restore the saved canvas state (undo the transformation)
  ctx.restore();
}

/**
 * Анимация прямоугольной фигуры, перемещающейся горизонтально по холсту.
 */
function animationExample(ctx) {
  let x = 0;
  const _animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, 0, 50, 50);
    x += 1;
    if (x > canvas.width) {
      x = 0;
    }
    requestAnimationFrame(_animation);
  };
  _animation();
}
