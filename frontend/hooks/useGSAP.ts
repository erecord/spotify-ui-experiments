import gsap from "gsap";

export default function() {
  return { flipCard };
}

const flipCard = (element: HTMLElement, callback: gsap.Callback) => {
  gsap.to(element, {
    duration: 3,
    rotationY: 180,
    ease: "Power2.inOut",
    y: 200,
    scaleY: 2,
    scaleX: 4,
    zIndex: 1,
    onComplete: callback
  });
};
