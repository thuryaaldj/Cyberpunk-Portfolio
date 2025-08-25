"use client";
import { useEffect, useRef, useState, JSX } from "react";
import gsap from "gsap";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import Projects from "../../components/sections/Project";
import Contact from "../../components/sections/Contact";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  // Generate particles once
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

  // GSAP animations
  useEffect(() => {
    if (!containerRef.current || particles.length === 0) return;

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
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
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

      {/* Page Content */}
      <Navbar />
      <Hero />
      <Projects />
      <Contact/>
    </div>
  );
}
