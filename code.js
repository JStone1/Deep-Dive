// import { gsap } from "/gsap/dist/gsap";
// import { ScrollTrigger } from "/gsap/dist/ScrollTrigger";
// import { MotionPathPlugin } from "/gsap/dist/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

gsap.set("#rect", { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" }); // sets rect to be centered

gsap.to("#rect", {
  duration: 5,
  motionPath: {
    path: "#path",
    autoRotate: true, // rotates object automatically on curve of path
    start: 0.25, // start animation at 25% of path
    end: 0.75, // end animation at 75% of path
  },
});

gsap.to("#div", {
  duration: 5,
  delay: 2, // delays animation by 2s
  motionPath: {
    path: "#path",
    align: "#path", // aligns div coordinates with the svg ones
  },
});
