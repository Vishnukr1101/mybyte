// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// https://models.readyplayer.me/67330cd948b71f68bc0fe89a.glb?useQuantizeMeshOptCompression=true&quality=high&textureQuality=high&morphTargets=ARKit,Oculus Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&pose=A
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { visemeMap } from "../utils";

import { randInt } from "three/src/math/MathUtils.js";


const morphTargetSmoothing = 0.08;
const defaultAnimation = "idle";
const ANIMATION_FADE_TIME = 0.5;


type Props = {
  url: string;
  scale?: number;
  position?: {
    x: number;
    y: number;
    z: number;
  },
  rotate?: {
    x: number;
    y: number;
    z: number;
  },
  visemeData?: object[];
  onReady?: (value: boolean) => void;
  onPlayStateChange?: (value: boolean) => void;
  audioUrl?: string;
  isMuted?: boolean;
}

const Avatar = React.memo((props: Props) => {
  const group = useRef();

  const avatarScale = useMemo(() => props.scale || 2, [props.scale]);
  const avatarPosition = useMemo(
    () =>
      new THREE.Vector3(
        props?.position?.x || 0,
        props?.position?.y || 0,
        props?.position?.z || 0,
      ),
    [props.position],
  );

  const visemeData = props?.visemeData;
  const [animate, setAnimate] = useState(defaultAnimation);
  const [isAvatarReady, setIsAvatarReady] = useState(false);
  const { load, getPosition, playing, stop, mute } = useGlobalAudioPlayer();
  const lastBlinkTime = useRef(0);

  useEffect(() => {
    setAnimate(defaultAnimation);
    return () => { };
  }, []);


  const { nodes, materials } = useGLTF(props.url);

  const animationFile = `/combined.glb`;
  const { animations } = useGLTF(animationFile);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && group?.current) {
      setIsAvatarReady(true);

      if (props?.onReady) {
        props.onReady(true);
      }
    }

    return () => { };
  }, [actions, group, props]);

  useEffect(() => {
    stop();
    if (props?.audioUrl) {
      load(props?.audioUrl, {
        autoplay: true,
        onend: handleAudioEnd,
        format: "mp3",
      });
    }

    return () => { };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, props?.audioUrl, stop]);

  useFrame(() => {
    if (nodes?.Wolf3D_Avatar) {
      const currentTime = Date.now();
      const elapsedTimeSinceLastBlink = currentTime - lastBlinkTime.current;

      if (elapsedTimeSinceLastBlink >= randInt(1000, 5000)) {
        const { eyeBlinkLeft, eyeBlinkRight } =
          nodes.Wolf3D_Avatar.morphTargetDictionary;
        blink(eyeBlinkLeft, eyeBlinkRight);
        lastBlinkTime.current = currentTime;
      }
    }
  });

  const lerpMorphTarget = (target: string, value: number, speed = 0.1) => {
    if (nodes?.Wolf3D_Avatar && nodes?.Wolf3D_Avatar?.morphTargetDictionary) {
      const morphTarget = visemeMap[target];

      const index = nodes.Wolf3D_Avatar.morphTargetDictionary[morphTarget];
      if (
        index === undefined ||
        nodes.Wolf3D_Avatar.morphTargetInfluences[index] === undefined
      ) {
        return;
      }
      nodes.Wolf3D_Avatar.morphTargetInfluences[index] = THREE.MathUtils.lerp(
        nodes.Wolf3D_Avatar.morphTargetInfluences[index],
        value,
        speed,
      );
    }
  };

  const resetMorphTargets = () => {
    if (!nodes?.Wolf3D_Avatar) return;
    Object.values(visemeMap).forEach((value) => {
      const index = nodes.Wolf3D_Avatar.morphTargetDictionary[value];
      nodes.Wolf3D_Avatar.morphTargetInfluences[index] = THREE.MathUtils.lerp(
        nodes.Wolf3D_Avatar.morphTargetInfluences[index],
        0,
        morphTargetSmoothing,
      );
    });
  };

  useFrame(() => {
    // Smile
    lerpMorphTarget("mouthSmileRight", 0.2, 0.5);
    lerpMorphTarget("mouthSmileLeft", 0.2, 0.5);

    // Talking
    for (let i = 0; i <= 21; i++) {
      lerpMorphTarget(i, 0, 0.1); // reset morph targets
    }

    if (isAvatarReady && visemeData && playing) {
      for (let i = visemeData.length - 1; i >= 0; i--) {
        const viseme = visemeData[i];
        if (getPosition() * 1000 >= viseme[0]) {
          lerpMorphTarget(viseme[1], 1, 0.2);
          break;
        }
      }

      if (actions[animate] && actions[animate]?.time) {
        if (
          actions[animate].time >
          actions[animate].getClip().duration - ANIMATION_FADE_TIME
        ) {
          setAnimate((animation) =>
            animation === "Talking" ? "Talking_2" : "Talking",
          ); // Could load more type of animations and randomization here
        }
      }
    }
  });

  const handleAudioEnd = () => {
    resetMorphTargets();
    setAnimate(defaultAnimation);
  };

  useEffect(() => {
    if (animate && animations && animations.length) {
      const newAction = actions[animate];

      if (newAction) {
        newAction.reset().fadeIn(0.5).play();
      }
    }

    return () => {
      if (animate && actions[animate]) {
        actions[animate].fadeOut(0.5);
      }
    };
  }, [actions, animate, animations]);

  const blink = (eyeBlinkLeft, eyeBlinkRight) => {
    nodes.Wolf3D_Avatar.morphTargetInfluences[eyeBlinkLeft] = 1;
    nodes.Wolf3D_Avatar.morphTargetInfluences[eyeBlinkRight] = 1;

    setTimeout(() => {
      nodes.Wolf3D_Avatar.morphTargetInfluences[eyeBlinkLeft] = 0;
      nodes.Wolf3D_Avatar.morphTargetInfluences[eyeBlinkRight] = 0;
    }, 100);
  };

  useEffect(() => {
    if (props?.onPlayStateChange) {
      props.onPlayStateChange(playing);
    }

    return () => { };
  }, [playing, props]);

  useEffect(() => {
    mute(props.isMuted);

    return () => { };
  }, [props.isMuted, mute]);

  return (
    <group
      userData={{ name: "Armature" }}
      scale={avatarScale}
      position={avatarPosition}
      rotation={[
        props?.rotate?.x || 0,
        props?.rotate?.y || 0,
        props?.rotate?.z || 0,
      ]}
      dispose={null}
      ref={group}
    >
      <primitive object={nodes?.Hips} />
      {nodes?.Wolf3D_Avatar && (
        <skinnedMesh
          castShadow
          receiveShadow
          name="Wolf3D_Avatar"
          geometry={nodes?.Wolf3D_Avatar?.geometry}
          material={materials?.Wolf3D_Avatar}
          skeleton={nodes?.Wolf3D_Avatar?.skeleton}
          morphTargetDictionary={nodes?.Wolf3D_Avatar?.morphTargetDictionary}
          morphTargetInfluences={nodes?.Wolf3D_Avatar?.morphTargetInfluences}
        />
      )}
    </group>
  );
});

export default Avatar;
