import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

interface ModelProps {
  modelUrl: string;
}

const Model: React.FC<ModelProps> = ({ modelUrl }) => {
  const extension = modelUrl.split(".").pop()?.toLowerCase();

  const model = useLoader(
    extension === "stl" ? STLLoader : OBJLoader,
    modelUrl
  );

  return <primitive object={model} scale={1.5} />;
};

const ModelViewer: React.FC<ModelProps> = ({ modelUrl }) => {
  return (
    <Canvas style={{ width: "600px", height: "800px", background: "gray" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Model modelUrl={modelUrl} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
