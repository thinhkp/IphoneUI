"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ModelView from "./ModelView";
import { models, sizes } from "../constant";
import { animateWithGsapTimeline } from "~/utils/animation";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState(models[0]);

  // container ref 
  let containerRef = useRef<HTMLDivElement>(null)

  // camera control for the model view
  const cameraControlSmall = useRef(null);
  const cameraControlLarge = useRef(null);

  // model group
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useGSAP(() => {
    gsap.to("#model-heading", {
      scrollTrigger: {
        trigger: "#model-heading",
        start: "top 50%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
    });
  }, []);

  useEffect(() => {
    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view1", "#view2", {
        transform: `translateX(0)`,
        duration: 2,
        ease: "power2.inOut",
      });
    } else {
      animateWithGsapTimeline(tl, small, smallRotation, "#view2", "#view1", {
        transform: `translateX(-100%)`,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [size]);

  return (
    <section className="common-padding" id="model">
      <div className="screen-max-width">
        <h2 className="section-heading" id="model-heading" >Take a closer look</h2>
        <div
          id="model-container"
          className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative"
          ref={containerRef}
        >
          <ModelView
            index={1}
            groupRef={small}
            gsapType="view1"
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
            item={model}
          />

          <ModelView
            index={2}
            groupRef={large}
            gsapType="view2"
            controlRef={cameraControlLarge}
            setRotationState={setLargeRotation}
            item={model}
          />
          <Canvas
            className="w-full h-full"
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflow: "hidden",
            }}
            eventSource={containerRef.current || undefined}
          >
            <View.Port />
          </Canvas>
        </div>
        <div className="w-full">
          <p className="text-sm font-light text-center mb-5">{model.title}</p>
          <div className="flex-center">
            <ul className="color-container">
              {models.map((item, i) => (
                <li
                  key={i}
                  className={`w-6 h-6 rounded-full mx-2 cursor-pointer transition duration-500 ease-in-out ${
                    model.id == item.id
                      ? "shadow-[0_0_1px_2px_rgb(255,255,255)]"
                      : ""
                  } `}
                  style={{ backgroundColor: item.color[0] }}
                  onClick={() => setModel(item)}
                />
                
              ))}
            </ul>
            <button className="size-btn-container">
              {sizes.map(({ label, value }) => (
                <span
                  key={label}
                  className="size-btn"
                  style={{
                    backgroundColor: size === value ? "white" : "transparent",
                    color: size === value ? "black" : "white",
                  }}
                  onClick={() => setSize(value)}
                >
                  {label}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
