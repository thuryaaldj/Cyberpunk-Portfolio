"use client";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Home", "What I Do", "Projects", "Contact"];

export default function Navbar() {
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // منطق إظهار/إخفاء الناف حسب اتجاه السكrol
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // أنيميشن GSAP (y + opacity)
  useEffect(() => {
    if (!navContainerRef.current) return;
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.28,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-md rounded-2xl border border-text-secondary/20">
          {/* Logo / Brand */}
          <h1 className="text-lg md:text-xl font-bold text-text-main tracking-wide">
            Thuraya.dev
          </h1>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                className="nav-neon-link"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mode Placeholder (هنوصله لاحقًا بـ Zustand) */}
          <button
            type="button"
            className="btn-cyberpunk hidden md:inline-flex"
            aria-label="Toggle theme mode"
          >
            Mode
          </button>
        </nav>
      </header>
    </div>
  );
}
