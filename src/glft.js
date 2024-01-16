import "/src/assets/style.scss";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { load3d } from "./lib/three.js";

load3d("porsche/free_1975_porsche_911_930_turbo.glb", new GLTFLoader());
