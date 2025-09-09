"use client";

import { useState } from "react";

export default function Hero() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Simulate some action
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Our Amazing Platform</h1>
        <p className="hero-subtitle">
          Build, deploy, and scale your applications with ease. Experience the
          power of modern web development.
        </p>
        <button
          className="cta-button"
          onClick={handleClick}
          data-testid="cta-button"
        >
          {isClicked ? "Thanks for clicking!" : "Get Started Today"}
        </button>
      </div>
    </section>
  );
}
