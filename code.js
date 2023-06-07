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

// code for creating background audio in the scene
const audioListener = new THREE.AudioListener();
camera.add(audioListener);
const backgroundAudio = new THREE.Audio(audioListener);

const audioLoader = new THREE.AudioLoader();

// adjusts the sound and plays bg music
function playAudio() {
  audioLoader.load("./audio/bgMusic.mp3", function (buffer) {
    backgroundAudio.setBuffer(buffer);
    backgroundAudio.setLoop(true);
    backgroundAudio.setVolume(0.5);
    backgroundAudio.play();
  });
}

// pauses background noise
function pauseAudio() {
  backgroundAudio.pause();
}

// variables for managing the audio element
let audioDisabled = document.getElementsByClassName("audio-disabled")[0];
console.log(audioDisabled);

let audioEnabled = document.getElementsByClassName("audio-enabled")[0];
console.log(audioEnabled);

// event listeners for the audio toggles
audioDisabled.addEventListener("click", () => {
  audioDisabled.classList.toggle("hidden");
  audioEnabled.classList.toggle("hidden");
  console.log(audioDisabled.classList);
  playAudio();
});

audioEnabled.addEventListener("click", () => {
  audioDisabled.classList.toggle("hidden");
  audioEnabled.classList.toggle("hidden");
  console.log(audioEnabled.classList);
  pauseAudio();
});

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
directionalLight.position.set(0, 0, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight("lightblue");
pointLight.position.set(0, 15, 5);
scene.add(pointLight);

// adds in grid and light helpers to help visualise the scene
// const DLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// const PLightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(DLightHelper, PLightHelper, gridHelper);

const waterTexture = new THREE.TextureLoader().load(
  "./images/underwater3.jpeg"
); // add callback function to make a loading bar if lots of assets need to be loaded (tutorial 11:20)
scene.background = waterTexture;

// array that stores objects to be loaded into the screen with name, group and filepath
const toLoad = [
  {
    name: "penguin",
    group: new THREE.Group(),
    file: "./models/penguin11.glb",
  },

  {
    name: "penguin2",
    group: new THREE.Group(),
    file: "./models/penguin11.glb",
  },

  {
    name: "iceberg",
    group: new THREE.Group(),
    file: "./models/iceberg.glb",
  },

  {
    name: "whale",
    group: new THREE.Group(),
    file: "./models/Killer Whale.glb",
  },

  {
    name: "shark",
    group: new THREE.Group(),
    file: "./models/shark.glb",
  },

  {
    name: "bottle",
    group: new THREE.Group(),
    file: "./models/Bottle.glb",
  },

  {
    name: "tin",
    group: new THREE.Group(),
    file: "./models/tin.glb",
  },

  {
    name: "can",
    group: new THREE.Group(),
    file: "./models/can.glb",
  },
  {
    name: "fish",
    group: new THREE.Group(),
    file: "./models/Fish.glb",
  },

  {
    name: "fish2",
    group: new THREE.Group(),
    file: "./models/Fish3.glb",
  },
];

// object to store models
const models = {};

// setup for the initial size and positions of the models
const setupAnimation = () => {
  console.log("Setup animation");

  models.penguin.scale.set(0.5, 0.5, 0.5);
  models.penguin.rotation.x = 4.5;
  models.penguin.rotation.x = 0.6;
  models.penguin.rotation.y = 4.4;
  models.penguin.position.y = 5.5;
  models.penguin.position.x = 6.3;

  // models.penguin.position.y = 3;
  // models.penguin.position.x = 7;

  models.iceberg.scale.set(4, 4, 4);
  models.iceberg.rotation.x = 0;
  models.iceberg.rotation.y = 5.7;
  models.iceberg.position.x = 9.5;
  models.iceberg.position.y = 4.6;

  models.whale.scale.set(0.01, 0.01, 0.01);
  models.whale.rotation.y = -4.7;
  models.whale.position.x = -13;
  models.whale.position.y = 1.7;

  models.shark.scale.set(0.03, 0.03, 0.03);
  models.shark.rotation.y = 4.7;
  models.shark.position.x = 15;
  models.shark.position.y = -2;

  models.bottle.scale.set(0.1, 0.1, 0.1);
  models.bottle.rotation.x = 2.5;
  models.bottle.rotation.z = 3.5;
  models.bottle.position.y = 3;
  models.bottle.position.x = -12;

  models.tin.rotation.x = -2.5;
  models.tin.rotation.z = -3.5;
  models.tin.position.y = -5.5;
  models.tin.position.x = 0;

  models.can.rotation.x = -2.5;
  models.can.rotation.z = -3.5;
  models.can.position.y = -6;
  models.can.position.x = 1;

  models.fish.scale.set(0.01, 0.01, 0.01);
  models.fish.rotation.y = 4.7;
  models.fish.position.y = 0;
  models.fish.position.x = 10;

  models.fish2.scale.set(0.1, 0.1, 0.1);
  models.fish2.rotation.y = 4.7;
  models.fish2.position.y = 0;
  models.fish2.position.x = 10;

  models.penguin2.scale.set(0.5, 0.5, 0.5);

  models.penguin2.position.x = 0;
  models.penguin2.position.y = -14;
  ScrollTrigger.matchMedia({
    "(prefers-reduced-motion: no-preference)": desktopAnimation,
  });
};

// main timeline for the webpage
const desktopAnimation = () => {
  let section = 0;
  // camera.position.x = models.penguin.position.z;
  const mainTL = gsap.timeline({
    defaults: {
      duration: 3,
      ease: "power2.inOut",
    },
    scrollTrigger: {
      // markers: true,
      trigger: ".page",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
    },
  });
  console.log("here", models.penguin);

  // tween that darkens the background image from 100% to 50% as you scroll down
  gsap.fromTo(
    container,
    { filter: "brightness(100%)" },
    {
      filter: "brightness(50%)",
      scrollTrigger: {
        start: "top 1%",
        end: "bottom 99%",
        scrub: 0.1,
      },
    }
  );

  // code for managing the popups of all the info on the page
  let info = document.querySelectorAll(".info");
  let popups = document.getElementsByClassName("popup");

  info.forEach((infoText) => {
    infoText.addEventListener("mouseenter", () => {
      for (let i = 0; i <= popups.length; i++) {
        if (infoText.classList.contains(`text${i}`)) {
          popups[i - 1].classList.remove("hidden");
        }
      }
    });
    infoText.addEventListener("mouseleave", () => {
      for (let i = 0; i <= popups.length; i++) {
        if (popups[i]) {
          popups[i].classList.add("hidden");
        }
      }
    });
  });

  // variables to store each text element on page (needs refactoring)
  let text1 = document.querySelector(".text1");
  let text2 = document.querySelector(".text2");
  let text3 = document.querySelector(".text3");
  let text4 = document.querySelector(".text4");
  let text5 = document.querySelector(".text5");
  let text6 = document.querySelector(".text6");
  let text7 = document.querySelector(".text7");
  let text8 = document.querySelector(".text8");

  // Section 1 (Landing)

  mainTL.to(models.penguin.position, { y: 0 }, section);
  mainTL.to(models.penguin.position, { x: 0 }, section);
  mainTL.to(models.penguin.rotation, { z: 3.15 }, section);
  mainTL.to(models.iceberg.position, { y: 10.15 }, section);
  mainTL.to(text1, { opacity: 1 }, section - 1);
  mainTL.to(text1, { y: 300, ease: "slow.in" }, section - 1);

  //  Section 2 (Buffer)
  section += 2;
  mainTL.to(text2, { opacity: 1 }, section - 1);
  mainTL.to(text2, { y: 300, ease: "slow.in" }, section - 1);

  // Section 3 (Predators)

  section += 2;
  mainTL.to(models.penguin.position, { y: 0 }, section);
  mainTL.to(models.penguin.position, { x: -4.5 }, section);
  mainTL.to(models.penguin.rotation, { x: 1 }, section);
  mainTL.to(models.penguin.rotation, { y: 8 }, section);

  mainTL.to(models.whale.position, { x: 15 }, section - 2);

  // Section 4 (Buffer)
  section += 2;
  mainTL.to(models.shark.position, { x: -15 }, section - 1);

  mainTL.to(text3, { opacity: 1 }, section - 1);
  mainTL.to(text3, { y: 400, ease: "slow.inOut" }, section - 1);

  mainTL.to(models.tin.position, { x: 6 }, section);
  mainTL.to(models.tin.position, { y: 6 }, section + 1);

  mainTL.to(text4, { opacity: 1 }, section + 1.5);
  mainTL.to(text4, { y: 200, ease: "slow.in" }, section + 1.5);

  // Section 5 (Plastic)

  section += 2;
  mainTL.to(models.bottle.position, { x: 12 }, section);
  mainTL.to(models.bottle.position, { y: 1 }, section);

  mainTL.to(models.can.position, { x: -10 }, section);
  mainTL.to(models.can.position, { y: -1 }, section);

  mainTL.to(models.penguin.position, { y: 1.5 }, section);
  mainTL.to(models.penguin.position, { x: 3.5 }, section);

  mainTL.to(models.penguin.rotation, { x: 0.5 }, section);
  mainTL.to(models.penguin.rotation, { y: 18 }, section);

  mainTL.to(text5, { opacity: 1 }, section + 1);
  mainTL.to(text5, { y: 300, ease: "slow.in" }, section + 1);

  //  Section 6 (Buffer)
  section += 2;

  // Section 7 (Overfishing)

  section += 2;

  mainTL.to(models.penguin.position, { y: 1 }, section);
  mainTL.to(models.penguin.position, { x: -1.5 }, section);

  mainTL.to(models.penguin.rotation, { x: 0 }, section);
  mainTL.to(models.penguin.rotation, { y: 26 }, section);

  mainTL.to(models.fish.position, { x: -15 }, section);
  mainTL.to(text6, { opacity: 1 }, section);
  mainTL.to(text6, { y: 300, ease: "slow.in" }, section);

  // Section 8 (Buffer)
  section += 2;
  mainTL.to(models.fish2.position, { x: -15 }, section);
  mainTL.to(text7, { opacity: 1 }, section);
  mainTL.to(text7, { y: 200, ease: "slow.in" }, section);

  mainTL.to(text8, { opacity: 1 }, section + 2);
  mainTL.to(text8, { y: 300, ease: "slow.in" }, section + 2);

  // Section 9 (End)
  section += 2;

  mainTL.to(models.penguin.position, { y: -5 }, section + 2);
  mainTL.to(models.penguin.position, { x: 12 }, section + 2);

  mainTL.to(models.penguin.rotation, { x: -1 }, section + 1);
  mainTL.to(models.penguin.rotation, { y: 30 }, section + 1);
  mainTL.to(models.penguin2.position, { y: -4.8 }, section + 3);
};

const LoadingManager = new THREE.LoadingManager(() => {
  console.log("Loading manager");
  setupAnimation();
});

const gltfLoader = new GLTFLoader(LoadingManager);

// loop that runs through each model in array and loads them into the scene
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

  // models.penguin.rotation.y += 0.03;

  models.bottle.rotation.y += 0.02;
  models.bottle.rotation.x += 0.02;

  models.tin.rotation.y += 0.05;
  models.tin.rotation.z += 0.01;

  models.can.rotation.y += 0.05;
  models.can.rotation.x += 0.02;

  controls.update();
}

animate();
