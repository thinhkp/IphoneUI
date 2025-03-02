"use client";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import React, { useRef } from "react";
import { explore1Img, explore2Img, exploreVideo } from "~/utils";
import { animateWithGsap } from "~/utils/animation";

const Feature = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    animateWithGsap(
      "#features_title",
      { opacity: 1, y: 0 },
      { toggleActions: "play none none none" }
    );

    animateWithGsap(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1" },
      { scrub: 5 }
    );

    animateWithGsap(".feature-text", {
      y: 0,
      opacity: 1,
      ease: "power1",
      duration: 0.5,
    }, );
  });

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the full story.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>
          <div className="flex-center flex-col w-full sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>
            <div className="flex-center gap-5 flex-col w-full mt-10 md:flex-row">
              <div className="overflow-hidden flex-1 h-[50vh]  ">
                <Image
                  src={explore1Img}
                  alt=""
                  className="object-cover g_grow feature-video"
                />
              </div>
              <div className="overflow-hidden flex-1 h-[50vh]">
                <Image
                  src={explore2Img}
                  alt=""
                  className="object-cover g_grow feature-video"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-10 justify-between  w-full">
              <p className="feature-text g_text">
                iPhone 15 Pro is{" "}
                <span className="text-white">
                  the first iPhone to feature an aerospace-grade titanium design
                </span>
                , using the same alloy that spacecrafts use for missions to
                Mars.
              </p>
              <p className="feature-text g_text">
                Titanium has one of the best strength-to-weight ratios of any
                metal, making these our{" "}
                <span className="text-white">lightest Pro models ever.</span>
                You'll notice the difference the moment you pick one up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
