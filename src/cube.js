import { mat4 } from "gl-matrix";
import { createProgram, setupBuffer } from "./util/gl";

export function draw3d() {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  window.onresize = () => {
    gl?.viewport(0, 0, canvas.width, canvas.height);
  };

  Promise.all([
    fetch("/src/shader/cube/vertex.glsl").then((response) => response.text()),
    fetch("/src/shader/cube/fragment.glsl").then((response) => response.text()),
  ]).then((shaders) => {
    const [vertex, fragment] = shaders;

    const program = createProgram(gl, vertex, fragment);

    gl.useProgram(program);

    const vertexPositionAttribute = gl.getAttribLocation(
      program,
      "aVertexPosition"
    );

    gl.enableVertexAttribArray(vertexPositionAttribute);

    const mvMatrix = mat4.create(); // матрица модели
    const pMatrix = mat4.create(); // матрица проекции

    const indices = [
      0, 1, 1, 2, 2, 3, 3, 0, 0, 4, 4, 5, 5, 6, 6, 7, 7, 4, 1, 5, 2, 6, 3, 7,
    ];

    setupBuffer(
      gl,
      [
        // лицевая часть
        -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5,
        // задняя часть
        -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5,
      ],
      indices
    );

    let rotateAngle = 1.9;

    function render(angle) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      mat4.perspective(pMatrix, 1.04, canvas.width / canvas.height, 0.1, 100.0);
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, mvMatrix, [0, 0, -2.0]);
      mat4.rotate(mvMatrix, mvMatrix, angle, [0, 1, 0]);
      // console.log(mvMatrix, pMatrix);

      const MVMatrix = gl.getUniformLocation(program, "uMVMatrix");
      const ProjMatrix = gl.getUniformLocation(program, "uPMatrix");

      gl.uniformMatrix4fv(ProjMatrix, false, pMatrix);
      gl.uniformMatrix4fv(MVMatrix, false, mvMatrix);

      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

      gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    render(rotateAngle);

    // let startTime;
    // animateRotate();

    // function animateRotate() {
    //   requestAnimationFrame((timeStamp) => {
    //     if (!startTime) {
    //       startTime = timeStamp;
    //     }

    //     if (timeStamp - (startTime % 100)) {
    //       render(rotateAngle);
    //       rotateAngle += 0.01;
    //     }

    //     animateRotate();
    //   });
    // }
  });
}
