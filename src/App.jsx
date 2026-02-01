import { useEffect, useRef, useState } from "react";
import "./App.css";
import heartImage from "./assets/lamour-en-ligne.png";
import gifImage from "./assets/minion.gif";
import nounours from "./assets/nounours.png";

function App() {
  const btnRef = useRef(null);
  const btnRef2 = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    let offsetX = 0;
    let offsetY = 0;

    const REACTION_DISTANCE = 70;
    const MOVE_STEP = 10;
    const RETURN_FORCE = 0.92;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();

      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const dx = btnX - e.clientX;
      const dy = btnY - e.clientY;

      const distance = Math.hypot(dx, dy);

      if (distance < REACTION_DISTANCE) {
        const nx = dx / distance;
        const ny = dy / distance;

        offsetX += nx * MOVE_STEP;
        offsetY += ny * MOVE_STEP;
      } else {
        offsetX *= RETURN_FORCE;
        offsetY *= RETURN_FORCE;
      }

      btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [showResponse, setShowResponse] = useState(false);

  return (
    <div className="App">
      <main>
        <img src={nounours} alt="Nounours" className="heart-image" />

        {!showResponse && (
          <div>
            <p className="text-invit">Princia, will you be my valentine?</p>
            <div className="button-block">
              <button id="button-yes" onClick={() => setShowResponse(true)}>
                Yes
              </button>

              <div className="no-wrapper">
                <button ref={btnRef} id="fleeBtn" className="button-no">
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {showResponse && (
          <div className="response-block">
            <p className="response-text">Love you too, babe! ❤️</p>
            <img src={gifImage} alt="Minion" className="response-gif" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
