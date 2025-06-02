// src/hooks/useSpeedDetection.js
import { useEffect, useState } from "react";

export default function useSpeedDetection(videoEl) {
  const [currentSpeed, setCurrentSpeed] = useState(0);

  useEffect(() => {
    if (!videoEl) return;

    const interval = setInterval(() => {
      // Simulate speed between 10-100 km/h
      const speed = Math.floor(Math.random() * 90 + 10);
      setCurrentSpeed(speed);

      const now = new Date();
      const log = {
        timestamp: now.toISOString(),
        speed,
      };

      const logs = JSON.parse(localStorage.getItem("speedLogs") || "[]");
      logs.push(log);
      localStorage.setItem("speedLogs", JSON.stringify(logs));
    }, 2000); // Simulate every 2s

    return () => clearInterval(interval);
  }, [videoEl]);

  return currentSpeed;
}
