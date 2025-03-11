import { useState } from "react";
import axios from "axios";
import ModelViewer from "./ModelViewer";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [modelUrl, setModelUrl] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<{ filename: string }>(
        "http://localhost:5000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.filename) {
        setModelUrl(`http://localhost:5000/models/${response.data.filename}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>3D Model Viewer</h1>
      <input type="file" onChange={handleFileChange} accept=".stl,.obj" />
      <button onClick={handleUpload}>Upload</button>
      {modelUrl && <ModelViewer modelUrl={modelUrl} />}
    </div>
  );
};

export default App;
