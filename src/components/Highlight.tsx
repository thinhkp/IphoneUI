'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

import { watchImg, rightImg } from "~/utils";
import VideoCarousel from "./VideoCarousel";

const Highlight = () => {

  useGSAP(()=>{
    gsap.to('#hl-title' , {
      opacity:1,
      y : 0,
      duration : 1,
      scrollTrigger : {
        trigger : '#hl-title',
        start : 'bottom 80%',
      }
    })
    gsap.to('.link' , {
      opacity:1,
      y : 0,
      stagger : 0.25,
      delay : 0.5,
      duration : 1,
      scrollTrigger : {
        trigger : '#hl-title',
        start : 'bottom 80%',
      }
    })
  }, [])


  return (
    <section id="highlights" className="w-screen sm:py-32 py-20 sm:px-10 px-5 bg-zinc overflow-hidden">
      <div className="relative m-auto max-w-[1120px]">
        <div className="mb-12 md:flex justify-between items-end flex-wrap" >
          <h1 id="hl-title" className="section-heading ">
            Get the highlights
          </h1>
          <div className="flex gap-3">
            <p className="flex gap-2 link">
              Watch the film
              <Image src={watchImg} alt="" width={16}  />
            </p>
            <p className="flex gap-2 link">
              Watch the event
              <Image src={rightImg} alt="" width={10}  />
            </p>
          </div>
        </div>
        <VideoCarousel/>
      </div>
    </section>
  );
};

export default Highlight;
