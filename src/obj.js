import "/src/assets/style.scss";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

import { load3d } from "./lib/three.js";

new MTLLoader().load("cat/cat.mtl", function (materials) {
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  console.log(materials);
  load3d("cat/cat.obj", objLoader);
});
