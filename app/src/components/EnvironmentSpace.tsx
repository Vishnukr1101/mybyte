import React, { useState, useRef, useEffect } from "react";
import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import Avatar from "./Avatar";
import * as THREE from "three";

import { degToRad } from "three/src/math/MathUtils.js";

// import { getSpeech } from "api/tts";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { rooms } from "constants/room";

type Props = {
  camera?: {
    orbitalTarget: number[];
    cameraPosition: number[];
  };
  avatar?: {
    url?: string;
    type?: string;
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
    welcomeText?: string;
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
  viewMode?: boolean;
  onReady?: (value: boolean) => void;
};

const morphTargets =
  "ARKit,Oculus Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown";

const avatarUrl = `https://models.readyplayer.me/67330cd948b71f68bc0fe89a.glb?useQuantizeMeshOptCompression=true&quality=high&textureQuality=high&morphTargets=${morphTargets}&pose=A`;

import { useControls } from 'leva'
import { getSpeech } from "../api/speech";

const EnvironmentSpace: React.FC = React.memo((props: Props) => {
  const {
    camera: sceneCameraPosition,
    avatar,
    viewMode = false,
    ...otherProps
  } = props;

  const [isAvatarReady, setIsAvatarReady] = useState(false);

  const background = "white_modern_living_room_4k.glb";

  const [audioUrl, setAudioUrl] = useState("");
  const [visemeData, setVisemeData] = useState([]);
  const [isRoomReady, setIsRoomReady] = useState(false);


  const { camera } = useThree();
  const controlsRef = useRef<typeof OrbitControls | any>();

  // Save camera position and target to localStorage when controls change
  const handleControlsChange = () => {
    console.log("camera: ", camera.position.toArray())
    console.log("orbital: ", controlsRef.current.target.toArray())
    // camera.position.toArray()
    // controlsRef.current.target.toArray()
  };


  const getSpeechData = async (text: string, voice = "en-US-EmmaNeural") => {
    try {
      if (!text) {
        return false;
      }

      console.log("getSpeech : ", text, voice);
      const response = await getSpeech({
        text,
        voice,
      }).catch((error) => {
        console.error("Failed to get speech, Error: ", error);
      });

      if (response) {
        if (response?.headers) {
          // Extract visemes from response headers
          const visemeData = response?.headers.get("x-viseme");

          const viseme = JSON.parse(visemeData || '');
          setVisemeData(viseme);
        }

        if (response.body) {
          // Set the audio source
          const audio = URL.createObjectURL(
            new Blob([response.body], { type: "audio/mpeg" }),
          );

          setAudioUrl(audio);
        }
      }
    } catch (error) {
      console.error("Failed to fetch speech, Error: ", error);
    }
  };

  useEffect(() => {
    if (avatar?.speechText) {
      getSpeechData(avatar?.speechText).then(response => {
        console.log("speech response: ", response)
      }).catch(error => {
        console.log("Failed to get speech : ", error)
      })
    }

    return () => {

    }
  }, [avatar?.speechText])



  useEffect(() => {
    // restore camera & orbital target
    if (
      sceneCameraPosition &&
      sceneCameraPosition?.orbitalTarget &&
      controlsRef.current
    ) {
      const position = sceneCameraPosition?.cameraPosition;
      const target = sceneCameraPosition?.orbitalTarget;

      camera.position.fromArray(position);
      controlsRef.current.target.fromArray(target);
      controlsRef.current.update();
    }
  }, [sceneCameraPosition, controlsRef.current]);

  // useEffect(() => {
  //   if (avatar?.speechText && avatar?.speechVoice && isAvatarReady) {
  //     getSpeechData(avatar?.speechText, avatar?.speechVoice);
  //   }

  //   return () => { };
  // }, [avatar?.speechText, avatar?.speechVoice, isAvatarReady]);

  const { gl, size } = useThree();

  useEffect(() => {
    // Set the pixel ratio to the device's pixel ratio
    gl.setPixelRatio(window.devicePixelRatio);

    // Set the size of the renderer to the canvas size
    gl.setSize(size.width, size.height);
  }, [gl, size]);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    loader.load(
      `/rooms/${background}`,
      (gltf) => {
        setModel(gltf.scene);
        setIsRoomReady(true);
      },
      undefined,
      (error: Error) => {
        setIsRoomReady(false);
        console.error("An error occurred while loading the GLB file:", error);
      },
    );
  }, [background]);

  const handleAvatarReady = () => {
    setIsAvatarReady(true);

    if (props?.onReady) {
      props.onReady(true);
    }
  };

  return (
    <>
      <color attach="background" args={["#212121"]} />
      <ambientLight intensity={1} />

      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

      <directionalLight
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        position={[0, 10, 20]}
        intensity={1} // Lower the intensity value here
        receiveShadow // Add receiveShadow property
      />

      <directionalLight
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        position={[0, 10, -20]}
        intensity={1} // Lower the intensity value here
        receiveShadow // Add receiveShadow property
      />

      <directionalLight
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        position={[20, 10, 0]}
        intensity={1} // Lower the intensity value here
        receiveShadow // Add receiveShadow property
      />

      <directionalLight
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        position={[-20, 10, 0]}
        intensity={1} // Lower the intensity value here
        receiveShadow // Add receiveShadow property
      />

      <pointLight
        args={["white", 1, 100]}
        position={[0, 10, 25]}
        color="#fff"
      />

      <OrbitControls
        args={[camera]}
        // minPolarAngle={0}
        // maxPolarAngle={Math.PI / 2}
        // minAzimuthAngle={-(Math.PI / 2)}
        // maxAzimuthAngle={Math.PI / 2}
        ref={controlsRef}
        enableDamping // Optional: Adds smooth damping to the controls
        enableZoom={!viewMode} // Disable zoom
        enablePan={!viewMode} // Disable pan
        onEnd={handleControlsChange}
      />
      {isRoomReady && (
        <Avatar
          scale={avatar?.scale || 2}
          audioUrl={audioUrl}
          visemeData={visemeData}
          url={avatarUrl}
          position={avatar?.position}
          rotate={avatar?.rotate}
          onReady={handleAvatarReady}
        />
      )}

      {model ? (
        <primitive
          object={model}
          position={[
            avatar?.room?.position?.x || 0,
            avatar?.room?.position?.y || 0,
            avatar?.room?.position?.z || 0,
          ]}
          rotation-x={degToRad(avatar?.room?.rotate?.x || 0)}
          rotation-y={degToRad(avatar?.room?.rotate?.y || 0)}
          rotation-z={degToRad(avatar?.room?.rotate?.z || 0)}
          scale={avatar?.room?.scale || 2}
          receiveShadow
        />
      ) : <></>}
    </>
  );
});


useGLTF.preload(`/rooms/white_modern_living_room_4k.glb.glb`);


export default EnvironmentSpace;
