// import { gsap } from "/gsap/dist/gsap";
// import { ScrollTrigger } from "/gsap/dist/ScrollTrigger";
// import { MotionPathPlugin } from "/gsap/dist/MotionPathPlugin";

import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./vendor_mods/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./vendor_mods/three/examples/jsm/controls/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const scene = new THREE.Scene(); // create scene

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // set renderer to size of browser
document.body.appendChild(renderer.domElement);

// code to create basic cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5; // adjust camera position

const controls = new OrbitControls(camera, renderer.domElement); // create controls to move around the scene

// add basic pointlight and set the position
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 5, 5);
scene.add(directionalLight);

// adds in grid and light helpers to help visualise the scene
const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// initialise GLTF loader
const loader = new GLTFLoader();

let penguinModel;

// load in penguin model
loader.load(
  "./models/penguinTest3.glb",
  function (gltf) {
    gltf.scene.scale.set(0.6, 0.6, 0.6); // scales the model before adding to scene
    penguinModel = gltf;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// animation loops that renders scene to the screen
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // penguinModel.scene.rotation.x += 0.5;

  controls.update();
}

animate();
