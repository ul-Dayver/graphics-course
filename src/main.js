import "/src/assets/style.scss";

function grid() {
  const background = document.getElementById("background");
  const ctx = background.getContext("2d");

  ctx.beginPath();   // Создаёт новый контур.
  ctx.moveTo(10, 0); // Перемещает перо в точку с координатами x и y.
  ctx.lineTo(10, background.offsetHeight);
  ctx.stroke();
  ctx.closePath() // Закрывает контур.
}

function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // ctx.fillStyle = "rgb(200,0,0)";
  // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";

  /**
   * Рисование заполненного прямоугольника.
   * 
   * void ctx.fillRect(x, y, width, height);
   */
  ctx.fillRect(10, 10, 50, 50);
  
  /**
   * Рисование прямоугольного контура.
   * 
   * void ctx.strokeRect(x, y, width, height)
   */
  ctx.strokeRect(20, 20, 50, 50);

  /**
   * Очистка прямоугольной области, делая содержимое совершенно прозрачным
   * 
   * void ctx.clearRect(x, y, width, height)
   */
  ctx.clearRect(15, 15, 40, 40);
  
}

draw();
grid();