import React, { useState, useRef, useEffect, useMemo, useContext, useCallback } from "react";
import {
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Avatar from "./Avatar";
import * as THREE from "three";

import { degToRad } from "three/src/math/MathUtils.js";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
};

const morphTargets =
  "ARKit,Oculus Visemes,mouthOpen,mouthSmile,eyesClosed,eyesLookUp,eyesLookDown";

const avatarUrl = `https://models.readyplayer.me/67330cd948b71f68bc0fe89a.glb?useQuantizeMeshOptCompression=true&quality=high&textureQuality=high&morphTargets=${morphTargets}&pose=A`;

import { getSpeech } from "../api/speech";
import AvatarContext from "../hooks/AvatarContext";

const EnvironmentSpace: React.FC<Props> = React.memo((props) => {
  const {
    camera: sceneCameraPosition,
    avatar,
    viewMode = false,
  } = props;
  const { camera } = useThree();

  const background = "the_great_drawing_room.glb";

  // const [audioUrl, setAudioUrl] = useState("");
  // const [visemeData, setVisemeData] = useState([]);
  const [isRoomReady, setIsRoomReady] = useState(false);
  const { isAvatarReady, setAudioUrl, setVisemeData, setIsFetching } = useContext(AvatarContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  // Save camera position and target to localStorage when controls change
  const handleControlsChange = () => {
    if (controlsRef.current) {
      console.log("camera: ", camera.position.toArray())
      console.log(" camera zoom: ", camera.zoom)
      console.log("orbital: ", controlsRef.current.target.toArray())
      camera.position.toArray()
      controlsRef.current.target.toArray()
    }
  };

  const getSpeechData = useCallback(
    async (text: string) => {
      try {
        setIsFetching(true)
        if (!text) {
          setIsFetching(false);
          return false;
        }
        const response = await getSpeech(text).catch((error) => {
          console.error("Failed to get speech, Error: ", error);
        });

        if (response) {
          if (response.headers) {
            // Extract visemes from response headers
            const visemeData = response.headers.get("x-viseme");
            if (visemeData) {
              const viseme = JSON.parse(visemeData || '');
              setVisemeData(viseme);
            } else {
              setIsFetching(false);
            }
          }

          if (response.body) {
            // Set the audio source
            const reader = response.body.getReader();
            const chunks = [];

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
            }

            // Combine all chunks into a single Uint8Array
            const audioBuffer = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
            let offset = 0;
            chunks.forEach((chunk) => {
              audioBuffer.set(chunk, offset);
              offset += chunk.length;
            });

            // Create a Blob from the buffer
            const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
            const audioBlobUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioBlobUrl);
            setIsFetching(false);
          }
        }
      } catch (error) {
        console.error("Failed to fetch speech, Error: ", error);
        setIsFetching(false);
      }
    },
    [setAudioUrl, setIsFetching, setVisemeData]
  )


  useEffect(() => {
    if (avatar?.speechText && avatar?.speechText.trim() && isAvatarReady) {
      getSpeechData(avatar?.speechText)
    }

    return () => { }
  }, [avatar?.speechText, isAvatarReady])

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
  }, [sceneCameraPosition, camera.position]);

  const { gl, size } = useThree();

  useEffect(() => {
    // Set the pixel ratio to the device's pixel ratio
    gl.setPixelRatio(window.devicePixelRatio);

    // Set the size of the renderer to the canvas size
    gl.setSize(size.width, size.height);
  }, [gl, size]);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const loader = useMemo(() => new GLTFLoader(), []);
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
      (error) => {
        setIsRoomReady(false);
        console.error("An error occurred while loading the GLB file:", error);
      },
    );
  }, [background, loader]);

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
        makeDefault
        ref={(ref) => (controlsRef.current = ref)}
        enableDamping
        enableZoom={!viewMode}
        enablePan={!viewMode}
        onEnd={handleControlsChange}
      />

      {isRoomReady && (
        <Avatar
          scale={avatar?.scale || 2}
          url={avatarUrl}
          position={avatar?.position}
          rotate={avatar?.rotate}
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
