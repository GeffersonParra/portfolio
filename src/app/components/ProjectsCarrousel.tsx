"use client";
import { useRef } from "react";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Projects } from "../projects";
import { FaGithub } from "react-icons/fa";
import { TbExternalLink } from "react-icons/tb";
import { useTheme } from "./ThemeProvider";

interface ProjectsCarrouselProps {
  setSelectedImage: (image: object | null) => void;
}

export const ProjectsCarrousel = ({
  setSelectedImage,
}: ProjectsCarrouselProps) => {
  const { theme } = useTheme();
  const locale = useLocale() as "es" | "en";
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="relative w-full group">
      <div className="absolute -top-12 right-0 flex gap-2">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full transition-all cursor-pointer"
          style={{ color: "var(--text-primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--card-overlay-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full transition-all cursor-pointer"
          style={{ color: "var(--text-primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--card-overlay-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 scrollbar-hide snap-x snap-mandatory"
      >
        {Projects({theme}).map((project: any, idx: number) => (
          <div
            key={idx}
            className="w-xl h-150 shrink-0 border-static snap-start flex flex-col overflow-hidden group/card"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <div className="flex w-full h-full group/gallery">
              {project.photos.slice(0, 6).map((photo: any, pIdx: number) => (
                <div
                  key={pIdx}
                  className="relative h-full grow transition-all duration-500 ease-in-out hover:[flex-grow:40] cursor-pointer overflow-hidden group-hover/gallery:opacity-40 hover:!opacity-100"
                  onClick={() => setSelectedImage(photo)}
                >
                  <img
                    src={photo.src}
                    alt={`${project.name} ${pIdx}`}
                    className={`absolute inset-0 w-full h-full ${project.contain ? "object-contain" : "object-cover"}`}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{ backgroundColor: "var(--card-overlay)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--card-overlay)")
                    }
                  />
                </div>
              ))}
            </div>
            <div className="p-4 w-full">
              <h3
                className="text-xl tracking-tighter"
                style={{ color: "var(--text-primary)" }}
              >
                {project.name}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {project.description[locale]}
              </p>
              <p className="mt-4" style={{ color: "var(--text-muted)" }}>
                {project.builtwith}
              </p>
            </div>
            <div className="p-4 w-full flex justify-between">
              <div className="flex gap-3">
                {project.icons.map((icon: any, idx: number) => icon)}
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/github flex items-center relative transition-all duration-300"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span className="invisible opacity-0 translate-x-4 group-hover/github:visible group-hover/github:opacity-100 group-hover/github:translate-x-0 transition-all duration-300 absolute right-[110%] whitespace-nowrap bg-[#852292] text-white text-xs font-bold py-1 px-3 rounded-full pointer-events-none">
                    {locale === "es" ? "Ver en GitHub" : "View on GitHub"}
                  </span>
                  <FaGithub className="text-[42px] group-hover/github:bg-[#852292] group-hover/github:text-white rounded-full p-1 transition-all duration-300 relative z-10" />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  className="flex flex-col items-end justify-end relative"
                  style={{ color: "var(--text-primary)" }}
                >
                  <TbExternalLink className="text-4xl" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
