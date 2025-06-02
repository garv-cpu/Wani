// src/components/SpeedMeter.jsx
export default function SpeedMeter({ speed }) {
    return (
      <div className="text-center text-3xl font-bold text-green-400 p-4">
        Live Speed: {speed} km/h
      </div>
    );
  }
  