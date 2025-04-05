import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://chestvision-api.onrender.com/predict/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
      setResult({ prediction: "Error during prediction." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>ChestVision: COVID Detection</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <img src={preview} alt="Preview" className="preview" />
      )}

      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Analyzing..." : "Upload and Predict"}
      </button>

      {result && (
        <div className="result">
          <p><strong>Prediction:</strong> {result.prediction}</p>
        </div>
      )}

      <footer>
        Made with ❤️ and ⚡ by Supratim
      </footer>
    </div>
  );
}
