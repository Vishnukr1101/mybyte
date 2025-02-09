import React from "react";
import { Canvas } from "@react-three/fiber";

import EnvironmentSpace from "./EnvironmentSpace";

type Props = {
  className?: string;
  camera?: {
    orbitalTarget: number[];
    cameraPosition: number[];
  };
  avatar?: {
    url?: string;
    position?: {
      x: number;
      y: number;
      z: number;
    };
    rotate?: {
      x: number;
      y: number;
      z: number;
    };
    scale?: number;
    speechVoice?: string;
    speechText?: string;
    background?: {
      id?: string;
      title?: string;
      author?: {
        name?: string;
        url?: string;
      };
      file?: string;
      url?: string;
    };
    room?: {
      position?: {
        x: number;
        y: number;
        z: number;
      };
      rotate?: {
        x: number;
        y: number;
        z: number;
      };
      scale?: number;
    };
  };
  viewMode: boolean;
  style?: StyleSheet;
  hidden?: boolean;
};

// camera={{ position: [0, 0, 5], fov: 42 }}

const CanvasPage = React.memo((props: Props) => {
  const style = props?.style || {};

  return (
    <Canvas
      shadows
      className={props?.className}
      style={{ ...style, display: props?.hidden ? "none" : "block", width: "100vw", height: "100vh" }}
    >
      <EnvironmentSpace {...props} />
    </Canvas>
  );
});

export default CanvasPage;