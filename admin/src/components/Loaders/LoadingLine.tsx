import React, { useEffect, useState } from "react";
import "./loader.css";

export function LoaderLine({ loading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (loading) {
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // API slow feel
          return prev + 5;
        });
      }, 100);
    } else {
      setProgress(100); // API complete → full bar
    }

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="loader-wrapper">
      <div className="loader-track">
        <div
          className="loader-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
