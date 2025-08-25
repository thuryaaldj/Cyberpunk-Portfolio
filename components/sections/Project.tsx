"use client";
import { useEffect, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import projectsData from "@/data/db.json";

type Project = {
  id: number;
  image: string;
  title: string;
  description: string;
  githubLink?: string;
  liveLink?: string;
  technologies: string[];
};

export default function ProjectsSection() {
  const projects: Project[] = projectsData.projects;
  const wrapperRef = useRef<HTMLDivElement | null>(null); // للسكروول العام
  const horizontalRef = useRef<HTMLDivElement | null>(null); // للكروت

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!horizontalRef.current || !wrapperRef.current) return;

    const element = horizontalRef.current;
    const wrapper = wrapperRef.current;
    const scrollWidth = element.scrollWidth - wrapper.offsetWidth;

gsap.to(element, {
  x: -scrollWidth, 
  ease: "none",
  scrollTrigger: {
    trigger: wrapper,
    start: "top top",
    end: () => `+=${scrollWidth}`,
    scrub: true,
    pin: true,
  },
});

// حركة العنوان مع توهج
gsap.fromTo(
  ".hero-line",
  { opacity: 0.6, textShadow: "0px 0px 0px rgba(0,255,255,0)" },
  {
    opacity: 1,
    textShadow: "0px 0px 20px rgba(236,72,153,0.9), 0px 0px 40px rgba(236,72,153,0.7)",
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: wrapper,
      start: "top 70%", // يبدأ التوهج لما يقرب القسم
      toggleActions: "play none none reverse", // يختفي لو طلعت لفوق
    },
  }
);




    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="projects"
      className="relative min-h-screen flex flex-col items-start justify-start px-6 py-12 
                 bg-gradient-to-br from-accent-magenta/20 via-background to-accent-cyan/20 overflow-hidden"
    >
<h2 className="hero-line text-3xl sm:text-6xl font-bold text-text-main leading-tight mb-16">
  My Projects
</h2>


      {/* Container Horizontal */}
      <div
        ref={horizontalRef}
        className="flex gap-6 w-max snap-x snap-mandatory scrollbar-glass"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="card snap-start min-w-[450px] h-[520px] relative overflow-hidden rounded-xl"
          >
            {/* Neon Border */}
            <div className="card-border absolute inset-0 pointer-events-none">
              <div className="line1" />
              <div className="line2" />
            </div>

            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className="card-img w-full h-full object-cover transition-all duration-500 ease-in-out filter hover:blur-sm"
            />

            {/* Content */}
            <div className="card-content absolute bottom-0 w-full p-4 bg-background/70 backdrop-blur-md transition-all duration-500 ease-in-out hover:translate-y-0 -translate-y-16">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-text-secondary mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-accent-cyan/20 text-text-main rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-main hover:text-accent-cyan transition"
                  >
                    <Github size={20} />
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-main hover:text-accent-magenta transition"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
