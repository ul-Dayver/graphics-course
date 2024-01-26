import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

export function draw3d() {
  const canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const scene = new THREE.Scene();

  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;

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

  const rayCaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  renderer.setSize(width, height);

  let selectedMesh = null;
  render();

  function render(time) {
    rayCaster.setFromCamera(pointer, camera);
    const intersects = rayCaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
      if (selectedMesh)
        selectedMesh.material.emissive.setHex(selectedMesh.currentHex);

      selectedMesh = intersects[0].object;
      selectedMesh.currentHex = selectedMesh.material.emissive.getHex();
      selectedMesh.material.emissive.setHex(0xff0000);
    } else {
      if (selectedMesh)
        selectedMesh.material.emissive.setHex(selectedMesh.currentHex);
      selectedMesh = null;
    }
    // mesh.rotation.z = time * 0.001;
    mesh.rotation.x = time * 0.001;
    mesh.rotation.y = time * 0.001;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.addEventListener("pointermove", onPointerMove);

  function onPointerMove(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
  }
}

export function load3d(src, loader) {
  loader.load(
    src,
    function (object) {
      console.log(object);
      const canvas = document.getElementById("canvas");
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;

      const fov = 50; // field of view - поле зрения 75 градусов по вертикали
      const near = 0.1;
      const far = 100;
      // Near и Far представляют пространство перед камерой, которое будет визуализировано.
      // Все, что находится до этого диапазона или после него, будет обрезано

      const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
      camera.position.z = 3.2;
      camera.position.set(2.325, 4.535, 3.59);

      const scene = new THREE.Scene();

      let setSceneObj;

      switch (true) {
        case loader instanceof GLTFLoader:
          setSceneObj = object.scene;
          break;
        case loader instanceof OBJLoader:
        default:
          setSceneObj = object;
      }

      scene.add(setSceneObj);

      const light = new THREE.DirectionalLight(0xffffff, 10);
      light.position.set(-1, 2, 4);
      scene.add(light);

      renderer.setSize(width, height);
      const controls = new OrbitControls(camera, renderer.domElement);

      controls.update();
      render();

      function render() {
        requestAnimationFrame(render);
        controls.update();

        renderer.render(scene, camera);
      }
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}
