export function createProgram(gl, vertex, fragment) {
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

export function setupBuffer(gl, vertices, indices) {
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
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

  if (indices) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
  }

  return vertexBuffer;
}

export function setupTexture(gl, src, callBack) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const image = new Image();

  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    callBack();
  };
  image.src = src;
}
