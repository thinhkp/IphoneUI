"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ModelView from "./ModelView";
import { models, sizes } from "../constant";
import { animateWithGsapTimeline, animateWithGsap } from "~/utils/animation";
import { Eye } from "lucide-react";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState(models[0]);

  // container ref
  let containerRef = useRef<HTMLDivElement>(null);

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

  let HandleUiViewBtn = useCallback(() => {
    let container = document.querySelector("#model-view-container");
    let btn = document.querySelector("#viewmodel-btn");
    if (container?.classList.contains("pointer-events-none")) {
      btn?.classList.remove("scale-90");
      btn?.classList.remove("shadow-[0_0_5px_3px_rgb(255,255,255)]");
    } else {
      btn?.classList.add("scale-90");
      btn?.classList.add("shadow-[0_0_5px_3px_rgb(255,255,255)]");
    }
  }, []);

  let HandleClickView = useCallback(() => {
    let container = document.querySelector("#model-view-container");
    container?.classList.contains("pointer-events-none")
      ? container?.classList.remove("pointer-events-none")
      : container?.classList.add("pointer-events-none");
    HandleUiViewBtn();
  } , [])

  let HandleOnLeaveModel = useCallback(() => {
    let container = document.querySelector("#model-view-container");
    container?.classList.add("pointer-events-none");
    HandleUiViewBtn();
  },[])

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

    animateWithGsap(
      "#viewmodel-btn",
      {},
      {
        start : 'top 75%',
        end : 'bottom 25%',
        trigger: "#model-view-container",
        onLeave: HandleOnLeaveModel,
        onLeaveBack: HandleOnLeaveModel,
      }
    );
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
        <h2 className="section-heading" id="model-heading">
          Take a closer look <br />with 3D model
        </h2>
        <div
          id="model-container"
          className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative  "
          ref={containerRef}
        >
          <div
            id="model-view-container"
            className="w-full h-full overflow-hidden relative pointer-events-none lg:pointer-events-auto"
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
                zIndex: -1,
              }}
              eventSource={containerRef.current || undefined}
            >
              <View.Port />
            </Canvas>
          </div>
          <button
            id="viewmodel-btn"
            className="p-3 bg-gray rounded-full transition-all duration-500 absolute top-3 right-3 lg:invisible"
            onClick={HandleClickView}
          >
            <Eye height={16} width={16} />
          </button>
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
