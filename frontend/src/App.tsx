import { useState } from "react";
import axios from "axios";
import ModelViewer from "./ModelViewer";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [modelUrl, setModelUrl] = useState<string>("");
  const [exportedFile, setExportedFile] = useState<string>("");

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

  const handleExport = async () => {
    if (!modelUrl) {
      alert("No file uploaded for conversion.");
      return;
    }

    try {
      const filename = modelUrl.split("/").pop();
      const response = await axios.post<{ exported_filename: string }>(
        "http://localhost:5000/export",
        { filename },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.exported_filename) {
        setExportedFile(`http://localhost:5000/exports/${response.data.exported_filename}`);
      }
    } catch (error) {
      console.error("Error exporting file:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>3D Model Viewer</h1>
      <input type="file" onChange={handleFileChange} accept=".stl,.obj" />
      <button onClick={handleUpload}>Upload</button>

      {/* Show model viewer if a model is uploaded */}
      {modelUrl && <ModelViewer modelUrl={modelUrl} />}

      {/* Show Export Button if an STL or OBJ file is uploaded */}
      {modelUrl && (
        <button onClick={handleExport} style={{ marginTop: "10px", padding: "8px 12px" }}>
          Export Model
        </button>
      )}

      {/* Show Download Link when export is done */}
      {exportedFile && (
        <div>
          <p>Export successful!</p>
          <a href={exportedFile} download>
            <button style={{ padding: "8px 12px", backgroundColor: "green", color: "white" }}>
              Download Exported Model
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
