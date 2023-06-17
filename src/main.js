import "/src/assets/style.scss";

draw3d();
function draw3d() {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  window.onresize = () => {
    gl && gl.viewport(0, 0, canvas.width, canvas.height);
  };

  Promise.all([
    fetch("/src/shader/vertex.glsl").then((response) => response.text()),
    fetch("/src/shader/fragment.glsl").then((response) => response.text()),
  ]).then((shaders) => {
    const [vertex, fragment] = shaders;

    // Создаем программу и связываем ее с шейдерами
    const program = createProgram(gl, vertex, fragment);

    /*
      Получение ссылки на атрибут (и ссылки на uniform-переменную)
      следует выполнять во время инициализации, но не во время цикла отрисовки.
    */
    const positionAttributeLocation = gl.getAttribLocation(program, "position");

    /* 
      Атрибуты получают данные от буферов, поэтому нам нужно создать буфер
      и наполнить его данными
    */
    setupBuffer(gl, [-0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5]);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    function render() {
      // Используем программу
      gl.useProgram(program);

      /*
        Теперь нужно сказать WebGL, как извлечь данные из буфера,
        который мы настроили ранее, и передать их в атрибут шейдера.
        Для начала необходимо включить атрибут
      */
      gl.enableVertexAttribArray(positionAttributeLocation);

      // Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2, // size -  2 компоненты на итерацию
        gl.FLOAT, // type - наши данные - 32-битные числа с плавающей точкой
        false, // normalize - не нормализовать целочисленные значения данных в определенный диапазон при приведении к типу с плавающей запятой
        0, // stride - 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
        0 // offset - начинать с начала буфера
      );

      gl.drawArrays(
        gl.LINES, // primitiveType
        0, // offset
        4 // count
      );
    }

    render();
  });
}

function createProgram(gl, vertex, fragment) {
  const program = gl.createProgram();
  attachShader(gl, program, vertex, gl.VERTEX_SHADER);
  attachShader(gl, program, fragment, gl.FRAGMENT_SHADER);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    throw new Error("Ошибка инициализации программы шейдера");
  }

  return program;
}

function attachShader(gl, program, code, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, code);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(
      "Произошла ошибка при компиляции шейдеров: " + gl.getShaderInfoLog(shader)
    );
  }

  gl.attachShader(program, shader);

  return shader;
}

function setupBuffer(gl, vertices) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  /*
    Здесь происходит несколько вещей.
    Сперва у нас есть JavaScript-массив positions.
    Но для WebGL нужны строго типизированные данные, поэтому нам нужно явно создать массив 32-битных чисел
    с плавающей точкой через new Float32Array(positions), куда скопируются значения из массива positions.
    Далее gl.bufferData копирует типизированные данные в positionBuffer на видеокарте.
    Копирование происходит в буфер положений, потому что мы привязали его к точке связи ARRAY_BUFFER выше

    gl.STATIC_DRAW говорит о том, что скорей всего мы не будем менять эти данные.
  */
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}
