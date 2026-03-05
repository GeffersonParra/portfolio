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
    <section className="grow w-full flex flex-col items-center pl-36 pr-36 pt-24 font-family-lack h-screen transition-colors duration-300" id="brief">
      <div className="w-full flex items-center grow relative">
        <div className="flex flex-col gap-6 h-full w-full">
          <p className="w-full text-start font-family-lack-line text-6xl">
            {t("experienceTitle")}
          </p>
          <div className="w-full grid grid-cols-2 pt-2">
            <div className="col-span-1 text-3xl">
              <p className="flex items-center gap-3">
                <GiGraduateCap />
                {t("educationTitle")}
              </p>
              <div className="w-full flex flex-col gap-4 py-4">
                {Array.isArray(educationData) &&
                  educationData.map((edu: any, index: number) => (
                    <div key={index} className="">
                      <div className="text-[1.2rem] opacity-60 flex gap-3 items-center mb-1">
                        <FaCalendar className="text-[1rem]" />
                        <p>{edu.yearEnd}</p>
                      </div>
                      <h3 className="text-xl font-bold leading-tight">
                        {edu.title}
                      </h3>
                      <p className="text-[1rem] mt-1 flex items-center gap-1">
                        <TiLocation />
                        {edu.location}
                      </p>
                      {edu.subtexts && (
                        <ul className="list-disc my-5 space-y-2 ml-7">
                          {edu.subtexts.map((sub: string, i: number) => (
                            <li key={i} className="text-sm opacity-70">
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-span-1 text-3xl text-right">
              <p className="flex items-center justify-end gap-3">
                <FaCode />
                {t("jobTitle")}
              </p>
              <div className="w-full flex flex-col gap-4 py-4">
                {Array.isArray(workData) &&
                  workData.map((job: any, index: number) => (
                    <div key={index} className="">
                      <span className="text-xl opacity-60 flex justify-end items-center gap-3">
                        <FaCalendar className="text-[1rem]" />
                        {job.yearEnd}
                      </span>
                      <h3 className="text-xl font-bold leading-tight">
                        {job.occupation} - {job.title}
                      </h3>
                      <p className="text-[1rem] mt-1 flex items-center gap-1 justify-end">
                        <TiLocation />
                        {job.location}
                      </p>
                      <p className="text-sm mt-2">{job.observation}</p>
                    </div>
                  ))}
              </div>
            </div>
            
          </div>
          <p className="w-full text-start font-family-lack-line text-6xl">
            {t("currentlyLearningTitle")}
          </p>
          <p className="w-full text-start font-family-lack">
            {t("currentlyLearning")}
          </p>
        </div>
      </div>
    </section>
  );
}
