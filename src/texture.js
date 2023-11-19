import { createProgram, setupBuffer, setupTexture } from "./util/gl";

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

    const indices = [0, 1, 2, 2, 3, 0];
    const vertexBuffer = setupBuffer(
      gl,
      [-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5],
      indices
    );

    setupTexture(gl, "brickwall.jpeg", () => {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    });

    const samplerUniform = gl.getUniformLocation(program, "uSampler");
    gl.uniform1i(samplerUniform, 0);
  });
}
