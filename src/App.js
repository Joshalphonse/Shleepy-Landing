import React, { useRef, useState, useEffect, useCallback } from "react";
import { render } from "react-dom";
import { useTransition, animated } from "react-spring";
import "./styles.css";

function App() {
  const ref = useRef([]);
  const [items, set] = useState([]);
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#C7ABAA"
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#C7ABAA" },
      { transform: "perspective(600px) rotateX(0deg)" }
    ],
    leave: [
      { color: "#C7ABAA" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 }
    ],
    update: { color: "#C7ABAA" }
  });

  const reset = useCallback(() => {
    ref.current.map(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(setTimeout(() => set(["Location", "Based"]), 2000));
    ref.current.push(setTimeout(() => set(["GPS Alarm"]), 5000));
    ref.current.push(setTimeout(() => set(["Shleepy"]), 8000));
  }, []);

  useEffect(() => void reset(), []);

  return (
    <div>
      <div>
        {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
          <animated.div
            className="transitions-item"
            key={key}
            style={rest}
            onClick={reset}
          >
            <animated.div style={{ overflow: "hidden", height: innerHeight }}>
              {item}
            </animated.div>
          </animated.div>
        ))}
      </div>
      <div>
        <img class="shleepylogo" alt="logo" src="0.png" />
      </div>
      <img
        alt="appstores"
        class="appstores"
        src="Google-Play-and-Apple-App-Store-Logos-Two-Up.png"
      />
    </div>
  );
}

export default App;
