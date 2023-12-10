import * as THREE from "three";

export function draw3d() {
  const canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;

  const scene = new THREE.Scene();
  const fov = 75; // field of view - поле зрения 75 градусов по вертикали
  const near = 0.1;
  const far = 5;
  // Near и Far представляют пространство перед камерой, которое будет визуализировано.
  // Все, что находится до этого диапазона или после него, будет обрезано

  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
  camera.position.z = 2;

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x007300,
    opacity: 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  // mesh.rotation.y = 0.5;
  scene.add(mesh);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);
  scene.add(light);

  renderer.setSize(width, height);

  render();

  function render(time) {
    // mesh.rotation.z = time * 0.001;
    mesh.rotation.x = time * 0.001;
    mesh.rotation.y = time * 0.001;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
}
