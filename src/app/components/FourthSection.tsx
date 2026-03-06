import { useTranslations, useMessages } from "next-intl";
import { GiGraduateCap } from "react-icons/gi";
import { FaCode } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";

export default function FourthSection() {
  const t = useTranslations("Texts");
  const messages = useMessages() as any;
  const educationData = messages.Education || [];
  const workData = messages.Work || [];

  return (
    <section 
      className="w-full flex flex-col items-center px-6 md:px-12 lg:px-24 xl:px-36 pt-24 font-family-lack min-h-screen transition-colors duration-300 pb-20" 
      id="brief"
    >
      <div className="w-full flex items-center grow relative">
        <div className="flex flex-col gap-8 md:gap-12 h-full w-full">
          <p className="w-full text-start font-family-lack-line text-4xl md:text-5xl lg:text-6xl">
            {t("experienceTitle")}
          </p>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pt-2">
            <div className="flex flex-col text-2xl md:text-3xl">
              <p className="flex items-center gap-3 mb-6 border-b border-white/10 pb-2">
                <GiGraduateCap className="shrink-0" />
                {t("educationTitle")}
              </p>
              <div className="w-full flex flex-col gap-8">
                {Array.isArray(educationData) &&
                  educationData.map((edu: any, index: number) => (
                    <div key={index} className="group">
                      <div className="text-sm md:text-base opacity-60 flex gap-3 items-center mb-2">
                        <FaCalendar className="text-xs md:text-sm" />
                        <p>{edu.yearEnd}</p>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-[--accent-primary] transition-colors">
                        {edu.title}
                      </h3>
                      <p className="text-base mt-2 flex items-center gap-1 opacity-80">
                        <TiLocation />
                        {edu.location}
                      </p>
                      {edu.subtexts && (
                        <ul className="list-disc mt-4 mb-2 space-y-2 ml-5">
                          {edu.subtexts.map((sub: string, i: number) => (
                            <li key={i} className="text-sm opacity-70 leading-relaxed">
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col text-2xl md:text-3xl lg:text-right">
              <p className="flex items-center lg:justify-end gap-3 mb-6 border-b border-white/10 pb-2">
                <FaCode className="shrink-0" />
                {t("jobTitle")}
              </p>
              <div className="w-full flex flex-col gap-8">
                {Array.isArray(workData) &&
                  workData.map((job: any, index: number) => (
                    <div key={index} className="group">
                      <div className="text-sm md:text-base opacity-60 flex items-center gap-3 lg:justify-end mb-2">
                        <FaCalendar className="text-xs md:text-sm" />
                        <p>{job.yearEnd}</p>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-[--accent-secondary] transition-colors">
                        {job.occupation} - {job.title}
                      </h3>
                      <p className="text-base mt-2 flex items-center gap-1 lg:justify-end opacity-80">
                        <TiLocation />
                        {job.location}
                      </p>
                      <p className="text-sm mt-3 leading-relaxed opacity-70">{job.observation}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <p className="w-full text-start font-family-lack-line text-4xl md:text-5xl lg:text-6xl">
              {t("currentlyLearningTitle")}
            </p>
            <p className="w-full text-start font-family-lack text-lg md:text-xl opacity-80 max-w-4xl">
              {t("currentlyLearning")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}