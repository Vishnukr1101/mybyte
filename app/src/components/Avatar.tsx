// https://models.readyplayer.me/67330cd948b71f68bc0fe89a.glb?useQuantizeMeshOptCompression=true&quality=high&textureQuality=high&morphTargets=ARKit,Oculus Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown&pose=A
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { idleAnimations, visemeMap } from "../utils";

import { randInt } from "three/src/math/MathUtils.js";
import AvatarContext from "../hooks/AvatarContext";

// Type definitions for better TypeScript support
interface VisemeData {
  time: number;
  type: string;
  value: string;
}

interface AvatarMesh extends THREE.SkinnedMesh {
  morphTargetDictionary: { [key: string]: number };
  morphTargetInfluences: number[];
}

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


const Avatar = React.memo((props: Props) => {
  const group = useRef<THREE.Group>(null);

  const { isAvatarReady, setIsAvatarReady, audioUrl, visemeData } = useContext(AvatarContext);

  // Keyboard controls
  const keyboardState = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keyboardState.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keyboardState.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Sort viseme data by time for efficient lookup and add proper typing
  const sortedVisemeData = useMemo(() => {
    if (!visemeData || !Array.isArray(visemeData)) return [];
    return [...(visemeData as VisemeData[])].sort((a: VisemeData, b: VisemeData) => a.time - b.time);
  }, [visemeData]);

  // const visemeLength = useMemo(() => Object.keys(visemeMap).length, [])

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

  useEffect(() => {
    if (group.current) {
      group.current.position.copy(avatarPosition);
      group.current.rotation.set(
        props?.rotate?.x || 0,
        props?.rotate?.y || 0,
        props?.rotate?.z || 0
      );
    }
  }, [avatarPosition, props.rotate]);

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
  }, [actions, group, setIsAvatarReady]);

  useEffect(() => {
    stop();
    if (audioUrl) {
      load(audioUrl, {
        autoplay: true,
        onend: handleAudioEnd,
        format: "mp3",
      });
    }

    return () => {
      // Cleanup: reset morph targets when component unmounts or audio changes
      resetMorphTargets(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, audioUrl, stop]);

  useFrame(() => {
    if (nodes?.Wolf3D_Avatar) {
      const currentTime = Date.now();
      const elapsedTimeSinceLastBlink = currentTime - lastBlinkTime.current;

      if (elapsedTimeSinceLastBlink >= randInt(1000, 5000)) {
        const { eyeBlinkLeft, eyeBlinkRight } =
          (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetDictionary;
        blink(eyeBlinkLeft, eyeBlinkRight);
        lastBlinkTime.current = currentTime;
      }
    }
  });

  const lerpMorphTarget = (target: string, value: number, speed = 0.1) => {
    if (nodes?.Wolf3D_Avatar && (nodes?.Wolf3D_Avatar as AvatarMesh)?.morphTargetDictionary) {
      // If target is a phoneme, map it to the correct morph target
      const morphTarget = visemeMap[target] || target;

      const index = (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetDictionary[morphTarget];
      if (
        index === undefined ||
        (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[index] === undefined
      ) {
        return;
      }
      (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[index] = THREE.MathUtils.lerp(
        (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[index],
        value,
        speed,
      );
    }
  };

  const resetMorphTargets = (smooth = true) => {
    if (!nodes?.Wolf3D_Avatar) return;
    Object.values(visemeMap).forEach((morphTargetName) => {
      const index = (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetDictionary[morphTargetName];
      if (index !== undefined) {
        if (smooth) {
          (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[index] = THREE.MathUtils.lerp(
            (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[index],
            0,
            morphTargetSmoothing,
          );
        } else {
          // Immediate reset
          (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[index] = 0;
        }
      }
    });
  };

  useFrame(() => {
    // Smile
    lerpMorphTarget("mouthSmileRight", 0.2, 0.5);
    lerpMorphTarget("mouthSmileLeft", 0.2, 0.5);

    // Handle lip sync during audio playback
    if (isAvatarReady && sortedVisemeData && playing) {
      const currentTime = getPosition() * 1000; // Convert to milliseconds

      // Reset all viseme morph targets first
      Object.values(visemeMap).forEach((morphTargetName) => {
        if (nodes?.Wolf3D_Avatar && (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetDictionary) {
          const index = (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetDictionary[morphTargetName];
          if (index !== undefined) {
            (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[index] = THREE.MathUtils.lerp(
              (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[index],
              0,
              morphTargetSmoothing,
            );
          }
        }
      });

      // Find the current viseme based on audio time
      let currentViseme: VisemeData | null = null;
      for (let i = 0; i < sortedVisemeData.length; i++) {
        const viseme = sortedVisemeData[i];
        if (currentTime >= viseme.time) {
          currentViseme = viseme;
        } else {
          break; // Since visemes are chronologically ordered
        }
      }

      // Apply the current viseme morph target
      if (currentViseme && currentViseme.value !== "sil") {
        lerpMorphTarget(currentViseme.value, 1, 0.3);
      }

      // Handle animation transitions
      if (actions[animate] && actions[animate]?.time) {
        if (
          actions[animate].time >
          actions[animate].getClip().duration - ANIMATION_FADE_TIME
        ) {
          // TODO: Fix talking animation loop
          // setAnimate((animation) =>
          //   animation === "Talking" ? "Talking" : "Talking",
          // ); // Could load more type of animations and randomization here
        }
      }
    } else if (!playing) {
      // Reset all viseme morph targets when not playing
      resetMorphTargets(true);
    }
  });

  const handleAudioEnd = () => {
    // "Audio ended - resetting morph targets"
    resetMorphTargets(false); // Immediate reset when audio ends
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

  const blink = (eyeBlinkLeft: number, eyeBlinkRight: number) => {
    (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[eyeBlinkLeft] = 1;
    (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[eyeBlinkRight] = 1;

    setTimeout(() => {
      (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[eyeBlinkLeft] = 0;
      (nodes.Wolf3D_Avatar as AvatarMesh).morphTargetInfluences[eyeBlinkRight] = 0;
    }, 100);
  };

  useEffect(() => {
    if (props?.onPlayStateChange) {
      props.onPlayStateChange(playing);
    }

    return () => { };
  }, [playing, props]);

  useEffect(() => {
    mute(props.isMuted || false);

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

  useFrame((state, delta) => {
    const { w, a, s, d, W, A, S, D, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } = keyboardState.current;

    // Check if any movement key is pressed
    const forward = w || W || ArrowUp;
    const backward = s || S || ArrowDown;
    const left = a || A || ArrowLeft;
    const right = d || D || ArrowRight;

    // Movement Logic
    if (forward || backward || left || right) {
      const speed = 2.5 * delta;

      // Calculate movement vector
      // Mapping: W/Up -> -Z (Away), S/Down -> +Z (Towards), A/Left -> -X, D/Right -> +X
      const moveX = (left ? -1 : 0) + (right ? 1 : 0);
      const moveZ = (forward ? -1 : 0) + (backward ? 1 : 0);

      if (moveX !== 0 || moveZ !== 0) {
        const moveVector = new THREE.Vector3(moveX, 0, moveZ).normalize();

        if (group.current) {
          // Update Position
          group.current.position.addScaledVector(moveVector, speed);

          // Update Camera and Controls to follow
          const movement = moveVector.clone().multiplyScalar(speed);
          state.camera.position.add(movement);
          if (state.controls) {
            // @ts-expect-error: controls is added by OrbitControls makeDefault
            state.controls.target.add(movement);
          }

          // Update Rotation to face movement direction
          // atan2(x, z) gives the angle from Z axis
          const targetRotation = Math.atan2(moveVector.x, moveVector.z);

          // Smooth rotation
          const currentRotation = group.current.rotation.y;
          let angleDiff = targetRotation - currentRotation;

          // Normalize angle difference to [-PI, PI]
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

          // Simple lerp for rotation
          group.current.rotation.y += angleDiff * 10 * delta;
        }

        if (animate !== "walking") {
          setAnimate("walking");
        }
      }
    } else {
      // If not moving and current animation is walking, switch back to idle/gesture
      if (animate === "walking") {
        setAnimate(gesture);
      }
    }
  });
  // Track head or eye end


  // random gestures
  const [gesture, setGesture] = useState<string>(() => idleAnimations[Math.floor(Math.random() * idleAnimations.length)]);

  // Function to select a random gesture
  const getRandomGesture = React.useCallback(() => {
    let newGesture;
    do {
      newGesture = idleAnimations[Math.floor(Math.random() * idleAnimations.length)];
    } while (newGesture === gesture); // Avoid repeating the current gesture
    return newGesture;
  }, [gesture]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGesture(getRandomGesture);
    }, 30000); // Changed from 5000 to 30000 (30 seconds)

    return () => clearInterval(interval);
  }, [getRandomGesture]);

  useEffect(() => {
    // Only switch to gesture if we are NOT walking
    const k = keyboardState.current;
    const isWalking = k.w || k.W || k.a || k.A || k.s || k.S || k.d || k.D || k.ArrowUp || k.ArrowDown || k.ArrowLeft || k.ArrowRight;

    if (!isWalking) {
      setAnimate(gesture);
    }
  }, [gesture]);



  return (
    <group
      userData={{ name: "Armature" }}
      scale={avatarScale}

      dispose={null}
      ref={group}
    >
      <primitive object={nodes?.Hips} />
      {nodes?.Wolf3D_Avatar && (
        <skinnedMesh
          castShadow
          receiveShadow
          name="Wolf3D_Avatar"
          geometry={(nodes?.Wolf3D_Avatar as AvatarMesh)?.geometry}
          material={materials?.Wolf3D_Avatar}
          skeleton={(nodes?.Wolf3D_Avatar as AvatarMesh)?.skeleton}
          morphTargetDictionary={(nodes?.Wolf3D_Avatar as AvatarMesh)?.morphTargetDictionary}
          morphTargetInfluences={(nodes?.Wolf3D_Avatar as AvatarMesh)?.morphTargetInfluences}
        />
      )}
    </group>
  );
});

export default Avatar;
