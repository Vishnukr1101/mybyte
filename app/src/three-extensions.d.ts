declare module "three/examples/jsm/loaders/DRACOLoader" {
  import { Loader } from "three";
  export class DRACOLoader extends Loader {
    setDecoderPath(path: string): this;
    setDecoderConfig(config: object): this;
    setWorkerLimit(workerLimit: number): this;
    dispose(): void;
  }
}

declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { Loader, LoadingManager, Group } from "three";
  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    setDRACOLoader(dracoLoader: DRACOLoader): this;
  }
  export interface GLTF {
    scene: Group;
    scenes: Group[];
    animations: unknown[];
    cameras: unknown[];
    asset: object;
  }
}

declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera } from "three";
  import { EventDispatcher } from "three";
  import { Vector3 } from "three";

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);

    object: Camera;
    domElement: HTMLElement | Document;

    // API
    enabled: boolean;
    target: Vector3;

    // Event Handling
    addEventListener: (
      type: string,
      listener: (event: unknown) => void
    ) => void;
    removeEventListener: (
      type: string,
      listener: (event: unknown) => void
    ) => void;
    dispatchEvent: (event: { type: string; target: unknown }) => void;

    // Control Methods
    update(): void;
    dispose(): void;
  }
}
