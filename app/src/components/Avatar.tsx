// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// https://models.readyplayer.me/67330cd948b71f68bc0fe89a.glb?useQuantizeMeshOptCompression=true&quality=high&textureQuality=high&morphTargets=ARKit,Oculus Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&pose=A
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { visemeMap } from "../utils";

import { randInt } from "three/src/math/MathUtils.js";
import AvatarContext from "../hooks/AvatarContext";


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
  onPlayStateChange?: (value: boolean) => void;

  isMuted?: boolean;
}

const gestures = [
  "acknowledging",
  "angry_gesture",
  "angry_point",
  "annoyed_head_shake",
  "being_cocky",
  "disappointed",
  "dismissing_gesture",
  "happy_hand_gesture",
  "happy_idle",
  "hard_head_nod",
  "head_nod_yes",
  "idle",
  "lengthy_head_nod",
  "look_away_gesture",
  "pointing",
  "pointing_1_",
  "quick_formal_bow",
  "relieved_sigh",
  "salute",
  "sarcastic_head_nod",
  "shaking_head_no",
  "talking",
  "talking_1_",
  "thoughtful_head_shake",
  "walking",
  "waving",
  "waving_1_",
  "weight_shift"
];


const Avatar = React.memo((props: Props) => {
  const group = useRef();

  const { isAvatarReady, setIsAvatarReady, audioUrl, visemeData } = useContext(AvatarContext);


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

  const [animate, setAnimate] = useState(defaultAnimation);
  const { load, getPosition, playing, stop, mute } = useGlobalAudioPlayer();
  const lastBlinkTime = useRef(0);
  const { nodes, materials } = useGLTF(props.url);

  const animationFile = `/combined.glb`;
  const { animations } = useGLTF(animationFile);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && group?.current) {
      setIsAvatarReady(true);
    }

    return () => { };
  }, [actions, group, props]);

  useEffect(() => {
    stop();
    if (audioUrl) {
      load(audioUrl, {
        autoplay: true,
        onend: handleAudioEnd,
        format: "mp3",
      });
    }

    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, audioUrl, stop]);

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
    // for (let i = 0; i <= 21; i++) {
    //   lerpMorphTarget(i, 0, 0.1); // reset morph targets
    // }

    
    if (isAvatarReady && visemeData && playing) {
      console.log("check frame loop: ", isAvatarReady && visemeData && playing, " viseme : ", visemeData)
      for (let i = 0; i <= visemeData.length - 1; i++) {
        const viseme = visemeData[i];

        console.log("time: ", getPosition() *1000, " viseme time: ", viseme.time)

        if (getPosition() * 1000 >= viseme.time) {
          lerpMorphTarget(viseme.value, 1, 0.2);
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

  // Track head or eye start
  const mousePosition = useRef({ x: 0, y: 0 }); // Mouse position storage
  const headBone = useRef<THREE.Object3D>();
  const leftEyeBone = useRef<THREE.Object3D>();
  const rightEyeBone = useRef<THREE.Object3D>();

  // Capture mouse movement and normalize coordinates
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mousePosition.current = {
        x: (event.clientX / innerWidth) * 2 - 1, // Normalize to -1 to 1
        y: (event.clientY / innerHeight) * 2 - 1, // Not inverted for up/down
      };
    };

    const handleTouchMove = (event: TouchEvent) => {
      const { innerWidth, innerHeight } = window;
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const normalizedX = (touch.clientX / innerWidth) * 2 - 1;
        const normalizedY = (touch.clientY / innerHeight) * 2 - 1;

        // Smoothly transition from the current position to the touch position
        mousePosition.current.x = THREE.MathUtils.lerp(
          mousePosition.current.x,
          normalizedX,
          0.2 // Smoothing factor for touch
        );
        mousePosition.current.y = THREE.MathUtils.lerp(
          mousePosition.current.y,
          normalizedY,
          0.2 // Smoothing factor for touch
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Find head and eye bones
  useEffect(() => {
    if (nodes?.Head) {
      headBone.current = nodes?.Head;
      leftEyeBone.current = nodes.Head.children.find(
        (bone) => bone.name === "LeftEye"
      );
      rightEyeBone.current = nodes.Head.children.find(
        (bone) => bone.name === "RightEye"
      );
    }
  }, [nodes]);

  useFrame(() => {
    const { x, y } = mousePosition.current;

    // Adjust head rotation based on mouse or touch
    if (headBone.current) {
      headBone.current.rotation.y = THREE.MathUtils.lerp(
        headBone.current.rotation.y,
        x * 2, // Scale rotation
        0.1 // Smoothing
      );
      headBone.current.rotation.x = THREE.MathUtils.lerp(
        headBone.current.rotation.x,
        y * 2, // Scale rotation
        0.1 // Smoothing
      );
    }

    // Adjust left eye rotation based on mouse or touch
    if (leftEyeBone.current) {
      leftEyeBone.current.rotation.y = THREE.MathUtils.lerp(
        leftEyeBone.current.rotation.y,
        x * 0.3, // Scale rotation
        0.1 // Smoothing
      );
      leftEyeBone.current.rotation.x = THREE.MathUtils.lerp(
        leftEyeBone.current.rotation.x,
        y * 0.3, // Scale rotation
        0.1 // Smoothing
      );
    }

    // Adjust right eye rotation based on mouse or touch
    if (rightEyeBone.current) {
      rightEyeBone.current.rotation.y = THREE.MathUtils.lerp(
        rightEyeBone.current.rotation.y,
        x * 0.3, // Scale rotation
        0.1 // Smoothing
      );
      rightEyeBone.current.rotation.x = THREE.MathUtils.lerp(
        rightEyeBone.current.rotation.x,
        y * 0.3, // Scale rotation
        0.1 // Smoothing
      );
    }
  });
  // Track head or eye end


  // random gestures 
  // const [gesture, setGesture] = useState<string>(() => gestures[Math.floor(Math.random() * gestures.length)]);

  // // Function to select a random gesture
  // const getRandomGesture = React.useCallback(() => {
  //   let newGesture;
  //   do {
  //     newGesture = gestures[Math.floor(Math.random() * gestures.length)];
  //   } while (newGesture === gesture); // Avoid repeating the current gesture
  //   return newGesture;
  // }, [gesture]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setGesture(getRandomGesture);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [getRandomGesture]);

  // useEffect(() => {
  //   setAnimate(gesture)

  //   return () => {

  //   }
  // }, [gesture])



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
