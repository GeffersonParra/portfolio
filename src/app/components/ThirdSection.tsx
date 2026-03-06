import { useTranslations } from "next-intl";
import { ProjectsCarrousel } from "./ProjectsCarrousel";

interface ThirdSectionProps {
  setSelectedImage: (image: object | null) => void;
}

export default function ThirdSection({ setSelectedImage }: ThirdSectionProps) {
  const t = useTranslations("Texts");

  return (
    <section
      className="w-full flex flex-col items-center px-6 md:px-12 lg:px-24 xl:px-36 pt-16 md:pt-24 font-family-lack min-h-screen transition-colors duration-300"
      style={{ color: "var(--text-primary)" }} 
      id="projects"
    >
      <div className="w-full flex items-center grow relative py-10 lg:py-0">
        <div className="flex flex-col gap-6 md:gap-10 h-full w-full relative">
          
          <p className="w-full text-start font-family-lack-line text-4xl md:text-5xl lg:text-6xl">
            {t("projects")}
          </p>
          <div className="w-full grow flex items-center justify-center">
            <ProjectsCarrousel setSelectedImage={setSelectedImage} />
          </div>
        </div>
      </div>
    </section>
  );
}