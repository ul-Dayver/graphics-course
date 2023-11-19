import { createProgram, setupBuffer } from "./util/gl";

export function draw3d() {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  window.onresize = () => {
    gl?.viewport(0, 0, canvas.width, canvas.height);
  };

  Promise.all([
    fetch("/src/shader/vertex.glsl").then((response) => response.text()),
    fetch("/src/shader/fragment.glsl").then((response) => response.text()),
  ]).then((shaders) => {
    const [vertex, fragment] = shaders;

    // Создаем программу и связываем ее с шейдерами
    const program = createProgram(gl, vertex, fragment);

    // Используем программу
    gl.useProgram(program);

    /*
      Получение ссылки на атрибут (и ссылки на uniform-переменную)
      следует выполнять во время инициализации, но не во время цикла отрисовки.
    */
    const positionAttributeLocation = gl.getAttribLocation(program, "position");

    /*
        Теперь нужно сказать WebGL, как извлечь данные из буфера,
        который мы настроили ранее, и передать их в атрибут шейдера.
        Для начала необходимо включить атрибут
      */
    gl.enableVertexAttribArray(positionAttributeLocation);

    /* 
      Атрибуты получают данные от буферов, поэтому нам нужно создать буфер
      и наполнить его данными
    */
    // setupBuffer(gl, [-0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5]);
    setupBuffer(gl, [0, 0, 0, 0.5, 0.7, 0]);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(
      positionAttributeLocation,
      2, // size -  2 компоненты на итерацию ( сколько чисел нужно, чтоб получить одну вершину )
      gl.FLOAT, // type - наши данные - 32-битные числа с плавающей точкой
      false, // normalize - не нормализовать целочисленные значения данных в определенный диапазон при приведении к типу с плавающей запятой
      0, // stride - 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
      0 // offset - начинать с начала буфера
    );

    gl.drawArrays(
      gl.TRIANGLES, // gl.LINES, // primitiveType
      0, // offset
      3 // count
    );
  });
}
