import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail, MdDownload } from "react-icons/md";
import { useTranslations } from "next-intl";
import { RotatingText } from "./RotatingText";

export default function FirstSection() {
  const t = useTranslations("Texts");
  const wordsArray = t('words').split(',');
  return (
    <section
      className="grow w-full flex flex-col items-center pl-36 pr-36 py-36 font-family-lack h-screen transition-colors duration-300"
      style={{ color: 'var(--text-primary)' }}
    >
      <div className="w-full grow flex items-center gap-26 h-full">
        <div className="relative text-xl shrink-0 mt-12">
          <img
            src="/images/me.png"
            alt=""
            className="w-72 h-72 transition-all duration-500 object-cover"
            style={{ filter: 'var(--photo-filter)' }}
          />
          <div className="w-72 h-72 absolute top-4 left-4 -z-10 border-marching" />
          <p className="text-center mt-8">Gefferson Parra</p>
          <div className="flex flex-col items-center justify-center mt-8 gap-6">
            <div className="flex items-center gap-4">
              <FaGithub className="text-3xl" />
              <p>GeffersonParra</p>
            </div>
            <div className="flex items-center gap-4">
              <FaLinkedinIn className="text-3xl" />
              <p>Gefferson Parra</p>
            </div>
          </div>
        </div>
        <div className="grow w-full flex flex-col gap-8">
          <div className="w-full text-6xl">{t("hi")}</div>
          <div className="w-full text-6xl/tight">
            {t("hero")}
            <RotatingText items={wordsArray}/>
            <p className="text-2xl mt-6" style={{ color: 'var(--text-muted)' }}>
              {t("specialized")}
            </p>
          </div>
          <div className="relative group flex gap-6">
            <div>
              <button
                className="relative z-20 btn-primary flex text-2xl justify-center gap-2 items-center w-64 px-6 h-14 text-white"
              >
                <MdOutlineEmail className="text-4xl shrink-0" />
                {t("herobtn1")}
              </button>
              <div className="absolute z-10 w-64 h-14 border-static top-0" style={{ '--custom-border-color': 'var(--border-accent)' } as any} />
            </div>
            <div>
              <button
                className="relative z-20 btn-secondary flex text-2xl justify-center gap-2 items-center w-64 px-6 h-14 text-white"
              >
                <MdDownload className="text-4xl shrink-0" />
                {t("herobtn2")}
              </button>
              <div className="absolute z-10 w-64 h-14 border-static top-0" style={{ '--custom-border-color': 'var(--border-accent)' } as any} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
