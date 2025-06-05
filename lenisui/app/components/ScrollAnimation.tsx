"use client";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DottedBackground } from "./DottedBackground";

gsap.registerPlugin(ScrollTrigger);

const myFont = localFont({
  src: "../../public/TiposkaR.woff2",
});

export function ScrollAnimation() {
  const [videoReady, setVideoReady] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    const containerEl = containerRef.current;
    const videoWrapEl = videoWrapRef.current;
    const nextEl = nextRef.current;
    if (!videoEl || !containerEl || !videoWrapEl || !nextEl) return;
    if (!videoEl || !containerEl) return;
    let tl: gsap.core.Timeline | null = null;

    const onMetadata = () => {
      setVideoReady(true);
      const duration = videoEl.duration;
      const scrollPixelsPerSecond = 200;
      const fadeDuration = 6;
      const totalScroll = (duration + fadeDuration) * scrollPixelsPerSecond;

      const proxy = { t: 0 };

      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: containerEl,
            start: "top top",
            end: `+=${totalScroll}`,
            scrub: 0.1,
            pin: true,
            pinSpacing: true,
            markers: false,
          },
        })
        .to(proxy, {
          t: duration,
          duration: duration,
          ease: "none",
          onUpdate: () => {
            videoEl.currentTime = proxy.t;
          },
        })
        .to(
          videoWrapEl,
          {
            opacity: 0,
            duration: fadeDuration,
            ease: "none",
          },
          `+=0`
        )
        .fromTo(
          nextEl,
          { opacity: 0 },
          { opacity: 1, duration: fadeDuration, ease: "none" },
          `-=${fadeDuration}`
        );
    };

    const onError = () => {
      console.warn("Video failed to load metadata or source");
    };

    videoEl.addEventListener("loadedmetadata", onMetadata);
    videoEl.addEventListener("error", onError);

    if (videoEl.readyState >= 1) {
      onMetadata();
    }

    return () => {
      videoEl.removeEventListener("loadedmetadata", onMetadata);
      videoEl.removeEventListener("error", onError);
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
        tl = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!parentRef.current || !textRef.current) return;

    let ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: parentRef.current,
            start: "top-=200 center",
            end: "bottom+=300 center",
            scrub: 1,
            markers: false,
          },
        })
        .fromTo(
          textRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, ease: "none" }
        );
    }, parentRef);

    return () => ctx.revert();
  }, []);

    useEffect(() => {
  const handleScroll = () => {
    if (!footerRef.current || !spanRef.current) return;

    const footerRect = footerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollIntoFooter = Math.max(0, windowHeight - footerRect.top);

    const minFont = 22;
    const maxFont = 128;
    const maxScroll = footerRef.current.offsetHeight;
    const progress = Math.min(scrollIntoFooter / maxScroll, 1);

    const fontSize = minFont + (maxFont - minFont) * progress;
    spanRef.current.style.fontSize = `${fontSize}px`;
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  // Initial call
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, []);

  return (
    <>
      <div className="h-[152px] bg-[radial-gradient(at_bottom,_#1f1f1f_0%,_#161515_40%,_#47474700_70%,_#00000000_100%)]"></div>
      <div className="text-center pt-48 bg-[radial-gradient(at_bottom,_#ffb224_0%,_#ff990aa3_40%,_#47474778_70%,_#000_100%)]">
        <span
          className={`${myFont.className} + text-[178px] text-white font-extrabold`}
        >
          Be ready to dive in the immersive experience
        </span>
      </div>
      <div className="text-center h-96 pt-48 bg-[radial-gradient(at_top,_#fdb124_0%,_#be7a10d4_40%,_#2b261fc9_70%,_#ff990a94_100%)]"></div>
      <div
        ref={parentRef}
        className="flex justify-center h-8 bg-gradient-to-b from-[oklch(0.26_0.02_76.41)] via-transparent to-black w-full shadow-[-1px_-3px_207px_109px_rgb(77_51_37)]"
      >
        <span
          ref={textRef}
          className={`${myFont.className} text-white text-5xl tracking-tighter relative bottom-6  text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]`}
          style={{ willChange: "opacity, transform" }}
        >
          Smoothest Scroll Animation You Have Ever Seen
        </span>
      </div>
      <div
        ref={containerRef}
        className="w-full h-screen relative overflow-hidden"
      >
        <div ref={videoWrapRef} className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            muted
            loop={false}
            className="object-cover h-full w-full"
          >
            <source src="/HeroVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative w-full h-[700px]">
          <div className="absolute inset-0 z-0">
            <DottedBackground
              dotColor="#e38500"
              backgroundColor="#0f172a"
              enableVignette={true}
              vignetteColor="rgba(0,0,0,0.9)"
              enableInnerGlow={true}
              innerGlowColor="rgba(255,255,255,0.7)"
              dotSize={4}
              dotSpacing={10}
            />
          </div>
          <div
            ref={nextRef}
            className="absolute inset-0 flex justify-center items-end opacity-0 z-20 "
          >
            <div className="flex flex-col ml-16 justify-center items-center">
              <span  className={`${myFont.className} text-7xl text-white`} style={{ willChange: "opacity, transform" }}>
                Experience seamless, smooth modern animation effects
              </span>
              <Image
                className=""
                src="/WomanBright2048.webp"
                width={800}
                height={800}
                alt="Picture of the author"
              />
            </div>
          </div>
        </div>
      </div>
      <footer ref={footerRef} className="w-full h-screen bg-gradient-to-b from-transparent to-[#ffb224] flex justify-center items-center">
        <span ref={spanRef} style={{ transition: "font-size 0.15s linear" }} className={`${myFont.className} text-center text-white`}>More Animations<br/> to come</span>
      </footer>
    </>
  );
}
