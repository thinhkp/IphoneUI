import { View, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import { AmbientLight } from "three";
import Lights from "./Lights";
import Iphone from "./Iphone";
import * as THREE from "three";
import ModelLoader from "./ModelLoader";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: any) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute w-full h-full   ${
        index === 2 ? "right-[-100%]" : ""
      } `}
    >
      <ambientLight intensity={0.5} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />
      <OrbitControls
        ref={controlRef}
        makeDefault
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group ref={groupRef} position={[0, 0, 0]}>
        <Suspense fallback={<ModelLoader />}>
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
