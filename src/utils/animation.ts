export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  modelref: any,
  rotarion: any,
  firstTarget: string,
  secondTarget: string,
  animationProps: GSAPTweenVars
) => {
  timeline.to(modelref.current.rotation, {
    y: rotarion,
    ease: "power2.inOut",
    duration: 1,
  });

  timeline.to(firstTarget, {
    ...animationProps,
    ease: "power2.inOut",
  });

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};


import gsap from "gsap"

import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target : any, animationProps? :GSAPTweenVars, scrollProps? : ScrollTrigger.Vars) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
           
    }
  })

}

export const animateFromWithGsap = (target :any, animationProps? :GSAPTweenVars, scrollProps? : ScrollTrigger.Vars) => {
  gsap.from(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 50%',
      ...scrollProps,
    }
  })
  
}

