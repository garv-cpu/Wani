// src/App.jsx
import { useRef, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import SpeedMeter from "./components/SpeedMeter";
import DataTable from "./components/DataTable";
import ExportButtons from "./components/ExportButtons";
import useCarDetection from "./hooks/useCarDetection";

function App() {
  const [videoEl, setVideoEl] = useState(null);
  const speed = useCarDetection(videoEl);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <h1 className="text-center text-4xl font-bold p-4">WANI</h1>
      <VideoFeed onFrame={setVideoEl} />
      <SpeedMeter speed={speed} />
      <ExportButtons />
      <DataTable />
    </div>
  );
}

export default App;
