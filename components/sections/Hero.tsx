"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Text + Arrows Animation
    const tl = gsap.timeline();
    tl.from(containerRef.current.querySelectorAll(".hero-line"), {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.fromTo(
      ".nav-arrow",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "all",
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6"
    >
      {/* Text */}
      <h1 className="hero-line text-4xl sm:text-6xl font-extrabold text-text-main leading-tight">
        <span className="text-accent-cyan">Hey! </span> I'm Thuraya
      </h1>
      <p className="hero-line mt-4 max-w-xl text-lg sm:text-xl text-text-secondary">
        Frontend Developer crafting{" "}
        <span className="text-accent-magenta font-semibold">
          brutalist & cyberpunk
        </span>{" "}
        web experiences.
      </p>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 w-full flex justify-between px-12">
        <a href="#projects" className="nav-arrow glass group left-arrow">
          ↓ <span className="tooltip">My Work</span>
        </a>
        <a href="#contact" className="nav-arrow glass group right-arrow">
          ↓ <span className="tooltip">Contact Me</span>
        </a>
      </div>
    </section>
  );
}
