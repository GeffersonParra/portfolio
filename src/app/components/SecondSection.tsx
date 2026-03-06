import { useTranslations } from "next-intl";
import { DashedCircle } from "./DashedCircle";

export default function SecondSection() {
  const t = useTranslations("Texts");
  return (
    <section
      className="w-full flex flex-col items-center px-6 md:px-12 lg:px-24 xl:px-36 font-family-lack min-h-screen lg:h-screen transition-colors duration-300 py-20 lg:py-0"
      style={{ color: 'var(--text-primary)' }}
      id="about"
    >
      <div className="w-full flex items-center grow relative">
        <div className="flex flex-col gap-10 md:gap-14 w-full">
          <p className="w-full text-start font-family-lack-line text-4xl md:text-5xl lg:text-6xl">
            {t("about")}
          </p>
          <div className="flex flex-col lg:flex-row relative">
            <div
              className="border-static flex flex-col h-fit w-full lg:w-8/12 relative p-8 md:p-12 text-xl md:text-2xl lg:text-3xl gap-12 md:gap-24"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <p>{t("about_me")}</p>
              <p>{t("about_me2")}</p>
              <div className="hidden md:flex border-marching [--custom-speed:3s] h-24 w-full max-w-2xl -top-8 left-8 -z-10 absolute" style={{ '--border-color': 'var(--border-accent)' } as any}></div>
              <div className="border-static absolute w-16 h-16 md:w-24 md:h-24 -bottom-8 -left-8 md:-bottom-12 md:-left-12 -z-10 md:flex hidden" style={{ '--custom-border-color': 'var(--accent-primary)' } as any}></div>
              <div className="hidden md:flex border-marching [--custom-speed:5s] absolute w-72 h-70 bottom-6 -right-8 -z-10" style={{ '--border-color': 'var(--accent-secondary)' } as any}></div>
            </div>
            <div className="w-full lg:w-4/12 lg:flex relative h-32 lg:h-fit my-auto hidden">
              <DashedCircle
                className="w-32 h-32 md:w-48 md:h-48 right-0 lg:left-56 rounded-full absolute z-10 top-4 lg:top-auto"
                style={{ backgroundColor: 'var(--bg-primary)' }}
                speed="20s"
              />
              <DashedCircle
                className="w-20 h-20 md:w-28 md:h-28 left-10 lg:left-5 -top-20 lg:-top-12 rounded-full absolute"
                style={{ backgroundColor: 'var(--bg-primary)' }}
                speed="40s"
              />
              <DashedCircle
                className="hidden md:block w-20 h-20 left-8 top-38 rounded-full absolute"
                style={{ backgroundColor: 'var(--bg-primary)' }}
                speed="40s"
              />
            </div>
          </div>

          <p className="font-family-lack-line text-3xl md:text-5xl lg:text-6xl mt-4">#NeverStopCoding</p>
        </div>
      </div>
    </section>
  );
}