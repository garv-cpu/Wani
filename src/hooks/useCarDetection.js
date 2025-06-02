// src/hooks/useCarDetection.js
import { useEffect, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

export default function useCarDetection(videoEl) {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (!videoEl) return;

    let model;
    let lastY = null;
    let lastTime = null;

    const loadModelAndDetect = async () => {
      model = await cocoSsd.load();

      const detectLoop = async () => {
        if (videoEl.readyState === 4) {
          const predictions = await model.detect(videoEl);

          const cars = predictions.filter(p =>
            ["car", "truck", "bus"].includes(p.class)
          );

          if (cars.length > 0) {
            const car = cars[0]; // First detected car
            const y = car.bbox[1]; // Vertical position
            const now = Date.now();

            if (lastY !== null && lastTime !== null) {
              const dy = Math.abs(y - lastY); // Movement in pixels
              const dt = (now - lastTime) / 1000; // Time in seconds
              const pxPerSec = dy / dt;

              // Approximate conversion to speed
              const estimatedSpeed = Math.min(Math.round(pxPerSec * 0.5), 180);
              setSpeed(estimatedSpeed);

              // 📸 Capture snapshot
              const canvas = document.createElement("canvas");
              canvas.width = videoEl.videoWidth;
              canvas.height = videoEl.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

              // Crop car
              const [x, y, width, height] = car.bbox;
              const carImage = ctx.getImageData(x, y, width, height);

              const carCanvas = document.createElement("canvas");
              carCanvas.width = width;
              carCanvas.height = height;
              const carCtx = carCanvas.getContext("2d");
              carCtx.putImageData(carImage, 0, 0);

              const snapshot = carCanvas.toDataURL("image/jpeg");

              // Save log with snapshot
              const logs = JSON.parse(localStorage.getItem("speedLogs") || "[]");
              logs.push({
                timestamp: new Date().toISOString(),
                speed: estimatedSpeed,
                snapshot,
              });
              localStorage.setItem("speedLogs", JSON.stringify(logs));
            }

            lastY = y;
            lastTime = now;
          }
        }

        requestAnimationFrame(detectLoop);
      };

      detectLoop();
    };

    tf.ready().then(loadModelAndDetect);
  }, [videoEl]);

  return speed;
}
