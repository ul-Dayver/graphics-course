import "/src/assets/style.scss";

function start() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 600;

  const playerImage = new Image();
  playerImage.src = "player.png";

  let keyLeftPressed = false;
  let keyRightPressed = false;

  const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5,
    color: "green",
    draw: function () {
      ctx.fillStyle = this.color;
      // ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(playerImage, this.x, this.y);
    },
    update: function () {
      if (keyLeftPressed && this.x > 0) {
        this.x -= this.speed;
      } else if (keyRightPressed && this.x + this.width < canvas.width) {
        this.x += this.speed;
      }
    },
  };

  const enemy = {
    x: Math.random() * canvas.width,
    y: 0,
    width: 50,
    height: 50,
    speed: 3,
    color: "red",
    draw: function () {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function () {
      this.y += this.speed;

      if (this.y > canvas.height) {
        this.x = Math.random() * canvas.width;
        this.y = 0;
      }
    },
  };

  const bullet = {
    x: 0,
    y: 0,
    width: 10,
    height: 20,
    speed: 10,
    color: "white",
    draw: function () {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function () {
      this.y -= this.speed;
      if (this.y < 0) {
        this.active = false;
      }
    },
  };

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();

    enemy.update();
    enemy.draw();

    if (bullet.active) {
      bullet.update();
      bullet.draw();

      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        do {
          enemy.x = Math.random() * canvas.width;
        } while (enemy.x + enemy.width > canvas.width);

        enemy.y = 0;
        bullet.active = false;
      }
    }

    requestAnimationFrame(gameLoop);
  }

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37) {
      keyLeftPressed = true;
    } else if (event.keyCode === 39) {
      keyRightPressed = true;
    } else if (event.keyCode === 32) {
      // Spacebar pressed, fire a bullet

      if (!bullet.active) {
        bullet.active = true;
        bullet.x = player.x + player.width / 2 - bullet.width / 2;
        bullet.y = player.y;
      }
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.keyCode === 37) {
      keyLeftPressed = false;
    } else if (event.keyCode === 39) {
      keyRightPressed = false;
    }
  });

  gameLoop();
}

start();
