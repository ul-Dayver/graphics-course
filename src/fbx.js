import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const width = window.innerWidth;
const height = window.innerHeight;
const aspectRatio = width / height;
const clock = new THREE.Clock();
let mixer

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(50))

const light = new THREE.AmbientLight(0x404040, 100);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
    75,
    aspectRatio,
    0.1,
    1000
)

camera.position.set(-10, -234, 150);

renderer.setSize(width, height);
const controls = new OrbitControls(camera, renderer.domElement)

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'rp_sophia_animated_003_idling.fbx',
    (object) => {
        console.log(object)
        scene.add(object)

        object.position.z = -75
        mixer = new THREE.AnimationMixer(object);
        const action = mixer.clipAction(object.animations[0])
        // action.setDuration(30)
        action.play();
    }
)

function render() {
    requestAnimationFrame(render)

    controls.update()

    if (mixer) {
        mixer.update(clock.getDelta());
    }

    renderer.render(scene, camera)
}

render()