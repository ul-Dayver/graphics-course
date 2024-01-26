import "/src/assets/style.scss";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
  const canvas = document.getElementById("canvas");
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  // Create a light source
  // const light = new THREE.AmbientLight(0xffffff, 1);
  // scene.add(light);

  let sun;
  const planetSystem = new THREE.Object3D();
  planetSystem.position.x = 3;
  let planet;
  let moon;

  solarSystem.add(planetSystem);

  loadTexture("8k_stars_milky_way.jpg").then((map) => {
    const starsGeometry = new THREE.SphereGeometry(1000, 256, 256);
    map.magFilter = THREE.NearestFilter;
    const starsMaterial = new THREE.MeshBasicMaterial({
      map,
      side: THREE.BackSide,
    });
    starsMaterial.format = THREE.RGBAFormat;
    starsMaterial.colorSpace = THREE.SRGBColorSpace;
    const stars = new THREE.Mesh(starsGeometry, starsMaterial);
    solarSystem.add(stars);
  });

  // Create a sun
  loadTexture("2k_sun.jpg").then((map) => {
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      map,
    });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystem.add(sun);

    const light = new THREE.PointLight(0xffaaaa, 10, 3.5);
    solarSystem.add(light);
  });

  // Create a planet
  loadTexture("2k_earth_daymap.jpg").then((map) => {
    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 16);
    const planetMaterial = new THREE.MeshPhongMaterial({ map });

    planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planetSystem.add(planet);
  });

  loadTexture("2k_moon.jpg").then((map) => {
    const moonGeometry = new THREE.SphereGeometry(0.18, 32, 16);
    const moonMaterial = new THREE.MeshPhongMaterial({ map });

    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.x = 1;
    planetSystem.add(moon);
  });

  const controls = new OrbitControls(camera, renderer.domElement);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    if (sun) {
      sun.rotation.y -= 0.001;
    }
    if (planet) {
      planet.rotation.y += 0.01;
      planetSystem.position.x = 3 * Math.cos(Date.now() * 0.0005);
      planetSystem.position.z = 3 * Math.sin(Date.now() * 0.0005);
    }
    if (moon) {
      moon.rotation.y += 0.001;
      moon.position.x = Math.cos(Date.now() * 0.001);
      moon.position.z = Math.sin(Date.now() * 0.001);
    }
    controls.update();
    renderer.render(scene, camera);
  }
  controls.update();
  animate();

  function loadTexture(url) {
    const loader = new THREE.TextureLoader();
    return new Promise((resolve) => loader.load(url, resolve));
  }
}

main();
