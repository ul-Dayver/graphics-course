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

    const shaderProgram = gl.createProgram();

    const vertexShader = getShader(gl, vertex, gl.VERTEX_SHADER);
    const fragmentShader = getShader(gl, fragment, gl.FRAGMENT_SHADER);

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error("Ошибка инициализации программы шейдера");
    }

    gl.useProgram(shaderProgram);
    gl.enableVertexAttribArray(
      gl.getAttribLocation(shaderProgram, "aVertexPosition")
    );
  });
}

function getShader(gl, code, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, code);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
  }

  return shader;
}

function initBuffers(gl) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

  const vertices = [
    1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function drawScene(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);

  loadIdentity();
  mvTranslate([-0.0, 0.0, -6.0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
