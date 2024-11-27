import React, { useState, useEffect } from "react";
import Login from "./SignInUpForm.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Global, css } from '@emotion/react';

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  // Update cursor position for the dot
  useEffect(() => {
    const handlePointerMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // Smooth trailing effect for the ring using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;

    const smoothFollow = () => {
      setDelayedPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(smoothFollow);
    };

    animationFrameId = requestAnimationFrame(smoothFollow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Global
        styles={css`
          body {
            
            background: #cb424e; /* Your desired background color */
            margin: 0; /* Remove default margin */
            height: 100vh; /* Ensure the body takes the full height of the viewport */
          }
        `}
      />
      <div className="App">
        <Login />
      </div>
      {/* Custom Cursor */}
      {/* Dot - Change color to black */}
      <div
        style={{
          
          position: "fixed",
          left: position.x - 3,
          top: position.y - 3,
          width: 6,
          height: 6,
          backgroundColor: 'black', // Change cursor dot color to black
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {/* Ring - Smooth follow */}
      <div
        style={{
         
          position: "fixed",
          left: delayedPosition.x - 24,
          top: delayedPosition.y - 24,
          width: 48,
          height: 48,
          border: isClicked
            ? "none"
            : `1px solid rgba(0, 0, 0, 0.5)`, // Change ring border color to semi-transparent black
          borderRadius: "50%",
          pointerEvents: "none", 
          zIndex: 9998,
        }}
      />
    </ThemeProvider>
  );
};

export default App;