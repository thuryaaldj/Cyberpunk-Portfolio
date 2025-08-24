"use client";
import { JSX, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  // ✨ 1. توليد الـ particles
useEffect(() => {
  const generated = Array.from({ length: 40 }).map((_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.floor(Math.random() * 14) + 6;
    const opacity = size < 10 ? 0.4 : size < 15 ? 0.6 : 0.8;

    return (
      <span
        key={i}
        className="particle"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity,
        }}
      />
    );
  });

  setParticles(generated);
}, []);


  // ✨ 2. GSAP animations (بيشتغل بعد ما تنولد العناصر)
  useEffect(() => {
    if (!containerRef.current || particles.length === 0) return;

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

    // Floating shapes
    gsap.to(".floating-shape", {
      x: "random(-40, 40)",
      y: "random(-40, 40)",
      scale: "random(0.9, 1.1)",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".floating-soft", {
      x: "random(-60, 60)",
      y: "random(-60, 60)",
      rotate: "random(-10, 10)",
      scale: "random(0.95, 1.05)",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Particles floating effect
    gsap.to(".particle", {
      x: "random(-40, 40)",
      y: "random(-40, 40)",
      opacity: "random(0.3, 0.8)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.3 },
    });
  }, [particles]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-accent-magenta/20 via-background to-accent-cyan/20" />

      {/* Floating Shapes Layer */}
      <div className="absolute inset-0 -z-20">
        <div className="floating-shape bg-accent-cyan/15 absolute inset-0" />
        <div className="floating-shape bg-accent-magenta/15 absolute inset-0" />
        <div className="floating-soft bg-accent-purple/10 absolute inset-0" />
        <div className="floating-soft bg-accent-cyan/10 absolute inset-0" />
      </div>

      {/* Particle Layer */}
      <div className="absolute inset-0 -z-10 pointer-events-none">{particles}</div>

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
        <a
          href="#projects"
          className="nav-arrow glass group left-arrow"
          aria-label="View My Work"
        >
          ↓
          <span className="tooltip">My Work</span>
        </a>
        <a
          href="#contact"
          className="nav-arrow glass group right-arrow"
          aria-label="Contact Me"
        >
          ↓
          <span className="tooltip">Contact Me</span>
        </a>
      </div>
    </section>
  );
}
