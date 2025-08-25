"use client";
import { FC } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  image,
  title,
  description,
  technologies,
  githubLink,
  liveLink,
}) => {
  return (
    <div className="relative w-[450px] h-[520px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-sm"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 space-y-3">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs text-white bg-white/20 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-2">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              className="text-white text-xl hover:text-cyan-400 transition-colors"
            >
              <FaGithub />
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              className="text-white text-xl hover:text-pink-400 transition-colors"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>

      {/* Double Neon Border */}
      <div className="card-border absolute inset-0 pointer-events-none">
        <div className="line1 absolute w-[calc(100%-8px)] h-[calc(100%-8px)] border-4 border-image-gradient rounded-xl top-2 left-2 rotate-[1deg]" />
        <div className="line2 absolute w-[calc(100%-8px)] h-[calc(100%-8px)] border-4 border-image-gradient rounded-xl top-6 left-6 -rotate-[1deg]" />
      </div>
    </div>
  );
};

export default ProjectCard;
