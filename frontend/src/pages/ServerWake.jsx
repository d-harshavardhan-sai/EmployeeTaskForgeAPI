import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const tips = [
  "Warming up the server ⚡",
  "Connecting to the database 🔌",
  "Fetching Employee Records 👨‍💼",
  "Loading Task Manager 📝",
  "Almost there… 🚀",
];

export default function ServerWake() {
  const [seconds, setSeconds] = useState(0);
  const [tip, setTip] = useState(tips[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const startTime = Date.now(); // Track wake time

    const timeInterval = setInterval(() => setSeconds((s) => s + 1), 1000);

    const tipInterval = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 2500);

    const checkServer = async () => {
      try {
        await axios.get("https://employeetaskforgeapi.onrender.com/");
        clearInterval(timeInterval);
        clearInterval(tipInterval);

        const wakeTime = ((Date.now() - startTime) / 1000).toFixed(1);
        localStorage.setItem("wakeTime", wakeTime);

        navigate("/login"); // Redirect to login instantly
      } catch {
        setTimeout(checkServer, 3000);
      }
    };

    checkServer();

    return () => {
      clearInterval(timeInterval);
      clearInterval(tipInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-300 text-center p-4">
      <span className="loading loading-spinner loading-lg text-primary mb-5 animate-spin"></span>
      <h2 className="text-lg font-semibold text-secondary animate-pulse">
        🌍 Server is starting… {seconds}s elapsed
      </h2>
      <p className="mt-3 text-sm opacity-70">
        {tip}
      </p>
      <button
        className="btn btn-outline btn-xs mt-6"
        onClick={() => window.location.reload()}
      >
        Retry 🔄
      </button>
    </div>
  );
}
