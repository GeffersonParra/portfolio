import { useTranslations } from "next-intl";
import { ProjectsCarrousel } from "./ProjectsCarrousel";
import { useEffect, useState } from "react";

interface ThirdSectionProps {
  setSelectedImage: (image: object | null) => void;
}

export default function ThirdSection({ setSelectedImage }: ThirdSectionProps) {
  const t = useTranslations("Texts");
  return (
    <section
      className="grow w-full flex flex-col items-center pl-36 pr-36 pt-24 font-family-lack h-screen transition-colors duration-300"
      style={{ color: "var(--text-primary)" }} id="projects"
    >
      <div className="w-full flex items-center grow relative">
        <div className="flex flex-col gap-6 h-full w-full">
          <p className="w-full text-start font-family-lack-line text-6xl">
            {t("projects")}
          </p>
          <ProjectsCarrousel setSelectedImage={setSelectedImage} />
        </div>
      </div>
    </section>
  );
}
