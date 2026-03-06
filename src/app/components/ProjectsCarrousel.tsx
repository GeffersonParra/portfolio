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
      const scrollAmount =
        window.innerWidth < 768 ? clientWidth * 0.8 : clientWidth / 2;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full group">
      <div className="absolute -top-14 right-0 flex gap-2 z-30">
        <button
          onClick={() => scroll("left")}
          className="p-3 md:p-2 rounded-full transition-all cursor-pointer bg-black/5 dark:bg-white/5 md:bg-transparent"
          style={{ color: "var(--text-primary)" }}
        >
          <ChevronLeft size={24} className="md:w-5 md:h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-3 md:p-2 rounded-full transition-all cursor-pointer bg-black/5 dark:bg-white/5 md:bg-transparent"
          style={{ color: "var(--text-primary)" }}
        >
          <ChevronRight size={24} className="md:w-5 md:h-5" />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 md:gap-8 scrollbar-hide snap-x snap-mandatory pb-8"
      >
        {Projects({ theme }).map((project: any, idx: number) => (
          <div
            key={idx}
            className="w-[85vw] sm:w-[450px] md:w-xl h-[550px] md:h-150 shrink-0 border-static snap-start flex flex-col overflow-hidden group/card relative"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <div className="flex w-full h-3/5 md:h-full group/gallery">
              {project.photos.slice(0, 6).map((photo: any, pIdx: number) => (
                <div
                  key={pIdx}
                  className="relative h-full grow transition-all duration-500 ease-in-out hover:[flex-grow:15] md:hover:[flex-grow:40] cursor-pointer overflow-hidden group-hover/gallery:opacity-40 hover:!opacity-100"
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
                  />
                </div>
              ))}
            </div>
            <div className="p-4 md:p-6 w-full flex flex-col grow justify-between">
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold tracking-tighter"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-sm line-clamp-2 md:line-clamp-none mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description[locale]}
                </p>
                <p
                  className="mt-3 text-xs md:text-sm font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  {project.builtwith}
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center border-t border-white/10 mt-auto">
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  {project.icons.map((icon: any, idx: number) => (
                    <div key={idx} className="text-xl md:text-2xl">
                      {icon}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/github flex items-center relative"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span className="hidden lg:group-hover/github:block absolute bottom-full mb-2 right-0 whitespace-nowrap bg-[#852292] text-white text-[10px] py-1 px-2 rounded">
                        {locale === "es" ? "GitHub" : "GitHub"}
                      </span>
                      <FaGithub className="text-3xl md:text-[42px] hover:text-[#852292] transition-colors" />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <TbExternalLink className="text-3xl md:text-4xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
