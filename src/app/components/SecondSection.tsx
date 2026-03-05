import { useTranslations } from "next-intl";
import { DashedCircle } from "./DashedCircle";

export default function SecondSection() {
  const t = useTranslations("Texts");
  return (
    <section
      className="grow w-full flex flex-col items-center pl-36 pr-36 font-family-lack h-screen transition-colors duration-300"
      style={{ color: 'var(--text-primary)' }}
      id="about"
    >
      <div className="w-full flex items-center grow relative">
        <div className="flex flex-col gap-14">
          <p className={`w-full text-start font-family-lack-line text-6xl`}>
            {t("about")}
          </p>
          <div className="flex">
            <div
              className="border-static flex flex-col h-fit w-8/12 col-span-8 relative p-12 text-3xl gap-24 my-auto"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <p>{t("about_me")}</p>
              <p>{t("about_me2")}</p>
              <div className="border-marching [--custom-speed:3s] h-24 w-2xl -top-8 left-8 -z-10 absolute" style={{ '--border-color': 'var(--border-accent)' } as any}></div>
              <div className="border-static absolute w-24 h-24 -bottom-12 -left-12 -z-10" style={{ '--custom-border-color': 'var(--accent-primary)' } as any}></div>
              <div className="border-marching [--custom-speed:5s] absolute w-72 h-70 bottom-6 -right-8 -z-10" style={{ '--border-color': 'var(--accent-secondary)' } as any}></div>
            </div>
            <div className="w-4/12 flex relative h-fit my-auto">
              <DashedCircle
                className="w-48 h-48 left-56 rounded-full absolute z-10"
                style={{ backgroundColor: 'var(--bg-primary)' }}
                speed="20s"
              />
              <DashedCircle
                className="w-28 h-28 left-5 -top-12 rounded-full absolute"
                style={{ backgroundColor: 'var(--bg-primary)' }}
                speed="40s"
              />
              <DashedCircle
                className="w-20 h-20 left-8 top-38 rounded-full absolute"
                style={{ backgroundColor: 'var(--bg-primary)' }}
                speed="40s"
              />
            </div>
          </div>
          <p className="font-family-lack-line text-6xl">#NeverStopCoding</p>
        </div>
      </div>
    </section>
  );
}
