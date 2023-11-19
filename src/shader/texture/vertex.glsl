attribute vec3 aVertexPosition;
varying vec2 vTextureCoords;
 
void main(void) {
  gl_Position = vec4(aVertexPosition, 1.0);
  vTextureCoords = vec2(aVertexPosition.x+0.5, aVertexPosition.y+0.5);
}