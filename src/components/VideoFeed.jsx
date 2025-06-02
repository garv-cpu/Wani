// src/components/VideoFeed.jsx
import { useEffect, useRef } from "react";

export default function VideoFeed({ onFrame }) {
  const videoRef = useRef(null);

  useEffect(() => {
    async function enableCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }

    enableCamera();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <video
        ref={videoRef}
        className="w-full max-w-xl rounded-xl shadow-lg"
        onPlay={() => onFrame(videoRef.current)}
      />
    </div>
  );
}
