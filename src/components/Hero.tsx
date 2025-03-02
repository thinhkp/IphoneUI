"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import React, { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "~/utils";
const Hero = () => {
  const [videoSrc, SetVideoSrc] = useState(heroVideo);

  const handleSVideoSrcSet = () => {
    if (typeof document !== "undefined") {
      if (window.innerWidth < 768) {
        SetVideoSrc(smallHeroVideo);

      } else {
        SetVideoSrc(heroVideo);
      }
    }
  };
  useEffect(() => {
    handleSVideoSrcSet();

    window.addEventListener("resize", handleSVideoSrcSet);

    return () => {
      window.removeEventListener("resize", handleSVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      duration: 1.5,
      delay: 1.5,
    });
    gsap.to("#hero-title", {
      opacity: 1,
      duration: 2,
      delay: 1.5,
    });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="w-full h-5/6 flex flex-col items-center justify-center overflow-hidden">
        <p
          id="hero-title"
          className="text-center font-semibold text-3xl text-gray-100  max-sm:mb-12 mb-5 opacity-0"
        >
          {" "}
          Iphone 16 Pro
        </p>
        <video
          key={videoSrc}
          className="w-9/12 max-sm:w-2/3 max-md:w-1/2  "
          autoPlay
          muted
          playsInline
        >
          <source src={`${videoSrc}`} type="video/mp4" />
        </video>
      </div>
      <div
        id="cta"
        className="flex flex-center flex-col translate-y-5 opacity-0"
      >
        <a href="#" className="btn transition-all">
          Buy now
        </a>
        <p className=""> From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
