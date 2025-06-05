"use client";

import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { Pixelify_Sans } from "next/font/google";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../../public/TiposkaR.woff2",
});

const pixelifySans = Pixelify_Sans({ subsets: ["latin"] });

function HeroSplineBackground() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        pointerEvents: "auto",
        overflow: "hidden",
      }}
    >
      <Spline
        style={{
          width: "100%",
          height: "100vh",
          pointerEvents: "auto",
        }}
        scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9))
          `,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function HeroContent() {
  return (
    <div
      className={`${myFont.className} text-white px-4 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-end py-16`}
    >
      <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 leading-tight tracking-tighter">
          We're Building
          <br />
          Cool Experiences
        </h1>
      </div>

      <div className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col items-end mb-10">
        <p className="text-base sm:text-lg opacity-80 mb-6 max-w-md text-right">
          Crafting Awesome Stories and <br /> Killer Designs to Make Brand Stand
          Out
        </p>

        <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
          <button className="border border-white text-white font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 w-full sm:w-auto hover:bg-white hover:text-black">
            Contact Us
          </button>
          <button className="pointer-events-auto bg-white text-black font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 hover:scale-105 flex items-center justify-center w-full sm:w-auto">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                fill="orange"
              />
            </svg>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

const HeroSection = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;

          if (screenshotRef.current) {
            screenshotRef.current.style.transform = `translateY(-${
              scrollPosition * 0.5
            }px)`;
          }

          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div
          ref={heroContentRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <HeroContent />
        </div>
      </div>
    </div>
  );
};

export { HeroSection };
