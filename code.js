// import { gsap } from "/gsap/dist/gsap";
// import { ScrollTrigger } from "/gsap/dist/ScrollTrigger";
// import { MotionPathPlugin } from "/gsap/dist/MotionPathPlugin";

import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./vendor_mods/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./vendor_mods/three/examples/jsm/controls/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

let size = { width: 0, height: 0 };

const scene = new THREE.Scene(); // create scene

// create renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

const container = document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 6); // adjust camera position

// code to resize canvas to fit the screen
const onResize = () => {
  size.width = container.clientWidth;
  size.height = container.clientHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", onResize);
onResize();

const controls = new OrbitControls(camera, container); // create controls to move around the scene

// add basic pointlight and set the position
const directionalLight = new THREE.DirectionalLight("#daecf7");
directionalLight.position.set(0, 5, 5);
scene.add(directionalLight);

// adds in grid and light helpers to help visualise the scene
// const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const waterTexture = new THREE.TextureLoader().load(
  "./images/underwater3.jpeg"
); // add callback function to make a loading bar if lots of assets need to be loaded (tutorial 11:20)
scene.background = waterTexture;

// array that stores objects to be loaded into the screen with name, group and filepath
const toLoad = [
  {
    name: "penguin",
    group: new THREE.Group(),
    file: "./models/penguinTest3.glb",
  },

  {
    name: "whale",
    group: new THREE.Group(),
    file: "./models/Killer Whale.glb",
  },

  {
    name: "whale2",
    group: new THREE.Group(),
    file: "./models/Killer Whale.glb",
  },

  {
    name: "bottle",
    group: new THREE.Group(),
    file: "./models/Bottle.glb",
  },
  {
    name: "fish",
    group: new THREE.Group(),
    file: "./models/Fish.glb",
  },
];

// object to store models
const models = {};

const setupAnimation = () => {
  console.log("Setup animation");

  models.penguin.scale.set(0.5, 0.5, 0.5);
  models.penguin.rotation.x = 4.5;
  models.penguin.position.y = 3;
  models.penguin.position.x = 5;

  models.whale.scale.set(0.01, 0.01, 0.01);
  models.whale.rotation.y = 4.7;
  models.whale.position.x = 13;
  models.whale.position.y = 2.7;

  models.whale2.scale.set(0.005, 0.005, 0.005);
  models.whale2.rotation.y = -4.7;
  models.whale2.position.x = -15;
  models.whale2.position.y = -3;

  models.bottle.scale.set(0.1, 0.1, 0.1);
  models.bottle.rotation.x = 2.5;
  models.bottle.rotation.z = 3.5;
  models.bottle.position.y = 3;
  models.bottle.position.x = -12;

  models.fish.scale.set(0.01, 0.01, 0.01);
  models.fish.rotation.y = 4.7;
  models.fish.position.y = 0;
  models.fish.position.x = 10;
  ScrollTrigger.matchMedia({
    "(prefers-reduced-motion: no-preference)": desktopAnimation,
  });
};

const desktopAnimation = () => {
  let section = 0;
  // camera.position.x = models.penguin.position.z;
  const tl = gsap.timeline({
    defaults: {
      duration: 3,
      ease: "power2.inOut",
    },
    scrollTrigger: {
      markers: true,
      trigger: ".page",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
    },
  });

  console.log("here", models.penguin);

  let testText = document.querySelector(".info");

  // Section 1 (Landing)

  tl.to(models.penguin.position, { x: 0 }, section);
  tl.to(models.penguin.rotation, { x: 3 }, section);
  tl.to(models.penguin.position, { y: 0 }, section);
  tl.to(testText, { opacity: 1 }, section - 1);
  tl.to(testText, { y: 200, ease: "slow.in" }, section - 1);

  //  Section 2 (Buffer)
  section += 2;

  // Section 3 (Predators)

  section += 2;
  tl.to(models.whale.position, { x: -15 }, section - 1);

  // Section 4 (Buffer)
  section += 2;
  tl.to(models.whale2.position, { x: 15 }, section - 1);

  // Section 5 (Plastic)

  section += 2;
  tl.to(models.bottle.position, { x: 15 }, section);

  //  Section 6 (Buffer)
  section += 2;

  // Section 7 (Overfishing)

  section += 2;
  tl.to(models.fish.position, { x: -15 }, section);

  // Section 8 (Buffer)
  section += 2;

  // Section 9 (End)
  section += 2;

  tl.to(models.penguin.rotation, { x: 1.5 }, section);
  tl.to(models.penguin.position, { x: 15 }, section);
  tl.to(models.penguin.position, { y: -4 }, section);
};

const LoadingManager = new THREE.LoadingManager(() => {
  console.log("Loading manager");
  setupAnimation();
});

const gltfLoader = new GLTFLoader(LoadingManager);

toLoad.forEach((item) => {
  gltfLoader.load(item.file, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log("Child", child);
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });
    item.group.add(model.scene);
    scene.add(item.group);
    models[item.name] = item.group;
  });
});

// animation loops that renders scene to the screen
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  models.penguin.rotation.y += 0.03;

  models.bottle.rotation.y += 0.02;
  models.bottle.rotation.x += 0.02;

  controls.update();
}

animate();
